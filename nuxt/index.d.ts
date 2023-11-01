declare module "nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    title: string
    itemI18nKey?: string
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    readonly $isTouchDevice: boolean
    // shim for volar
    localePath: (route: RawLocation | RouteLocation, locale?: Locale) => string
    switchLocalePath: (locale?: Locale) => string
  }
}

export {}
