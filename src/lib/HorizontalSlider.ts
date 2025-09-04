import { horizontalLoop, type ExtendedTimeline } from './horizontalLoop'

type GroupSliderOptions = {
  container: string
  duration?: number
  speed?: number
}

export class HorizontalSlider {
  private container: Element | null = null
  private sliderTrack: Element | null = null
  private slides: Element[] = []
  private nextButton: Element | null = null
  private prevButton: Element | null = null
  private loop: ExtendedTimeline | null = null

  constructor(options: GroupSliderOptions) {
    this.initializeElements(options)
  }

  private initializeElements(options: GroupSliderOptions): void {
    this.container = document.querySelector(options.container)
    if (!this.container) return

    this.sliderTrack = this.container.querySelector('[data-slider-container]')
    this.slides = Array.from(this.container.querySelectorAll('[data-slider-item]'))
    this.nextButton = this.container.querySelector('[data-slider-next]')
    this.prevButton = this.container.querySelector('[data-slider-prev]')

    this.init(options)
  }

  private init(options: GroupSliderOptions): void {
    if (!this.slides.length) return

    this.loop = horizontalLoop(this.slides, {
      paused: true,
      speed: options.speed || 1,
    })

    this.nextButton?.addEventListener('click', () => {
      this.loop?.next({ duration: options.duration || 0.4, ease: 'power2.inOut' })
    })

    this.prevButton?.addEventListener('click', () => {
      this.loop?.previous({ duration: options.duration || 0.4, ease: 'power2.inOut' })
    })
  }
}

// Initialize slider
document.addEventListener('DOMContentLoaded', () => {
  new HorizontalSlider({
    container: '[data-slider="testimonial-2"]',
    speed: 1,
    duration: 0.4,
  })
})
