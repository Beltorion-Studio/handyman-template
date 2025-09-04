import { gsap } from 'gsap'

export interface ExtendedTimeline extends gsap.core.Timeline {
  next: (vars?: gsap.TweenVars) => gsap.core.Tween
  previous: (vars?: gsap.TweenVars) => gsap.core.Tween
  current: () => number
  toIndex: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween
  times: number[]
}

type LoopConfig = {
  repeat?: number
  paused?: boolean
  speed?: number
  snap?: boolean | ((value: number) => number)
  paddingRight?: number
  reversed?: boolean
}

export function horizontalLoop(items: Element[], config: LoopConfig = {}): ExtendedTimeline {
  items = gsap.utils.toArray(items)
  const tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: 'none' },
    onReverseComplete: () => {
      tl.totalTime(tl.rawTime() + tl.duration() * 100)
      return undefined
    },
  }) as ExtendedTimeline

  const length = items.length
  const startX = (items[0] as HTMLElement).offsetLeft
  const times: number[] = []
  const widths: number[] = []
  const xPercents: number[] = []
  let curIndex = 0
  const pixelsPerSecond = (config.speed || 1) * 100
  const snap =
    typeof config.snap === 'function'
      ? config.snap
      : gsap.utils.snap(config.snap === false ? 1 : typeof config.snap === 'number' ? config.snap : 1)
  let totalWidth: number

  // Convert "x" to "xPercent" to make things responsive
  gsap.set(items, {
    xPercent: (i: number, el: Element) => {
      const width = parseFloat(gsap.getProperty(el, 'width', 'px') as string)
      widths[i] = width
      const x = parseFloat(gsap.getProperty(el, 'x', 'px') as string)
      const xPercent = parseFloat(gsap.getProperty(el, 'xPercent', 'px') as string)
      xPercents[i] = snap((x / width) * 100 + xPercent)
      return xPercents[i]
    },
  })

  gsap.set(items, { x: 0 })

  const lastItem = items[length - 1] as HTMLElement
  const lastItemWidth = parseFloat(gsap.getProperty(lastItem, 'width', 'px') as string)
  const lastItemScaleX = parseFloat(gsap.getProperty(lastItem, 'scaleX', 'px') as string)

  totalWidth =
    lastItem.offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    lastItemWidth * lastItemScaleX +
    parseFloat(config.paddingRight?.toString() || '0')

  // Create the animations
  for (let i = 0; i < length; i++) {
    const item = items[i]
    const curX = (xPercents[i] / 100) * widths[i]
    const distanceToStart = (item as HTMLElement).offsetLeft + curX - startX
    const itemScaleX = parseFloat(gsap.getProperty(item, 'scaleX', 'px') as string)
    const distanceToLoop = distanceToStart + widths[i] * itemScaleX

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
        { xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100) },
        {
          xPercent: xPercents[i],
          duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add(`label${i}`, distanceToStart / pixelsPerSecond)

    times[i] = distanceToStart / pixelsPerSecond
  }

  function toIndex(index: number, vars: gsap.TweenVars = {}) {
    Math.abs(index - curIndex) > length / 2 && (index += index > curIndex ? -length : length)
    const newIndex = gsap.utils.wrap(0, length, index)
    let time = times[newIndex]

    if (time > tl.time() !== index > curIndex) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) }
      time += tl.duration() * (index > curIndex ? 1 : -1)
    }

    curIndex = newIndex
    vars.overwrite = true
    return tl.tweenTo(time, vars)
  }

  tl.next = (vars?: gsap.TweenVars) => toIndex(curIndex + 1, vars)
  tl.previous = (vars?: gsap.TweenVars) => toIndex(curIndex - 1, vars)
  tl.current = () => curIndex
  tl.toIndex = (index: number, vars?: gsap.TweenVars) => toIndex(index, vars)
  tl.times = times

  tl.progress(1, true).progress(0, true)

  if (config.reversed) {
    tl.vars.onReverseComplete?.()
    tl.reverse()
  }

  return tl
}
