import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

type LogoWrapper = Element

interface HorizontalLoopConfig {
  paused?: boolean
  repeat?: number
  speed?: number
  paddingRight?: number
  reversed?: boolean
  snap?: boolean | number | ((v: number) => number)
}

const defaultConfig: Required<HorizontalLoopConfig> = {
  paused: false,
  repeat: -1,
  speed: 0.5,
  paddingRight: 40,
  reversed: false,
  snap: true,
}

export class RunningLogos {
  private static instances: Map<string, RunningLogos> = new Map()
  private grid: LogoWrapper
  private config: Required<HorizontalLoopConfig>
  private timeline?: gsap.core.Timeline
  private isInitialized: boolean

  constructor(grid: LogoWrapper, config: Partial<HorizontalLoopConfig> = {}) {
    this.grid = grid
    this.config = { ...defaultConfig, ...config }
    this.isInitialized = false

    if (!this.config.paused) {
      this.init()
    }
  }

  public static initializeAll(selector: string): void {
    function cleanup() {
      RunningLogos.instances.forEach((instance) => instance.destroy())
      RunningLogos.instances.clear()
    }

    function createLogoInstance(grid: HTMLElement): RunningLogos {
      const speed = Number(grid.dataset.speed) || 0.5
      const reversed = grid.dataset.reversed === 'true'
      const paused = grid.dataset.paused === 'true'

      return new RunningLogos(grid, {
        speed,
        reversed,
        paused,
      })
    }

    function processLogoGrid(container: HTMLElement) {
      const grid = container.children[0] as HTMLElement
      if (!grid) return

      const instance = createLogoInstance(grid)
      RunningLogos.instances.set(grid.id, instance)
    }

    function processSection(section: HTMLElement) {
      const logoGrids = section.querySelectorAll<HTMLElement>('.logo-grid')
      logoGrids.forEach(processLogoGrid)
    }

    function initialize() {
      cleanup()

      const sections = document.querySelectorAll<HTMLElement>(selector)
      sections.forEach(processSection)
    }

    function setupInitialization() {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize)
      } else {
        initialize()
      }

      window.addEventListener('unload', cleanup)
    }

    setupInitialization()
  }

  public init(): void {
    if (this.isInitialized) return

    const items = Array.from(this.grid.children)
    this.timeline = horizontalLoop(items, this.config)
    this.isInitialized = true
  }

  public pause(): void {
    if (this.timeline) {
      this.timeline.pause()
    }
  }

  public resume(): void {
    if (this.timeline) {
      this.timeline.resume()
    }
  }

  public setSpeed(speed: number): void {
    if (this.timeline) {
      this.timeline.timeScale(speed)
    }
  }

  public destroy(): void {
    if (this.timeline) {
      this.timeline.kill()
      this.timeline = undefined
    }
    this.isInitialized = false
  }
}

function horizontalLoop(items: Element[], config: HorizontalLoopConfig) {
  items = Array.from(items)
  config = config || {}
  let tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: 'none' },
    onReverseComplete: () => {
      tl.totalTime(tl.rawTime() + tl.duration() * 100)
    },
  })
  let length = items.length
  let startX = (items[0] as HTMLElement).offsetLeft
  let times: number[] = []
  let widths: number[] = []
  let xPercents: number[] = []
  let curIndex = 0
  let pixelsPerSecond = (config.speed || 1) * 100
  let snap: (v: number) => number
  if (config.snap === false) {
    snap = (v: number) => v
  } else if (typeof config.snap === 'function') {
    snap = config.snap
  } else if (typeof config.snap === 'number') {
    snap = gsap.utils.snap(config.snap)
  } else {
    // Default to 1 if config.snap is true or undefined
    snap = gsap.utils.snap(1)
  }
  let totalWidth: number
  let curX: number
  let distanceToStart: number
  let distanceToLoop: number
  let item: Element
  let i: number

  gsap.set(items, {
    // @ts-ignore
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px') as string))
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, 'x', 'px') as string) / w) * 100 +
          (gsap.getProperty(el, 'xPercent') as number)
      )
      return xPercents[i]
    },
  })

  gsap.set(items, { x: 0 })
  totalWidth =
    (items[length - 1] as HTMLElement).offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    (items[length - 1] as HTMLElement).offsetWidth *
      (gsap.getProperty(items[length - 1], 'scaleX') as number) +
    (parseFloat(config.paddingRight?.toString() || '0') || 0)

  for (i = 0; i < length; i++) {
    item = items[i]
    curX = (xPercents[i] / 100) * widths[i]
    distanceToStart = (item as HTMLElement).offsetLeft + curX - startX
    distanceToLoop = distanceToStart + widths[i] * (gsap.getProperty(item, 'scaleX') as number)
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100),
        },
        {
          xPercent: xPercents[i],
          duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add('label' + i, distanceToStart / pixelsPerSecond)
    times[i] = distanceToStart / pixelsPerSecond
  }

  function toIndex(index: number, vars: gsap.TweenVars = {}) {
    Math.abs(index - curIndex) > length / 2 && (index += index > curIndex ? -length : length)
    let newIndex = gsap.utils.wrap(0, length, index)
    let time = times[newIndex]
    if (time > tl.time() !== index > curIndex) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) }
      time += tl.duration() * (index > curIndex ? 1 : -1)
    }
    curIndex = newIndex
    vars.overwrite = true
    return tl.tweenTo(time, vars)
  }

  tl.next = (vars: gsap.TweenVars) => toIndex(curIndex + 1, vars)
  tl.previous = (vars: gsap.TweenVars) => toIndex(curIndex - 1, vars)
  tl.current = () => curIndex
  tl.toIndex = (index: number, vars: gsap.TweenVars) => toIndex(index, vars)

  tl.times = times
  tl.progress(1, true).progress(0, true)
  if (config.reversed) {
    tl.vars.onReverseComplete?.()
    tl.reverse()
  }
  return tl
}
