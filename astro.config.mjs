// @ts-check

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://handymanpro.pages.dev',
  output: 'static',
  integrations: [
    mdx(),
    sitemap(),
    icon({
      iconDir: 'src/assets/icons',
    }),
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
