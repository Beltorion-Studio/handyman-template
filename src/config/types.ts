// Common link types
export type LinkType = 'internal' | 'external' | 'anchor' | 'mailto' | 'tel'

export type BaseLink = {
  href: string
  text: string
  ariaLabel?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
}

export type InternalLink = BaseLink & {
  type: 'internal'
  href: string // starts with /
}

export type ExternalLink = BaseLink & {
  type: 'external'
  href: string // starts with http:// or https://
  target?: '_blank'
  rel?: 'noopener noreferrer'
}

export type AnchorLink = BaseLink & {
  type: 'anchor'
  href: string // starts with #
}

export type MailtoLink = BaseLink & {
  type: 'mailto'
  href: string // starts with mailto:
}

export type TelLink = BaseLink & {
  type: 'tel'
  href: string // starts with tel:
}

export type Link = InternalLink | ExternalLink | AnchorLink | MailtoLink | TelLink

// Utility types for configuration
export type ConfigSection = 'site' | 'social' | 'contact' | 'navigation'
export type ConfigValue = string | number | boolean | object | Array<any>

// Environment configuration
export type Environment = 'development' | 'staging' | 'production'
