// nuxt.config.ts

import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/sitemap',
    'vue-social-sharing/nuxt'
  ],
  content: {
    // Налаштування модуля content
    markdown: {
      remarkPlugins: ['remark-math'],
      rehypePlugins: ['rehype-katex', 'rehype-highlight']
    }
  },
  sitemap: {
    hostname: 'https://your-domain.com',
    gzip: true,
    routes: async () => {
      const { $content } = require('@nuxt/content')
      const posts = await $content('posts').only(['path']).fetch()
      return posts.map(post => post.path)
    }
  },
  plugins: ['~/plugins/markdown.js'],
  css: [
    '~/assets/css/tailwind.css',
    'katex/dist/katex.min.css',
    'highlight.js/styles/github.css'
  ],
  app: {
    head: {
      titleTemplate: '%s - Nuxt Blog',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ]
    }
  }
})
