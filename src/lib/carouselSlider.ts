import { gsap } from 'gsap'

type CarouselSliderOptions = {
  container: Element
  duration?: number
}

const DEFAULT_DURATION = 0.6
const OPACITY_EASE = 'power2.inOut' as const
const MIN_IMAGES_FOR_NAVIGATION = 1
const FIRST_IMAGE_INDEX = 0
const OVERLAP_TIMING = 2
const TIMELINE_START_POSITION = 0
const OPACITY_HIDDEN = 0
const OPACITY_VISIBLE = 1

export class CarouselSlider {
  private container: Element
  private images: Element[] = []
  private nextButton: Element | null = null
  private prevButton: Element | null = null
  private currentIndex: number = 0
  private isAnimating: boolean = false

  constructor(options: CarouselSliderOptions) {
    this.container = options.container
    this.initializeElements(options)
  }

  private initializeElements(options: CarouselSliderOptions): void {
    this.images = Array.from(this.container.querySelectorAll('[data-carousel-image]'))
    this.nextButton = this.container.querySelector('[data-carousel-next]')
    this.prevButton = this.container.querySelector('[data-carousel-prev]')

    this.init(options)
  }

  private init(options: CarouselSliderOptions): void {
    if (!this.images.length) {
      return
    }

    // Set initial state
    this.setInitialState()

    const duration = options.duration || DEFAULT_DURATION

    this.nextButton?.addEventListener('click', () => {
      this.handleNext(duration)
    })

    this.prevButton?.addEventListener('click', () => {
      this.handlePrev(duration)
    })

    // Add keyboard navigation
    this.container?.addEventListener('keydown', (event) => {
      const keyboardEvent = event as KeyboardEvent
      if (keyboardEvent.key === 'ArrowLeft') {
        this.handlePrev(duration)
      } else if (keyboardEvent.key === 'ArrowRight') {
        this.handleNext(duration)
      }
    })
  }

  private setInitialState(): void {
    // Set all images to opacity 0 except the first one
    gsap.set(this.images, { opacity: OPACITY_HIDDEN })
    gsap.set(this.images[FIRST_IMAGE_INDEX], { opacity: OPACITY_VISIBLE })
  }

  private handleNext(duration: number): void {
    if (this.isAnimating || this.images.length <= MIN_IMAGES_FOR_NAVIGATION) {
      return
    }

    const nextIndex =
      this.currentIndex === this.images.length - 1 ? FIRST_IMAGE_INDEX : this.currentIndex + 1
    this.animateToIndex(nextIndex, duration)
  }

  private handlePrev(duration: number): void {
    if (this.isAnimating || this.images.length <= MIN_IMAGES_FOR_NAVIGATION) {
      return
    }

    const prevIndex =
      this.currentIndex === FIRST_IMAGE_INDEX ? this.images.length - 1 : this.currentIndex - 1
    this.animateToIndex(prevIndex, duration)
  }

  private animateToIndex(targetIndex: number, duration: number): void {
    if (this.isAnimating || targetIndex === this.currentIndex) {
      return
    }

    this.isAnimating = true

    const currentImage = this.images[this.currentIndex]
    const targetImage = this.images[targetIndex]

    const tl = gsap.timeline({
      onComplete: () => {
        this.isAnimating = false
      },
    })

    // Fade out current image and fade in target image
    tl.to(currentImage, {
      opacity: OPACITY_HIDDEN,
      duration: duration / OVERLAP_TIMING,
      ease: OPACITY_EASE,
    }).to(
      targetImage,
      {
        opacity: OPACITY_VISIBLE,
        duration: duration / OVERLAP_TIMING,
        ease: OPACITY_EASE,
      },
      TIMELINE_START_POSITION
    ) // Start at the same time as the fade out

    this.currentIndex = targetIndex
  }
}

// Auto-initialize all carousel sliders
function initializeCarouselSliders(): void {
  const carouselContainers = document.querySelectorAll('[data-carousel-container]')
  if (!carouselContainers.length) {
    return
  }

  // Initialize each carousel
  carouselContainers.forEach((container) => {
    new CarouselSlider({
      container,
      duration: DEFAULT_DURATION,
    })
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCarouselSliders, { once: true })
} else {
  initializeCarouselSliders()
}
