import { gsap } from 'gsap'

export function initTabs() {
  const tabContainers = document.querySelectorAll('[data-tabs]')

  tabContainers.forEach((container) => {
    const tabButtons = container.querySelectorAll('[data-tab-button]')
    const tabPanes = container.querySelectorAll('[data-tab-pane]')

    tabButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const buttonIndex = button.getAttribute('data-tab-index')

        const tl = gsap.timeline({ duration: 0.3, ease: 'power2.out' })

        tabButtons.forEach((btn, index) => {
          if (index.toString() === buttonIndex) {
            tl.set(
              btn,
              {
                backgroundColor: '#1f2937', // bg-gray-700
                color: '#ffffff', // text-white
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              },
              0
            )
            btn.setAttribute('aria-selected', 'true')
          } else {
            tl.set(
              btn,
              {
                backgroundColor: '#ffffff',
                color: '#1f2937',
                boxShadow: 'none',
              },
              0
            )
            btn.setAttribute('aria-selected', 'false')
          }
        })

        tabPanes.forEach((pane, index) => {
          const paneElement = pane as HTMLElement
          if (index.toString() === buttonIndex) {
            // Show active pane
            tl.set(paneElement, { display: 'block' }, 0)
            pane.setAttribute('aria-hidden', 'false')
          } else {
            // Hide inactive pane
            tl.set(paneElement, { display: 'none' }, 0)
            pane.setAttribute('aria-hidden', 'true')
          }
        })
      })
    })
  })
}
