import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-03-07',

  modules: ['@vueuse/nuxt', '@vite-pwa/nuxt'],

  pwa: {
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
    manifest: {
      name: 'Non Fan',
      short_name: 'NonFan',
      description: 'A fan website for non.',
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

  hooks: {
    'prepare:types': function ({ references }) {
      references.push({ types: '@types/wicg-file-system-access' })
    },
  },

  app: {
    head: {
      title: 'Non Fan',
      meta: [
        { name: 'description', content: 'A fan website for non.' },
        { name: 'keywords', content: 'non, nounen rana' },
        { name: 'theme-color', content: '#171717' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg', sizes: 'any' },
        { rel: 'alternate icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'mask-icon', href: '/mask-icon.svg', color: '6BB82E' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
      ],
    },
  },
})
