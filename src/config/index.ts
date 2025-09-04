import { siteConfig } from './site'
import { socialConfig } from './social'
import { contactConfig } from './contact'
import { navigationConfig } from './navigation'

export { siteConfig, type SiteConfig } from './site'
export { socialConfig, type SocialConfig, type SocialPlatform } from './social'
export { contactConfig, type ContactConfig, type BusinessHours, type DaySchedule } from './contact'
export {
  navigationConfig,
  type NavigationConfig,
  type NavItem,
  type NavGroup,
  type FooterLink,
  type LegalLink,
} from './navigation'
export * from './types'
export * from './utils'

// Re-export all configurations as a single object for convenience
export const config = {
  site: siteConfig,
  social: socialConfig,
  contact: contactConfig,
  navigation: navigationConfig,
} as const

export type Config = typeof config
