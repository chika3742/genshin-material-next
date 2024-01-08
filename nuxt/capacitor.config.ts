import type {CapacitorConfig} from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "net.chikach.genshinmaterial",
  appName: "genshin-material",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
}

export default config
