export type TextStyle = {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  brandColor?: boolean
}

function formatBold(text: string, styles?: TextStyle): string {
  if (styles?.bold === false) return text
  return text.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>')
}

function formatItalic(text: string, styles?: TextStyle): string {
  if (styles?.italic === false) return text
  return text.replace(/\*((?!\*)[^*]+)\*/g, '<span class="italic">$1</span>')
}

function formatUnderline(text: string, styles?: TextStyle): string {
  if (styles?.underline === false) return text
  return text.replace(/__(.*?)__/g, '<span class="underline">$1</span>')
}

function formatBrandColor(text: string, styles?: TextStyle): string {
  if (styles?.brandColor === false) return text
  return text.replace(/@@(.*?)@@/g, '<span class="text-secondary">$1</span>')
}

export function formatText(text: string, styles?: TextStyle): string {
  let formattedText = text
  formattedText = formatBold(formattedText, styles)
  formattedText = formatItalic(formattedText, styles)
  formattedText = formatUnderline(formattedText, styles)
  formattedText = formatBrandColor(formattedText, styles)

  return formattedText
}

/**
 * Converts a string to a URL-friendly slug by converting to lowercase and replacing spaces with hyphens
 * @param text - The text to convert to a slug
 * @returns A URL-friendly slug string
 */
export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-')
}
