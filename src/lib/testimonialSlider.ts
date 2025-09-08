import { gsap } from 'gsap'

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Get image elements for synchronization
  const images = document.querySelectorAll('.testimonial-image')
  let currentImageIndex = 0

  // Function to update images based on slider position
  function updateImages(newIndex: number) {
    // Fade out current image
    gsap.to(images[currentImageIndex], {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    })

    // Update index
    currentImageIndex = newIndex

    // Fade in new image
    gsap.to(images[currentImageIndex], {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
      delay: 0.1,
    })
  }

  // Add image synchronization to existing button handlers
  const containers = document.querySelectorAll('[data-slider]')
  containers.forEach((container) => {
    const nextButton = container.querySelector('[data-slider-next]')
    const prevButton = container.querySelector('[data-slider-prev]')

    if (nextButton && prevButton) {
      // Add additional event listeners for image updates (don't remove existing ones)
      nextButton.addEventListener('click', () => {
        const nextIndex = (currentImageIndex + 1) % images.length
        updateImages(nextIndex)
      })

      prevButton.addEventListener('click', () => {
        const prevIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
        updateImages(prevIndex)
      })
    }
  })

  // Keyboard navigation
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      const prevIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
      updateImages(prevIndex)
    } else if (event.key === 'ArrowRight') {
      const nextIndex = (currentImageIndex + 1) % images.length
      updateImages(nextIndex)
    }
  }

  document.addEventListener('keydown', handleKeyDown)
})
