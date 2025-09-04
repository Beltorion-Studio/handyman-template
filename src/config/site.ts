import Logo from '@assets/images/logo.svg'

export const siteConfig = {
  name: 'ZenAstro',
  description: 'Professional web development and design services',
  url: 'https://zenastro.com',
  logo: Logo,
  favicon: '/favicon.svg',
  copyright: `© ${new Date().getFullYear()} ZenAstro. All rights reserved.`,
  language: 'en',
  locale: 'en_US',
} as const

export type SiteConfig = typeof siteConfig
