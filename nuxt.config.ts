import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-03-07',

  modules: [
    '@vueuse/nuxt',
  ],

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
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg', sizes: 'any' },
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
        { rel: 'mask-icon', href: '/favicon.svg', color: '6BB82E' },
        { rel: 'alternate icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
  },
})
