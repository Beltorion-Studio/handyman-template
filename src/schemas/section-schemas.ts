import { z } from 'zod'
import type { ImageMetadata } from 'astro'

export const RegularSectionSchema = z.object({
  sectionId: z.string(),
  title: z.string(),
  background: z.string().default('bg-white').optional(),
  paragraphs: z.record(z.string(), z.string()),
  badge: z.string().optional(),
  reverse: z.boolean().optional(),
  justifyContent: z.enum(['start', 'center']).optional(),
  buttons: z
    .object({
      primary: z
        .object({
          text: z.string(),
          href: z.string().optional(),
        })
        .optional(),
      secondary: z
        .object({
          text: z.string(),
          href: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
  image: z.object({
    src: z.custom<ImageMetadata>(),
    alt: z.string(),
    size: z.enum(['video', 'square', 'full']).optional(),
    position: z.enum(['middle', 'top']).optional(),
  }),
})

export const SectionWithBulletsContentSchema = RegularSectionSchema.extend({
  bulletPoints: z.array(z.string()),
  listType: z.enum(['bullets', 'numbers']).optional(),
})

export const SectionWithIconsContentSchema = RegularSectionSchema.extend({
  iconItems: z.array(
    z.object({
      icon: z.string(),
      text: z.string(),
    })
  ),
})

export const SectionWithCardsContentSchema = RegularSectionSchema.extend({
  cards: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
      href: z.string().optional(),
    })
  ),
  cardLayout: z.enum(['grid', 'list', 'horizontal']).optional(),
})

export const SectionWithFeaturesContentSchema = RegularSectionSchema.extend({
  features: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
      highlight: z.boolean().optional(),
    })
  ),
  featureLayout: z.enum(['vertical', 'horizontal', 'grid']).optional(),
})

export const SectionWithTextContentSchema = z.object({
  sectionId: z.string(),
  title: z.string(),
  description: z.string(),
  badge: z.string().optional(),
  className: z.string().optional(),
})

export const SectionWithTrustStatsSchema = z.object({
  sectionId: z.string(),
  title: z.string(),
  background: z
    .string()
    .default('text-text-white from-brand to-primary-dark bg-gradient-to-br')
    .optional(),
  statsTextSize: z.string().default('text-6xl').optional(),
  paragraphs: z.record(z.string(), z.string()),
  badge: z.string().optional(),
  reverse: z.boolean().optional(),
  justifyContent: z.enum(['start', 'center']).optional(),
  buttons: z
    .object({
      primary: z
        .object({
          text: z.string(),
          href: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
  trustStats: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
})

export type SectionContent = z.infer<typeof RegularSectionSchema>
export type SectionWithBullets = z.infer<typeof SectionWithBulletsContentSchema>
export type SectionWithIcons = z.infer<typeof SectionWithIconsContentSchema>
export type SectionWithCards = z.infer<typeof SectionWithCardsContentSchema>
export type SectionWithFeatures = z.infer<typeof SectionWithFeaturesContentSchema>
export type SectionWithText = z.infer<typeof SectionWithTextContentSchema>
export type SectionWithTrustStats = z.infer<typeof SectionWithTrustStatsSchema>
