const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const jsonLdData = {
  "@context": "http://schema.org",
  "@type": "WebPage",
  name: `${companyName} - Pricing`,
  description:
    "Explore TheDev Starter pricing plans for the easiest way to create a SaaS that engages your audience and creates customer loyalty. Choose the best plan today!",

  url: `${siteUrl}/pricing`,

  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteUrl}/pricing`,
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
        name: "Pricing",
        item: `${siteUrl}/pricing`,
      },
    ],
  },
};

export const metaData = {
  title: `Pricing | Simple pricing for The DevStarter : Next.js & Django SaaS Boilerplates and Templates for Your Development Success`,
  description:
    "Explore TheDev Starter pricing plans for the easiest way to create a SaaS that engages your audience and creates customer loyalty. Choose the best plan today!",
  metadataBase: new URL(`${siteUrl}/pricing`),
  alternates: {
    canonical: "/",
  },
};
