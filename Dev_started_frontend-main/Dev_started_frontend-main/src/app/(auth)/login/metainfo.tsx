const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
export const jsonLdData = {
  "@context": "http://schema.org",
  "@type": "WebPage",
  name: `${companyName} - Login`,
  description:
    "Log in to your account on TheDev Starter and access exclusive features.",
  url: `${siteUrl}/login`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteUrl}/login`,
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
        name: "Login",
        item: `${siteUrl}/login`,
      },
    ],
  },
};

export const metaData = {
  title:
    "Login |  The DevStarter : Next.js & Django SaaS Boilerplates and Templates for Your Development Success",
  description:
    "Log in to your account on TheDevStarter and access exclusive Boilerplate code to launch your MVP with breeze.",
  metadataBase: new URL(`${siteUrl}/login`),
  alternates: {
    canonical: "/",
  },
};
