declare module "~/assets/data/release-notes.yaml" {
  import {ReleaseNote} from "~/types/generated/release-notes.g"
  const releaseNotes: ReleaseNote[]
  export default releaseNotes
}