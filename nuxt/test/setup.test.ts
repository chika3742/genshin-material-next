import {describe, expect, test} from "vitest"
import {setup, url} from "@nuxt/test-utils"

describe("setup", async() => {
  await setup()

  test("url", () => {
    expect(url("/").startsWith("http://127.0.0.1:")).toBeTruthy()
  })
})
