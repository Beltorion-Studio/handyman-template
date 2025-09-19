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
      shortDescription: z.string(),
      icon: z.string(),
      heroImage: image(),
      imageAlt: z.string(),
      featured: z.boolean(),
      category: z.string(),
      price: z.string(),
      duration: z.string(),
      features: z.array(z.string()),
      order: z.number(),
      draft: z.boolean().default(false),

      mainTitle: z.string(),
      mainDescription: z.string(),

      serviceOverview: z.object({
        title: z.string(),
        content: z.string(),
      }),

      services: z.object({
        service1: z.object({
          title: z.string(),
          paragraphs: z.record(z.string(), z.string()),
          image: z.object({ src: image(), alt: z.string() }),
        }),
        service2: z.object({
          title: z.string(),
          paragraphs: z.record(z.string(), z.string()),
          bulletPoints: z.array(z.string()),
          image: z.object({ src: image(), alt: z.string() }),
        }),
        service3: z.object({
          title: z.string(),
          paragraphs: z.record(z.string(), z.string()),
          image: z.object({ src: image(), alt: z.string() }),
        }),
        service4: z.object({
          title: z.string(),
          paragraphs: z.record(z.string(), z.string()),
          bulletPoints: z.array(z.string()),
          image: z.object({ src: image(), alt: z.string() }),
        }),
        service5: z.object({
          title: z.string(),
          paragraphs: z.record(z.string(), z.string()),
          image: z.object({ src: image(), alt: z.string() }),
        }),
      }),

      ourProcess: z.object({
        title: z.string(),
        steps: z.object({
          step1: z.object({ title: z.string(), content: z.string() }),
          step2: z.object({ title: z.string(), content: z.string() }),
          step3: z.object({ title: z.string(), content: z.string() }),
          step4: z.object({ title: z.string(), content: z.string() }),
          step5: z.object({ title: z.string(), content: z.string() }),
        }),
      }),

      whyChooseUs: z.object({
        title: z.string(),
        benefits: z.object({
          craftsmanship: z.object({ title: z.string(), content: z.string() }),
          customSolutions: z.object({ title: z.string(), content: z.string() }),
          premiumMaterials: z.object({ title: z.string(), content: z.string() }),
          attentionToDetail: z.object({ title: z.string(), content: z.string() }),
          projectManagement: z.object({ title: z.string(), content: z.string() }),
          warranty: z.object({ title: z.string(), content: z.string() }),
        }),
      }),

      common: z.object({
        title: z.string(),
        cards: z.object({
          card1: z.object({ title: z.string(), items: z.array(z.string()) }),
          card2: z.object({ image: image(), imageAlt: z.string() }),
          card3: z.object({ title: z.string(), items: z.array(z.string()) }),
          card4: z.object({ image: image(), imageAlt: z.string() }),
          card5: z.object({ title: z.string(), items: z.array(z.string()) }),
          card6: z.object({ image: image(), imageAlt: z.string() }),
        }),
      }),

      threeColumnsSection: z.object({
        title: z.string(),
        column1: z.object({ title: z.string(), items: z.array(z.string()) }),
        column2: z.object({ title: z.string(), items: z.array(z.string()) }),
        column3: z.object({ title: z.string(), items: z.array(z.string()) }),
      }),

      serviceAreas: z.object({
        title: z.string(),
        content: z.string(),
        scheduling: z.object({
          consultations: z.string(),
          standardHours: z.string(),
          weekendProjects: z.string(),
          seasonalWork: z.string(),
        }),
      }),

      cta: z.object({
        title: z.string(),
        content: z.string(),
        button: z.string(),
        subtext: z.string(),
      }),
    }),
})

const blogs = defineCollection({
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
      draft: z.boolean().default(false),
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

const team = defineCollection({
  loader: glob({ base: './src/content/team', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      status: z.string(),
      description: z.string(),
      image: image(),
      imageAlt: z.string(),
      featured: z.boolean().optional().default(false),
    }),
})

export const collections = { services, testimonial, blogs, team }
