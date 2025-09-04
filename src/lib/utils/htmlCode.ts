import {
  toggleCodeDisplay,
  getComponentName,
  generateCodeBlockHTML,
  applySyntaxHighlighting,
} from './codeDisplay'

export function showHtml(sectionId: string): void {
  const section = document.getElementById(sectionId)
  if (!section) return

  const existingCodeDisplay = toggleCodeDisplay(sectionId, 'html')
  if (!existingCodeDisplay) return

  const codeContent = generateHTMLCode(section)
  if (!codeContent) {
    alert('Unable to generate HTML code for this section')
    return
  }

  const componentName = getComponentName(sectionId)
  const codeBlockHTML = generateCodeBlockHTML(componentName, codeContent, 'html')

  // Insert the code block HTML into the code display
  existingCodeDisplay.innerHTML = codeBlockHTML

  // Apply syntax highlighting for HTML
  applySyntaxHighlighting(existingCodeDisplay)
}

function generateHTMLCode(section: HTMLElement): string {
  const componentContent = section.querySelector(
    'section, div[class*="container"], div[class*="grid"]'
  )

  if (!componentContent) {
    return section.outerHTML
  }

  let html = componentContent.outerHTML

  html = removeAstroAttributes(html)
  html = replaceImageUrls(html)
  html = cleanAndFormatHTML(html)

  return formatHTML(html)
}

function removeAstroAttributes(html: string): string {
  return html
    .replace(/\s+data-astro-source-file="[^"]*"/g, '')
    .replace(/\s+data-astro-source-loc="[^"]*"/g, '')
    .replace(/\s+data-image-component="[^"]*"/g, '')
}

function replaceImageUrls(html: string): string {
  return html.replace(/src="[^"]*"/g, 'src="Your Image"')
}

function cleanAndFormatHTML(html: string): string {
  return html.replace(/\s+/g, ' ').replace(/>\s+</g, '>\n<').trim()
}

function formatHTML(html: string): string {
  const lines = html
    .replace(/</g, '\n<')
    .replace(/>/g, '>')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  let indent = 0
  const formattedLines = lines.map((line) => {
    if (line.includes('</')) {
      indent = Math.max(0, indent - 1)
    }

    const result = '  '.repeat(indent) + line

    if (line.includes('<') && !line.includes('</') && !line.includes('/>')) {
      indent++
    }

    return result
  })

  return formattedLines.join('\n')
}
