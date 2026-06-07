import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { getSiteSettings } from "@/lib/data";

import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://artesanogallery.com";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title =
    settings.seo?.metaTitle ?? settings.brandName ?? "Artesano Gallery";
  const description = settings.seo?.metaDescription ?? settings.tagline ?? "";

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s — ${settings.brandName}` },
    description,
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: settings.brandName,
      type: "website",
      images: settings.seo?.ogImageUrl ? [settings.seo.ogImageUrl] : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: SITE_URL },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-neutral-950 text-neutral-100">
        {children}
      </body>
    </html>
  );
}
