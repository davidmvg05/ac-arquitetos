// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4
  },
  devtools: { enabled: false },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/'
  },

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
        name: 'Português'
      },
      {
        code: 'en',
        language: 'en-US',
        name: 'English'
      }
    ],
    defaultLocale: 'pt',
    strategy: 'prefix_except_default'
  },

  linkChecker: {
    enabled: false
  },

  nitro: {
    prerender: {
      ignore: [
        '/constroi-e-decora',
        '/politica-de-privacidade',
        '/termos-e-condicoes',
        '/en/constroi-e-decora',
        '/en/politica-de-privacidade',
        '/en/termos-e-condicoes'
      ],
      failOnError: false
    }
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
