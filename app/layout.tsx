import type { Metadata, Viewport } from "next";

import { LocaleProvider } from "@/i18n/locale-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "elkapz labs | Practical AI Implementation & Automation",
  description:
    "Practical AI systems for small businesses. Improve support, operations, admin, and reporting workflows with reliable automation and custom software.",
  keywords: [
    "AI implementation small business",
    "AI automation",
    "customer support automation",
    "business workflow automation",
    "AI consultant Belgrade",
  ],
  openGraph: {
    title: "elkapz labs | Practical AI Implementation & Automation",
    description:
      "Practical AI systems for support, operations, admin, and reporting workflows.",
    type: "website",
    locale: "en_US",
    alternateLocale: "sr_RS",
    siteName: "elkapz labs",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0c0c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
