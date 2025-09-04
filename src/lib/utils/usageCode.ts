// Import the shared functions
import {
  insertCodeDisplay,
  getComponentName,
  generateCodeBlockHTML,
  extractCodeContent,
  toggleCodeDisplay,
  applySyntaxHighlighting,
} from './codeDisplay'

export function showUsage(sectionId: string): void {
  console.log('showUsage called with sectionId:', sectionId)

  const existingCodeDisplay = toggleCodeDisplay(sectionId, 'usage')
  if (!existingCodeDisplay) return

  console.log('existingCodeDisplay:', existingCodeDisplay)

  const componentName = getComponentName(sectionId)
  console.log('componentName:', componentName)

  // Get the component data from the global scope (set by hero.astro)
  const componentData = (window as any).componentDataMap?.[componentName]
  console.log('componentData:', componentData)
  console.log('window.componentDataMap:', (window as any).componentDataMap)

  if (!componentData) {
    insertCodeDisplay({
      sectionId,
      codeType: 'usage',
      codeContent: `Component data not found for ${componentName}`,
    })
    return
  }

  // Get the raw MDX content
  const mdxContent = componentData.body || 'No content found'

  // Extract just the usage code content (remove markdown formatting)
  const codeContent = extractCodeContent(mdxContent, 'usage')

  // Generate the code block HTML using shared function
  const codeBlockHTML = generateCodeBlockHTML(componentName, codeContent, 'usage')

  // Insert the code block HTML into the code display
  existingCodeDisplay.innerHTML = codeBlockHTML

  // Apply syntax highlighting with Prism.js
  applySyntaxHighlighting(existingCodeDisplay)
}
