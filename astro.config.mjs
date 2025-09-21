// @ts-check

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'

import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://handymanpro.pages.dev',
  integrations: [
    mdx(),
    sitemap(),
    icon({
      iconDir: 'src/assets/icons',
    }),
    cloudflare(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
})
