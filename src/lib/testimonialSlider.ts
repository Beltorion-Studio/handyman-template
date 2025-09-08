import { gsap } from 'gsap'
import { horizontalLoop, type ExtendedTimeline } from './horizontalLoop'

type TestimonialSliderOptions = {
  container: string
  duration?: number
  speed?: number
}

const DEFAULT_STEP_DURATION = 0.4
const SLIDE_DURATION_MULTIPLIER = 2.5
const CROSSFADE_FRACTION = 0.7
const SLIDE_EASE = 'power2.inOut' as const
const OPACITY_EASE = 'power2.inOut' as const

export class TestimonialSlider {
  private container: Element | null = null
  private sliderTrack: Element | null = null
  private slides: Element[] = []
  private nextButton: Element | null = null
  private prevButton: Element | null = null
  private loop: ExtendedTimeline | null = null
  private images: Element[] = []
  private currentIndex: number = 0

  constructor(options: TestimonialSliderOptions) {
    this.initializeElements(options)
  }

  private initializeElements(options: TestimonialSliderOptions): void {
    this.container = document.querySelector(options.container)
    if (!this.container) {
      return
    }

    this.sliderTrack = this.container.querySelector('[data-slider-container]')
    this.slides = Array.from(this.container.querySelectorAll('[data-slider-item]'))
    this.nextButton = this.container.querySelector('[data-slider-next]')
    this.prevButton = this.container.querySelector('[data-slider-prev]')
    this.images = Array.from(this.container.querySelectorAll('.testimonial-image'))

    this.init(options)
  }

  private init(options: TestimonialSliderOptions): void {
    if (!this.slides.length) {
      return
    }

    this.loop = horizontalLoop(this.slides, {
      paused: true,
      speed: options.speed ?? 1,
    })

    const stepDuration = this.getStepDuration(options)

    this.nextButton?.addEventListener('click', () => {
      this.createTimeline('next', stepDuration)
    })

    this.prevButton?.addEventListener('click', () => {
      this.createTimeline('prev', stepDuration)
    })
  }

  private createTimeline(direction: 'next' | 'prev', slideDuration: number): void {
    const tl = gsap.timeline()

    // Determine the target index in a clear, readable way
    const newIndex = this.getNextIndex(direction)

    // Crossfade that finishes exactly with the slide
    const crossfadeDuration = slideDuration * CROSSFADE_FRACTION
    const crossfadeStart = Math.max(0, slideDuration - crossfadeDuration)

    tl.set(this.images, { zIndex: 0 }, 0)
      .set(this.images[this.currentIndex], { opacity: 1, zIndex: 1 }, 0)
      .set(this.images[newIndex], { opacity: 0, zIndex: 2 }, 0)
      .call(() => this.triggerSlide(direction, slideDuration), undefined, 0)
      .to(
        this.images[this.currentIndex],
        { opacity: 0, duration: crossfadeDuration, ease: OPACITY_EASE, overwrite: true },
        crossfadeStart
      )
      .to(
        this.images[newIndex],
        { opacity: 1, duration: crossfadeDuration, ease: OPACITY_EASE, overwrite: true },
        crossfadeStart
      )

    this.currentIndex = newIndex
  }

  private getStepDuration(options: TestimonialSliderOptions): number {
    const baseDuration = options.duration || DEFAULT_STEP_DURATION
    return baseDuration * SLIDE_DURATION_MULTIPLIER
  }

  private getNextIndex(direction: 'next' | 'prev'): number {
    if (direction === 'next') {
      const isLastSlide = this.currentIndex === this.images.length - 1
      if (isLastSlide) {
        return 0
      }
      return this.currentIndex + 1
    }

    const isFirstSlide = this.currentIndex === 0
    if (isFirstSlide) {
      return this.images.length - 1
    }
    return this.currentIndex - 1
  }

  private triggerSlide(direction: 'next' | 'prev', slideDuration: number): void {
    if (direction === 'next') {
      this.loop?.next({ duration: slideDuration, ease: SLIDE_EASE })
      return
    }
    this.loop?.previous({ duration: slideDuration, ease: SLIDE_EASE })
  }
}

// Auto-initialize all testimonial sliders
function initializeTestimonialSliders(): void {
  const sliderElements = document.querySelectorAll('[data-slider]')
  if (!sliderElements.length) {
    return
  }

  for (const slider of Array.from(sliderElements)) {
    const sliderId = slider.getAttribute('data-slider')
    if (!sliderId) {
      continue
    }
    new TestimonialSlider({
      container: `[data-slider="${sliderId}"]`,
      duration: DEFAULT_STEP_DURATION,
    })
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTestimonialSliders, { once: true })
} else {
  initializeTestimonialSliders()
}
