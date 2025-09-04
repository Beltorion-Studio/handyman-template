import { gsap } from 'gsap'

type SliderOptions = {
  container: string
  duration?: number
}

export class Slider {
  private currentIndex: number = 0
  private container: Element | null = null
  private items: Element[] = []
  private nextButton: Element | null = null
  private prevButton: Element | null = null
  private options: SliderOptions

  constructor(options: SliderOptions) {
    this.options = {
      duration: 0.5,
      ...options
    }
    
    this.initializeElements()
  }

  private initializeElements(): void {
    this.container = document.querySelector(this.options.container)
    if (!this.container) return

    // Get elements relative to container
    this.items = Array.from(this.container.querySelectorAll('[data-slider-item]'))
    this.nextButton = this.container.querySelector('[data-slider-next]')
    this.prevButton = this.container.querySelector('[data-slider-prev]')
    
    this.init()
  }

  private init(): void {
    if (!this.container || this.items.length === 0) return

    // Set initial positions
    this.items.forEach((item, i) => {
      gsap.set(item, {
        position: 'absolute',
        opacity: i === 0 ? 1 : 0,
        display: i === 0 ? 'block' : 'none'
      })
    })

    // Add event listeners
    this.nextButton?.addEventListener('click', () => this.next())
    this.prevButton?.addEventListener('click', () => this.prev())
  }

  private showItem(index: number): void {
    const currentItem = this.items[this.currentIndex]
    const nextItem = this.items[index]

    const tl = gsap.timeline()
    
    tl.to(currentItem, {
      opacity: 0,
      duration: this.options.duration,
      onComplete: () => {
        gsap.set(currentItem, { display: 'none' })
      }
    })
    .set(nextItem, { display: 'block' })
    .to(nextItem, {
      opacity: 1,
      duration: this.options.duration
    })
  }

  public next(): void {
    const nextIndex = (this.currentIndex + 1) % this.items.length
    this.showItem(nextIndex)
    this.currentIndex = nextIndex
  }

  public prev(): void {
    const prevIndex = (this.currentIndex - 1 + this.items.length) % this.items.length
    this.showItem(prevIndex)
    this.currentIndex = prevIndex
  }
}

// Initialize sliders
document.addEventListener('DOMContentLoaded', () => {
  // Testimonial1 slider
  new Slider({
    container: '[data-slider="testimonial-1"]'
  })
})
