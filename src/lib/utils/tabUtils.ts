export function initTabs() {
  const tabContainers = document.querySelectorAll('[data-tabs]')

  tabContainers.forEach((container) => {
    const tabButtons = container.querySelectorAll('[data-tab-button]')
    const tabPanes = container.querySelectorAll('[data-tab-pane]')

    tabButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const buttonIndex = button.getAttribute('data-tab-index')

        // Update button styles
        tabButtons.forEach((btn, index) => {
          if (index.toString() === buttonIndex) {
            btn.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-100')
            btn.classList.add('bg-gray-700', 'text-white', 'shadow-lg', 'hover:bg-gray-700')
            btn.setAttribute('aria-selected', 'true')
          } else {
            btn.classList.remove('bg-gray-700', 'text-white', 'shadow-lg', 'hover:bg-gray-700')
            btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100')
            btn.setAttribute('aria-selected', 'false')
          }
        })

        // Update content visibility
        tabPanes.forEach((pane, index) => {
          const paneElement = pane as HTMLElement
          if (index.toString() === buttonIndex) {
            paneElement.style.display = 'block'
            pane.setAttribute('aria-hidden', 'false')
          } else {
            paneElement.style.display = 'none'
            pane.setAttribute('aria-hidden', 'true')
          }
        })
      })
    })
  })
}
