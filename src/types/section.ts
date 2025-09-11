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

export type SectionWithTrustStatsContent = {
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
  }
  trustStats: Array<{
    value: string
    label: string
  }>
}

export type SectionWithCardsContent = {
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
  cards: Array<{
    title: string
    description: string
    icon?: string
    href?: string
  }>
  cardLayout?: 'grid' | 'list' | 'horizontal'
}

export type SectionWithFeaturesContent = {
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
