const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const jsonLdData = {
  "@context": "http://schema.org",
  "@type": "WebPage",
  name: `${companyName} - Roadmap`,
  description:
    "Explore the roadmap for TheDev Starter and stay updated on the latest features and enhancements. Plan your SaaS development journey with us!",
  url: `${siteUrl}/roadmap`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteUrl}/roadmap`,
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
        name: "Roadmap",
        item: `${siteUrl}/roadmap`,
      },
    ],
  },
};

export const metaData = {
  title: `Roadmap`,
  description:
    "Explore the roadmap for TheDev Starter and stay updated on the latest features and enhancements. Plan your SaaS development journey with us!",
  metadataBase: new URL(`${siteUrl}/roadmap`),
  alternates: {
    canonical: "/",
  },
};
