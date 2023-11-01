<script lang="ts" setup>
import {useTheme} from "vuetify"

const feedbackPageUrl = "https://www.chikach.net/genshin-material-feedback/"
const hoyolabArticleUrl = "https://www.hoyolab.com/article/1007396"
const repositoryUrl = "https://github.com/chika3742/genshin-material-next"
const drawerItems: DrawerItemOrDivider[] = [
  {
    icon: "mdi-home",
    to: "/",
  },
]

const router = useRouter()
const i18n = useI18n()
const config = useConfigStore()
const theme = useTheme()

const title = computed(() => getPageTitle(router.currentRoute.value.fullPath, router, i18n))

useHead({
  title,
  titleTemplate: `%s - ${tx("common.appName")}`,
})

const isDrawerOpenOnMobile = ref(false)
const mounted = ref(false)

// register service worker
onBeforeMount(() => {
  if ("serviceWorker" in navigator) {
    const scriptUrl = process.env.NODE_ENV === "production" ? "/sw.js" : "/sw-dev.js"
    navigator.serviceWorker.register(scriptUrl).catch((e) => {
      console.error("Service worker registration failed:", e)
    })
  }
})

const updateCurrentTheme = () => {
  theme.global.name.value = config.getCurrentTheme()
}
// watch theme config change
watch(toRefs(config).theme, () => {
  updateCurrentTheme()
})

onMounted(() => {
  mounted.value = true

  // set theme
  updateCurrentTheme()
  // listen to system theme change
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    updateCurrentTheme()
  })
})
</script>

<template>
  <v-app>
    <client-only>
      <AppDrawer v-model="isDrawerOpenOnMobile" :drawer-items="drawerItems" />
    </client-only>

    <v-app-bar>
      <template #prepend>
        <v-app-bar-nav-icon
          v-show="$vuetify.display.mobile"
          @click="isDrawerOpenOnMobile = true"
        />
      </template>

      <v-app-bar-title>{{ title }}</v-app-bar-title>
    </v-app-bar>

    <v-main class="h-100">
      <div class="d-flex flex-column h-100">
        <v-container v-safe-area="{left: 16, right: 16, top: false, bottom: false}">
          <NuxtPage :keepalive="{max: 5, exclude: ['v-tooltip']}" :page-key="$router.currentRoute.value.path" />
        </v-container>

        <v-spacer />

        <!-- Non-prod warning -->
        <div class="warning-overlay-banner">
          <span>{{ tx("common.nonProdWarning") }}</span>
        </div>

        <AppFooter
          v-model:theme-setting="config.theme"
          :current-version="getCurrentVersionText()"
          :feedback-page-url="feedbackPageUrl"
          :hoyolab-article-url="hoyolabArticleUrl"
          :repository-url="repositoryUrl"
        />
      </div>
    </v-main>

    <v-fade-transition>
      <div v-show="!mounted" class="loading-overlay" />
    </v-fade-transition>
  </v-app>
</template>

<style lang="sass" scoped>
.loading-overlay
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 2000
  backdrop-filter: blur(4px) brightness(0.5)
  --webkit-backdrop-filter: blur(4px) brightness(0.5)

  &::after
    // loading indicator
    content: ""
    position: absolute
    top: 50%
    left: 50%
    width: 100px
    height: 100px
    margin-top: -50px
    margin-left: -50px
    border-radius: 50%
    border: 10px solid rgba(255, 255, 255, 0.2)
    border-top-color: #fff
    animation: spin 1s linear infinite

    @keyframes spin
      from
        transform: rotate(0deg)
      to
        transform: rotate(360deg)

.warning-overlay-banner
  width: 100%
  position: sticky
  padding: 8px 16px
  font-size: 0.8em
  bottom: 0
  z-index: 999
  background: rgba(var(--v-theme-warning), 0.6)
  font-weight: bold
  backdrop-filter: blur(8px)

</style>
