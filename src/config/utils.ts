import type { Link, LinkType, BaseLink } from './types'

// Determine link type based on href
export function getLinkType(href: string): LinkType {
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return 'external'
  }
  if (href.startsWith('mailto:')) {
    return 'mailto'
  }
  if (href.startsWith('tel:')) {
    return 'tel'
  }
  if (href.startsWith('#')) {
    return 'anchor'
  }
  return 'internal'
}

// Create proper link object with type detection
export function createLink(baseLink: BaseLink): Link {
  const type = getLinkType(baseLink.href)

  if (type === 'external') {
    return {
      ...baseLink,
      type: 'external',
      target: '_blank',
      rel: 'noopener noreferrer',
    } as const
  }

  if (type === 'mailto') {
    return {
      ...baseLink,
      type: 'mailto',
    } as const
  }

  if (type === 'tel') {
    return {
      ...baseLink,
      type: 'tel',
    } as const
  }

  if (type === 'anchor') {
    return {
      ...baseLink,
      type: 'anchor',
    } as const
  }

  return {
    ...baseLink,
    type: 'internal',
  } as const
}

// Get link attributes based on type
export function getLinkAttributes(link: Link) {
  const baseAttrs = {
    href: link.href,
    'aria-label': link.ariaLabel || link.text,
  }

  if (link.type === 'external') {
    return {
      ...baseAttrs,
      target: link.target || '_blank',
      rel: link.rel || 'noopener noreferrer',
    }
  }

  return baseAttrs
}

// Validate configuration object
export function validateConfig<T extends Record<string, any>>(
  config: T,
  requiredKeys: (keyof T)[]
): boolean {
  return requiredKeys.every((key) => config[key] !== undefined && config[key] !== null)
}

// Get environment-specific configuration
export function getEnvConfig<T>(config: T, env: string = process.env.NODE_ENV || 'development'): T {
  // For now, return the same config for all environments
  // This can be extended later for environment-specific overrides
  return config
}
