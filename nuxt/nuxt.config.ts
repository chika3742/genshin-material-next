// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: "scroll-y-reverse-transition",
      leaveActiveClass: "position-absolute d-none",
      duration: 200,
    },
    head: {
      link: [
        {
          rel: "shortcut icon",
          href: "/favicon.webp",
        },
        {
          rel: "manifest",
          href: "/manifest.webmanifest",
        },
      ],
      meta: [
        {
          name: "viewport",
          content: "viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
      ],
    },
  },
  experimental: {
    payloadExtraction: false,
  },
  css: ["assets/styles/fonts.sass"],
  build: {
    transpile: ["vuetify"],
  },
  nitro: {
    preset: "cloudflare-pages-static",
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  typescript: {
    tsConfig: {
      exclude: ["functions"],
    },
  },

  modules: [
    "@chika3742/mhy-material-components",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
  ],
  i18n: {
    locales: [
      {
        code: "ja",
        iso: "ja-JP",
        file: "ja.yaml",
      },
      {
        code: "en",
        iso: "en-US",
        file: "en.yaml",
      },
    ],
    langDir: "./locales/",
    defaultLocale: "ja",
    compilation: {
      strictMessage: false,
    },
  },
  googleFonts: {
    families: {
      "M PLUS Rounded 1c": [500, 700],
      "Kaisei Opti": [700],
      Cairo: [700],
      "Kiwi Maru": [500],
      "Material Symbols Outlined": true,
    },
  },
})
