export const socialConfig = {
  platforms: [
    {
      name: 'Facebook',
      url: 'https://facebook.com/',
      icon: 'ri:facebook-fill',
      ariaLabel: 'Visit our Facebook page',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/',
      icon: 'ri:twitter-x-fill',
      ariaLabel: 'Follow us on Twitter',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/',
      icon: 'ri:instagram-fill',
      ariaLabel: 'Follow us on Instagram',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/',
      icon: 'ri:linkedin-fill',
      ariaLabel: 'Connect with us on LinkedIn',
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/',
      icon: 'ri:youtube-fill',
      ariaLabel: 'Subscribe to our YouTube channel',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/',
      icon: 'ri:github-fill',
      ariaLabel: 'Check out our GitHub projects',
    },
  ],
} as const

export type SocialConfig = typeof socialConfig
export type SocialPlatform = (typeof socialConfig.platforms)[0]
