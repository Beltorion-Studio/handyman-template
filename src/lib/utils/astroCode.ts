// Import the shared functions
import {
  insertCodeDisplay,
  getComponentName,
  generateCodeBlockHTML,
  extractCodeContent,
  toggleCodeDisplay,
  applySyntaxHighlighting,
} from './codeDisplay'

export function showAstro(sectionId: string): void {
  console.log('showAstro called with sectionId:', sectionId)

  const existingCodeDisplay = toggleCodeDisplay(sectionId, 'astro')
  if (!existingCodeDisplay) return

  console.log('existingCodeDisplay:', existingCodeDisplay)

  const componentName = getComponentName(sectionId)

  // Get the component data from the global scope (set by hero.astro)
  const componentData = (window as any).componentDataMap?.[componentName]


  if (!componentData) {
    insertCodeDisplay({
      sectionId,
      codeType: 'astro',
      codeContent: `Component data not found for ${componentName}`,
    })
    return
  }

  const mdxContent = componentData.body || 'No content found'

  const codeContent = extractCodeContent(mdxContent, 'component')

  const codeBlockHTML = generateCodeBlockHTML(componentName, codeContent, 'astro')

  // Insert the code block HTML into the code display
  existingCodeDisplay.innerHTML = codeBlockHTML

  // Apply syntax highlighting with Prism.js
  applySyntaxHighlighting(existingCodeDisplay)
}
