const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
export const jsonLdData = {
  "@context": "http://schema.org",
  "@type": "WebPage",
  name: `Blog | ${companyName}`,
  description:
    "Explore the latest blogs on TheDevStarter. Discover solutions for streamlined development, coding tips, and more to elevate your tech projects.",
  url: `${siteUrl}/blog`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteUrl}/blog`,
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
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
    ],
  },
};

export const metaData = {
  title: `Blog | Curating Ideas and tech The DevStarter : Next.js & Django SaaS Boilerplates and Templates for Your Development Success`,
  description:
    "Explore the latest blogs on TheDevStarter. Discover solutions for streamlined development, coding tips, and more to elevate your tech projects.",
  metadataBase: new URL(`${siteUrl}/blog`),
  alternates: {
    canonical: "/",
  },
};
