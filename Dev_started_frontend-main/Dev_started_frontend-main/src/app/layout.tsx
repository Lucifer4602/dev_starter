import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppProviders from "./AppProviders";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });
const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const metadata: Metadata = {
  title: {
    template: `%s | ${companyName}`,
    default: companyName,
  },
  generator: "Next.js",
  applicationName: companyName,
  referrer: "origin-when-cross-origin",
  keywords: [
    "boilerplate",
    "boilerplate code",
    "saas boilerplate",
    "saas template",
    "saas templates",
    "next.js starter",
    "next.js boilerplate",
    "Saas Starter Kit",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      // { url: '/logo.jpeg' }, //default favicon
      { url: '/logos/iconblack.png', media: '(prefers-color-scheme: light)' }, //light theme favicon
      { url: '/logos/iconwhite.png', media: '(prefers-color-scheme: dark)' }, //dark theme favicon
    ],
    shortcut: ['/logos/iconblack.png',],
    apple: [{ url: '/logos/iconblack.png' },],
    other: [{
        rel: 'apple-touch-icon-precomposed',
        url: '/logos/iconblack.png',
      },],
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: ["nishantxchandel@gmail.com", siteUrl],
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        type="text/javascript"
        id="crisp chat"
        dangerouslySetInnerHTML={{
          __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="${process.env.NEXT_PUBLIC_CRISP_CHAT_WEBSTIE_ID}";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})()`,
        }}
      ></Script>
      <Script
        type="text/javascript"
        id="Clarity"
        dangerouslySetInnerHTML={{
          __html: `  (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_TAG}");`,
        }}
      />
      <AppProviders>
        <body className={inter.className}>{children}</body>
      </AppProviders>
    </html>
  );
}
