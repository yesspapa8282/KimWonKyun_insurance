import type { MetadataRoute } from "next";

import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return site.seo.indexable
    ? { rules: { userAgent: "*", allow: "/" } }
    : { rules: { userAgent: "*", disallow: "/" } };
}
