import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import tailwindcss from '@tailwindcss/vite'

function generateRoutes() {
  const collectDir = path.resolve(process.cwd(), 'server/assets/collect')

  const items = fs.readdirSync(collectDir).filter(item => !item.endsWith('.json'))
  const routes = ['/', '/sign', '/song']

  for (const item of items) {
    const year = item.slice(0, 4)
    const rest = item.slice(4)

    routes.push(`/renarrate/${year}/${rest}`)
  }

  return routes
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-03-07',

  modules: ['@vueuse/nuxt', '@vite-pwa/nuxt'],

  pwa: {
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
    manifest: {
      name: 'ノンファン',
      short_name: 'ノンファン',
      description: 'のん (能年玲奈) のファンサイト。',
      theme_color: '#171717',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
      prefix: 'N',
    },
    {
      path: '~/widgets',
      pathPrefix: false,
      prefix: 'W',
    },
    {
      path: '~/features',
      pathPrefix: false,
      prefix: 'F',
    },
  ],

  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss() as any,
    ],
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: import.meta.dev ? [] : generateRoutes(),
      ignore: [path => path === '/renarrate'],
      concurrency: 60,
    },
  },

  routeRules: {
    '/renarrate': { ssr: true },
    '/api/**': { cors: true },
  },

  hooks: {
    'prepare:types': function ({ references }) {
      references.push({ types: '@types/wicg-file-system-access' })
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'ja',
      },
      title: 'ノンファン',
      meta: [
        { name: 'description', content: 'のん (能年玲奈) のファンサイト。' },
        { name: 'keywords', content: 'のん、能年玲奈、non、能年' },
        { name: 'theme-color', content: '#171717' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg', sizes: 'any' },
        { rel: 'alternate icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'mask-icon', href: '/mask-icon.svg', color: '6BB82E' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Kosugi+Maru&display=swap' },
      ],
    },
  },
})
