import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { MotionProvider } from "@/components/common/motion-provider";
import { site } from "@/config/site";
import { siteUrl } from "@/lib/links";
import "./globals.css";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.subset.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Apple SD Gothic Neo", "Malgun Gothic", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: site.seo.title,
  description: site.seo.description,
  applicationName: site.seo.siteName,
  robots: site.seo.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: site.seo.siteName,
    title: site.seo.title,
    description: site.seo.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.seo.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: ["/og.png"],
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1b0f3a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
