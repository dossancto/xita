// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@peterbud/nuxt-query'
  ],

  runtimeConfig: {
    public: {
      taxiFarePredictApiBaseUrl: process.env.TAXI_FARE_API_BASE_URL
    }
  },

  nuxtQuery: {
    devtools: true,

    autoImports: ['useQuery', 'useMutation'],
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: false }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
