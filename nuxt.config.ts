import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

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
      tailwindcss(),
    ],
  },
})
