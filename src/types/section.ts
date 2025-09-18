export type SectionContent = {
  sectionId: string
  title: string
  background?: string
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


export type SectionWithCardsContent = SectionContent & {
  cards: Array<{
    title: string
    description: string
    icon?: string
    href?: string
  }>
  cardLayout?: 'grid' | 'list' | 'horizontal'
}

export type SectionWithFeaturesContent = SectionContent & {
  features: Array<{
    title: string
    description: string
    icon?: string
    highlight?: boolean
  }>
  featureLayout?: 'vertical' | 'horizontal' | 'grid'
}

export type SectionWithTextContent = {
  sectionId: string
  title: string
  description: string
  badge?: string
  className?: string
}
