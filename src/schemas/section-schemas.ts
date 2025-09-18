import { z } from 'zod'


export const SectionWithTrustStatsSchema = z.object({
    sectionId: z.string(),
    title: z.string(),
    background: z.string().default('text-text-white from-brand to-primary-dark bg-gradient-to-br').optional(),
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