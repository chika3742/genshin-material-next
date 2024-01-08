import {Readable} from "stream"
import fs from "fs/promises"
import type {SitemapItemLoose} from "sitemap"
import {EnumChangefreq, SitemapStream, streamToPromise} from "sitemap"

export const generateSitemap = async(routes: string[], hostname: string) => {
  const links: SitemapItemLoose[] = routes.map(route => ({
    url: route,
    changefreq: EnumChangefreq.MONTHLY,
  }))

  const stream = new SitemapStream({
    hostname,
  })
  const buffer = await streamToPromise(Readable.from(links).pipe(stream))
  await fs.writeFile("dist/sitemap.xml", buffer.toString())
}
