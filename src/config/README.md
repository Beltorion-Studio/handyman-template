# Configuration System

This directory contains centralized configuration for the entire project, including site metadata, navigation, social media, and contact information.

## Structure

```
src/config/
├── index.ts          # Main exports and combined config
├── site.ts           # Site metadata and branding
├── social.ts         # Social media platforms and links
├── contact.ts        # Contact information and business hours
├── navigation.ts     # Navigation menus and links
├── types.ts          # TypeScript type definitions
├── utils.ts          # Utility functions for link handling
└── README.md         # This documentation
```

## Usage

### Basic Import

```typescript
import { siteConfig, socialConfig, contactConfig, navigationConfig } from '@config'
```

### Combined Config

```typescript
import { config } from '@config'

// Access any configuration
const siteName = config.site.name
const socialLinks = config.social.platforms
```

### Link Utilities

```typescript
import { createLink, getLinkAttributes } from '@config'

const link = createLink({
  href: 'https://example.com',
  text: 'External Link',
})

const attributes = getLinkAttributes(link)
```

## Configuration Categories

### Site Configuration (`site.ts`)

- Site name, description, URL
- Logo and favicon paths
- Copyright information
- Language and locale settings

### Social Media (`social.ts`)

- Platform-specific links and icons
- Brand colors for each platform
- Accessibility labels

### Contact Information (`contact.ts`)

- Company address and contact details
- Phone numbers and email addresses
- Business hours for each day
- Emergency contact information

### Navigation (`navigation.ts`)

- Main navigation menu
- Footer navigation links
- Legal page links
- Call-to-action buttons

## Link Types

The system automatically detects and handles different link types:

- **Internal**: `/about`, `/contact` (relative paths)
- **External**: `https://example.com` (full URLs)
- **Anchor**: `#section` (page anchors)
- **Mailto**: `mailto:email@example.com`
- **Tel**: `tel:+1234567890`

## Type Safety

All configurations are fully typed with TypeScript, providing:

- Autocomplete in your IDE
- Compile-time error checking
- Runtime type validation

## Environment Support

The configuration system supports different environments (development, staging, production) and can be extended to provide environment-specific overrides.
