// https://nuxt.com/docs/api/configuration/nuxt-config
import {execSync} from "child_process"
import yaml from "@rollup/plugin-yaml"
import dsv from "@rollup/plugin-dsv"
import {DateTime} from "luxon"
import {generateSitemap} from "./scripts/generate-sitemap"
import {workboxBuild} from "./scripts/workbox-build"
import {generateSchemas} from "./scripts/generate-schemas"
import {generateLocType} from "./scripts/generate-loc-type"

const hostname = "https://hsr.matnote.app"
const sitemapRoutes: string[] = []

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
  vite: {
    plugins: [
      yaml({
        exclude: "**/locales/**",
      }),
      dsv(),
    ],
  },
  nitro: {
    preset: "cloudflare-pages-static",
    hooks: {
      "prerender:route"(route) {
        // add route to list
        sitemapRoutes.push(route.route)
      },
      async close() {
        // generate sitemap.xml
        if (sitemapRoutes.length > 0) {
          await generateSitemap(sitemapRoutes, hostname)
        }
      },
    },
  },
  hooks: {
    async "build:before"() {
      await generateSchemas()
      await generateLocType()
    },
    async "builder:watch"(_, _path) {
      if (_path.startsWith("schemas/")) {
        await generateSchemas()
      }
      if (_path.startsWith("locales/")) {
        await generateLocType()
      }
    },
    async "nitro:build:public-assets"() {
      await workboxBuild()
    },
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
    "@nuxt/test-utils/module",
    "@chika3742/mhy-material-components",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
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
      "IBM Plex Sans JP": [500, 700],
      "Kaisei Opti": [700],
      Cairo: [700],
      "Kiwi Maru": [500],
      "Material Symbols Outlined": true,
    },
  },
  piniaPersistedstate: {
    storage: "localStorage",
  },

  runtimeConfig: {
    public: {
      pagesCommitSha: process.env.CF_PAGES_COMMIT_SHA ?? execSync("git rev-parse HEAD").toString().trim(),
      builtAt: DateTime.now().toISO()!,
    },
  },
})
