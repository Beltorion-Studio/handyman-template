export type CodeType = 'html' | 'astro' | 'usage'

export interface CodeDisplayOptions {
  sectionId: string
  codeType: CodeType
  codeContent: string
}

type ActionHandler = (sectionId: string) => void

import { showHtml } from './htmlCode'
import { showAstro } from './astroCode'
import { showUsage } from './usageCode'
import { copyCode } from './copyCode'

// State management for currently visible code display
let currentVisibleDisplay: { sectionId: string; codeType: CodeType } | null = null

// Cached regex patterns for better performance
const CODE_BLOCK_REGEX = /```astro\s*([\s\S]*?)\s*```/

const actionHandlers: Record<string, ActionHandler> = {
  'show-html': showHtml,
  'show-astro': showAstro,
  'show-usage': showUsage,
  'copy-code': copyCode,
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function extractCodeContent(mdxContent: string, identifier: string = 'component'): string {
  const regex = new RegExp(`\`\`\`astro:${identifier}\\s*([\\s\\S]*?)\\s*\`\`\``)
  const match = mdxContent.match(regex)
  if (match) {
    return match[1].trim()
  }

  const codeMatch = mdxContent.match(CODE_BLOCK_REGEX)
  if (codeMatch) {
    return codeMatch[1].trim()
  }

  return mdxContent
}

export function getComponentName(sectionId: string): string {
  let componentName = sectionId
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

  if (componentName.startsWith('Cta')) {
    componentName = 'CTA' + componentName.slice(3)
  }

  return componentName
}

export function generateCodeBlockHTML(
  componentName: string,
  codeContent: string,
  codeType: CodeType
): string {
  const title =
    codeType === 'usage' ? `${componentName} Usage Example` : `${componentName} Component Code`

  return `
    <div class="w-full">
      <h3 class="mb-4 text-lg font-semibold text-gray-900">${title}</h3>
      <div class="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
        <pre class="p-6 m-0 overflow-x-auto text-sm text-gray-100 font-mono leading-relaxed bg-gray-900"><code class="language-typescript">${escapeHtml(codeContent)}</code></pre>
      </div>
    </div>
  `
}

export function hideAllCodeDisplays(): void {
  const allCodeDisplays = document.querySelectorAll('[id$="-code-display"]')
  allCodeDisplays.forEach((display) => {
    if (display instanceof HTMLElement) {
      display.classList.add('hidden')
    }
  })
  currentVisibleDisplay = null
}

export function showCodeDisplay(sectionId: string, codeType: CodeType): HTMLElement | null {
  const codeDisplay = document.getElementById(`${sectionId}-code-display`)
  if (!codeDisplay) return null

  hideAllCodeDisplays()
  codeDisplay.classList.remove('hidden')
  currentVisibleDisplay = { sectionId, codeType }
  addSmoothAnimation(codeDisplay)

  return codeDisplay
}

export function addSmoothAnimation(element: HTMLElement): void {
  element.style.opacity = '0'
  element.style.transform = 'translateY(-10px)'
  element.style.transition = 'all 0.3s ease-out'

  setTimeout(() => {
    element.style.opacity = '1'
    element.style.transform = 'translateY(0)'
  }, 10)
}

export function toggleCodeDisplay(sectionId: string, codeType: CodeType): HTMLElement | null {
  if (
    currentVisibleDisplay &&
    currentVisibleDisplay.sectionId === sectionId &&
    currentVisibleDisplay.codeType === codeType
  ) {
    hideAllCodeDisplays()
    return null
  }

  return showCodeDisplay(sectionId, codeType)
}

export function applySyntaxHighlighting(element: HTMLElement): void {
  if (typeof window !== 'undefined' && (window as any).Prism) {
    ;(window as any).Prism.highlightAllUnder(element)
  }
}

export function handleCodeButtons(): void {
  const buttons = document.querySelectorAll('[data-action]')

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const target = event.currentTarget as HTMLElement
      const action = target.getAttribute('data-action')
      const sectionId = target.getAttribute('data-section')

      if (!action || !sectionId) return

      const handler = actionHandlers[action]
      if (handler) {
        handler(sectionId)
      }
    })
  })
}

export function insertCodeDisplay(options: CodeDisplayOptions): void {
  const { sectionId, codeType, codeContent } = options

  const codeDisplay = document.getElementById(`${sectionId}-code-display`)
  if (!codeDisplay) return

  const titleSpan = codeDisplay.querySelector('span')
  const codeElement = codeDisplay.querySelector('code')

  if (codeElement) codeElement.textContent = codeContent

  if (titleSpan) titleSpan.textContent = `${codeType.toUpperCase()} Code`

  codeDisplay.classList.remove('hidden')
  addSmoothAnimation(codeDisplay)
}

export function handleCodeDisplayClose(): void {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    const closeButton = target.closest('[data-close-code]')

    if (!closeButton) return

    const codeId = closeButton.getAttribute('data-close-code')
    if (!codeId) return

    const codeDisplay = document.getElementById(codeId)
    if (!codeDisplay) return

    codeDisplay.classList.add('hidden')
  })
}

export function initializeCodeButtons(): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleCodeButtons)
  } else {
    handleCodeButtons()
  }
}
