export function copyCode(sectionId: string): void {
  const codeDisplay = document.querySelector(`#${sectionId}-code-display`)
  if (!codeDisplay) {
    alert('Please select HTML first to copy the code')
    return
  }

  const codeElement = codeDisplay.querySelector('code')
  if (!codeElement) return

  const codeText = codeElement.textContent
  if (!codeText) return

  navigator.clipboard
    .writeText(codeText)
    .then(() => {
      // Show success feedback
      const copyButton = document.querySelector(
        `[data-section="${sectionId}"][data-action="copy-code"]`
      )
      if (!copyButton) return

      const originalText = copyButton.innerHTML
      copyButton.innerHTML = `
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      Copied!
    `

      setTimeout(() => {
        copyButton.innerHTML = originalText
      }, 2000)
    })
    .catch((err) => {
      console.error('Failed to copy code:', err)
      alert('Failed to copy code to clipboard')
    })
}
