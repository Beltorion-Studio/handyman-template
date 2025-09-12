import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const services = defineCollection({
  // Load Markdown and MDX files in the `src/content/services/` directory.
  loader: glob({ base: './src/content/services', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      shortDescription: z.string().optional(),
      icon: z.string().optional(),
      heroImage: image(),
      imageAlt: z.string(),
      featured: z.boolean().default(false),
      category: z.string().optional(),
      price: z.string().optional(), // e.g., "Starting at $50", "Free estimate"
      duration: z.string().optional(), // e.g., "1-2 hours", "Same day"
      features: z.array(z.string()).optional(),
      order: z.number().default(0), // For custom ordering
    }),
})

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image(),
      imageAlt: z.string(),
      author: z.string().default('Handyman Pro'),
      category: z.string(),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
    }),
})

const testimonial = defineCollection({
  loader: glob({ base: './src/content/testimonial', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      testimonial: z.string(),
      name: z.string(),
      position: z.string(),
      company: z.string(),
      avatar: image(),
    }),
})

export const collections = { services, testimonial, blog }
