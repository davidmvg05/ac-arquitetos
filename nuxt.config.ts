// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4
  },
  devtools: { enabled: false },

  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
    '@nuxtjs/seo'
  ],

  css: ['~/assets/css/main.css'],

  fonts: {
    families: [
      {
        name: 'Syne',
        provider: 'google',
        weights: [400, 500, 600, 700, 800]
      },
      {
        name: 'Albert Sans',
        provider: 'google',
        weights: [300, 400, 500, 600]
      }
    ]
  },

  image: {
    format: ['avif', 'webp'],
    quality: 85
  },

  i18n: {
    locales: [
      {
        code: 'pt',
        language: 'pt-PT',
        name: 'Português',
        file: 'pt-PT.json'
      },
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en-US.json'
      }
    ],
    defaultLocale: 'pt',
    strategy: 'prefix_except_default',
    langDir: '../app/locales'
  },

  site: {
    url: 'https://www.ac-arquitetos.com',
    name: 'AC-Arquitetos',
    description: 'Atelier de arquitetura e arquitetura de interiores em Lisboa, Portugal. Espaços com rigor, solidez, luz e materialidade.',
    defaultLocale: 'pt'
  },

  build: {
    transpile: ['gsap', 'lenis']
  },

  typescript: {
    strict: true
  }
})
