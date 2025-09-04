export type TextStyle = {
  bold?: boolean
  italic?: boolean
  underline?: boolean
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

export function formatText(text: string, styles?: TextStyle): string {
  let formattedText = text
  formattedText = formatBold(formattedText, styles)
  formattedText = formatItalic(formattedText, styles)
  formattedText = formatUnderline(formattedText, styles)

  return formattedText
}
