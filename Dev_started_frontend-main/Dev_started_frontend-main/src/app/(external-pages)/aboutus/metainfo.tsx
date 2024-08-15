const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const jsonLdData = {
  "@context": "http://schema.org",
  "@type": "WebPage",
  name: `${companyName} - About Us | The DevStarter : Next.js & Django SaaS Boilerplates and Templates for Your Development Success`,
  description:
    "Discover the story behind TheDevStarter and our mission to innovate in the tech world with state of the art boilerplates.",
  url: `${siteUrl}/aboutus`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteUrl}/aboutus`,
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
        name: "About Us",
        item: `${siteUrl}/aboutus`,
      },
    ],
  },
};

export const metaData = {
  title: `About Us | The DevStarter : Next.js & Django SaaS Boilerplates and Templates for Your Development Success`,
  description:
    "Discover the story behind TheDevStarter and our mission to innovate in the tech world.",
  metadataBase: new URL(`${siteUrl}/aboutus`),
  alternates: {
    canonical: "/",
  },
};
