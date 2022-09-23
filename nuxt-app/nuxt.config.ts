// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    
    runtimeConfig: {
      public: {
        apiBase: process.env.API_BASE || 'http://localhost:8000',
      },
    },
})
