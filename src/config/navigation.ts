export const navigationConfig = {
  main: [
    { href: '/', text: 'Home', ariaLabel: 'Go to home page' },
    {
      text: 'Services',
      ariaLabel: 'View our services',
      items: [
        {
          href: '/services/home-repairs',
          text: 'Home Repairs',
          ariaLabel: 'View our home repair services',
        },
        {
          href: '/services/plumbing',
          text: 'Plumbing Services',
          ariaLabel: 'View our plumbing services',
        },
        {
          href: '/services/carpentry',
          text: 'Carpentry & Woodworking',
          ariaLabel: 'View our carpentry and woodworking services',
        },
        {
          href: '/services/electrical',
          text: 'Electrical Services',
          ariaLabel: 'View our electrical services',
        },
      ],
    },

    {
      href: '/blog',
      text: 'Blog',
      ariaLabel: 'Visit our blog for the latest updates and articles',
    },
    { href: '/about', text: 'About', ariaLabel: 'Go to about page' },
    { href: '/contact', text: 'Contact', ariaLabel: 'Go to contact page' },
    {
      text: 'Template',
      ariaLabel: 'View our services',
      items: [
        {
          href: '/template/sections',
          text: 'Sections',
          ariaLabel: 'View our sections',
        },  
      ],
    },
  ],
  footer: [
    { href: '/about', text: 'About' },
    { href: '/services', text: 'Services' },
    { href: '/blog', text: 'Blog' },
    { href: '/contact', text: 'Contact' },
  ],
  legal: [
    { href: '/privacy-policy', text: 'Privacy Policy' },
    { href: '/terms-conditions', text: 'Terms & Conditions' },
    { href: '/cookie-policy', text: 'Cookie Policy' },
  ],
  cta: {
    primary: { href: '/get-started', text: 'Get Started' },
    secondary: { href: '/contact', text: 'Contact Us' },
  },
} as const

export type NavigationConfig = typeof navigationConfig
export type NavItem = (typeof navigationConfig.main)[0]
export type NavGroup = (typeof navigationConfig.main)[1]
export type FooterLink = (typeof navigationConfig.footer)[0]
export type LegalLink = (typeof navigationConfig.legal)[0]
