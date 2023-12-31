export const useConfigStore = defineStore("config", {
  state: () => ({
    /**
     * Theme setting.
     */
    theme: "auto" as ThemeSetting,
    /**
     * Previous version (for update notification)
     */
    previousVersion: getCurrentVersionText(),
  }),
  actions: {
    /**
     * Gets the actual theme to set. (To avoid caching the result, this method is an action.)
     *
     * If the theme is set to `auto`, it will return `dark` or `light` depending on the user's OS settings.
     * Otherwise, it will return the theme set in app.
     */
    getCurrentTheme() {
      if (this.theme === "auto") {
        if (process.client) {
          return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
        }
        return "light"
      }
      return this.theme
    },
  },
  persist: true,
})
