import Logo from '@assets/images/logo.svg'

export const siteConfig = {
  name: 'Handyman',
  description: 'Professional web development and design services',
  url: 'https://handyman.com',
  logo: Logo,
  favicon: '/favicon.svg',
  copyright: `© ${new Date().getFullYear()} Handyman. All rights reserved.`,
  language: 'en',
  locale: 'en_US',
} as const

export type SiteConfig = typeof siteConfig
