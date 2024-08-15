const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const jsonLdData = {
  "@context": "http://schema.org",
  "@type": "WebPage",
  name: `${companyName} - Changelog`,
  description:
    "Explore the changelog for TheDev Starter and stay informed about the latest updates, improvements, and bug fixes. Stay up-to-date on our SaaS platform!",
  url: `${siteUrl}/changelog`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteUrl}/changelog`,
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: companyName,
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Changelog",
        item: `${siteUrl}/changelog`,
      },
    ],
  },
};

export const metaData = {
  title: `Changelog`,
  description:
    "Explore the changelog for TheDev Starter and stay informed about the latest updates, improvements, and bug fixes. Stay up-to-date on our SaaS platform!",
  metadataBase: new URL(`${siteUrl}/changelog`),
  alternates: {
    canonical: "/",
  },
};
