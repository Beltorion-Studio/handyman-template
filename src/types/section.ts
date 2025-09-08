export type SectionContent = {
    sectionId: string
    title: string
    paragraphs: Record<string, string>
    badge?: string
    reverse?: boolean
    justifyContent?: 'start' | 'center'
    buttons?: {
      primary?: {
        text: string
        href?: string
      }
      secondary?: {
        text: string
        href?: string
      }
    }
    image: {
      src: ImageMetadata
      alt: string
      size?: 'video' | 'square' | 'full'
      position?: 'middle' | 'top'
    }
    additionalContent?: {
      heading?: string
      description?: string
    }
  }
  
  export type SectionWithBulletsContent = SectionContent & {
    bulletPoints: string[]
    listType?: 'bullets' | 'numbers'
  }
  
  export type SectionWithIconsContent = SectionContent & {
    iconItems: Array<{
      icon: string
      text: string
    }>
  }