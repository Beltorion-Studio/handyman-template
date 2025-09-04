type GalleryOptions = {
  container: string
}

export class Gallery {
  private modal: HTMLElement | null = null
  private modalImage: HTMLImageElement | null = null
  private items: Element[] = []
  private currentIndex: number = 0
  private images: { src: string; alt: string }[] = []
  private container: Element | null = null

  constructor(options: GalleryOptions) {
    this.initializeElements(options)
  }
  
  private initializeElements(options: GalleryOptions): void {
      this.container = document.querySelector(options.container)
      if (!this.container) return
      
      // Initialize modal elements
      this.modal = document.getElementById('gallery-modal')
      this.modalImage = document.getElementById('modal-image') as HTMLImageElement
      this.items = Array.from(this.container.querySelectorAll('[data-gallery-item]'))
      console.log(this.items)
    
    this.initialize()
  }

  private initialize(): void {
    if (!this.modal || !this.modalImage || this.items.length === 0) return

    // Store image data
    this.items.forEach((item) => {
      const img = item.querySelector('img')
      if (img) {
        this.images.push({
          src: img.src,
          alt: img.alt,
        })
      }
    })

    // Add click listeners to gallery items
    this.items.forEach((item, index) => {
      item.addEventListener('click', () => this.openModal(index))
      ;(item as HTMLElement).addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          this.openModal(index)
        }
      })
    })

    // Add modal control listeners if not already added
    if (!this.modal.dataset.initialized) {
      const closeButton = document.getElementById('close-modal')
      const prevButton = document.getElementById('prev-button')
      const nextButton = document.getElementById('next-button')

      closeButton?.addEventListener('click', () => this.closeModal())
      prevButton?.addEventListener('click', () => this.navigate(-1))
      nextButton?.addEventListener('click', () => this.navigate(1))

      // Keyboard navigation
      document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (!this.modal?.classList.contains('hidden')) {
          switch (e.key) {
            case 'Escape':
              this.closeModal()
              break
            case 'ArrowLeft':
              this.navigate(-1)
              break
            case 'ArrowRight':
              this.navigate(1)
              break
          }
        }
      })

      // Mark modal as initialized
      this.modal.dataset.initialized = 'true'
    }
  }

  private openModal(index: number): void {
    console.log('openModal', index)
    if (!this.modal || !this.modalImage) return

    this.currentIndex = index
    this.updateModalImage()
    this.modal.classList.remove('hidden')
    document.body.style.overflow = 'hidden'
    
    // Set focus on modal for accessibility
    this.modal.focus()
  }

  private closeModal(): void {
    if (!this.modal) return

    this.modal.classList.add('hidden')
    document.body.style.overflow = ''
    
    // Return focus to the clicked item
    const currentItem = this.items[this.currentIndex] as HTMLElement
    currentItem?.focus()
  }

  private navigate(direction: number): void {
    this.currentIndex = (this.currentIndex + direction + this.images.length) % this.images.length
    this.updateModalImage()
  }

  private updateModalImage(): void {
    if (!this.modalImage) return

    const { src, alt } = this.images[this.currentIndex]
    this.modalImage.src = src
    this.modalImage.alt = alt

    // Update active state
    this.items.forEach((item, index) => {
      item.setAttribute('aria-current', index === this.currentIndex ? 'true' : 'false')
    })
  }
}
