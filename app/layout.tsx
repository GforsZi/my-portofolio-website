import type { Metadata } from "next";
import localFont from "next/font/local";

import { Footer } from "@/components/layouts/Footer";
import { Navbar } from "@/components/layouts/Navbar";
import NavLink from "@/components/layouts/NavLink";
import { ThemeProvider } from "@/components/theme-provider";
import {
  siteAuthor,
  siteConfig,
  siteKeywords,
  siteUrl,
} from "@/content/site";
import { getSettings } from "@/lib/data";
import { ClientProviders } from "@/components/layouts/ClientProviders";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/Geist-Variable.woff2",
  variable: "--font-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  variable: "--font-mono",
  weight: "100 900",
});

const siteTitle = siteConfig.name;
const siteDescription = siteConfig.description;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s · ${siteTitle}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: siteAuthor, url: siteUrl }],
  creator: siteAuthor,
  publisher: siteAuthor,
  applicationName: siteTitle,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
    images: [{ url: "/logo.png", width: 512, height: 512, alt: siteTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/logo.png"],
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: siteTitle,
      url: siteUrl,
      description: siteDescription,
      inLanguage: "id",
      author: {
        "@type": "Person",
        name: siteAuthor,
        url: siteUrl,
      },
    },
    {
      "@type": "Person",
      name: siteAuthor,
      url: siteUrl,
      jobTitle: "Software Engineer",
      knowsAbout: siteKeywords,
    },
  ],
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings();

  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar settings={settings} />
          <NavLink/>
          <ClientProviders/>
            <main className="flex flex-1 flex-col">{children}</main>
          <Footer settings={settings} />
        </ThemeProvider>
      </body>
    </html>
  );
}
