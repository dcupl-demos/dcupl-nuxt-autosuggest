// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    //ssr: false,
    modules: ['@nuxt/image-edge'],
    image: {
      presets: {},
      provider: 'storyblok',
      storyblok: {
        baseURL: "https://a.storyblok.com",
        modifiers: {
          effect: 'sharpen:100',
          quality: 'auto:best',
        }
      },
      screens: {
        xs: 320,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        xxl: 1536,
        '2xl': 1536
      },
    },
    css: ['~/assets/css/main.css'],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    build: {
      
    },
  });
  