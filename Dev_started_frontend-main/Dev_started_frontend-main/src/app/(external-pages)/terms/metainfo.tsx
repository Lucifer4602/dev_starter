const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const jsonLdData = {
  "@context": "http://schema.org",
  "@type": "WebPage",
  name: `${companyName} - Terms and Conditions`,
  description:
    "Read our terms and conditions to understand the guidelines for using our services.",
  url: `${siteUrl}/terms`,

  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteUrl}/terms`,
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
        name: "Terms and Conditions",
        item: `${siteUrl}/terms`,
      },
    ],
  },
};

export const metaData = {
  title: `Terms and Conditions | The DevStarter : Next.js & Django SaaS Boilerplates and Templates for Your Development Success`,
  description:
    "Read our terms and conditions to understand the guidelines for using our services.",
  metadataBase: new URL(`${siteUrl}/terms`),
  alternates: {
    canonical: "/",
  },
};
