const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const jsonLdData = {
  "@context": "http://schema.org",
  "@type": "WebPage",
  name: `${companyName} - Privacy Policy`,
  description:
    "Read our privacy policy to understand how we handle your data and ensure your online safety.",
  url: `${siteUrl}/privacy`,

  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteUrl}/privacy`,
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
        name: "Privacy Policy",
        item: `${siteUrl}/privacy`,
      },
    ],
  },
};

export const metaData = {
  title: `Privacy Policy |  The DevStarter : Next.js & Django SaaS Boilerplates and Templates for Your Development Success`,
  description:
    "Read our privacy policy to understand how we handle your data and ensure your online safety.",
  metadataBase: new URL(`${siteUrl}/privacy`),
  alternates: {
    canonical: "/",
  },
};
