const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const jsonLdData = {
  "@context": "http://schema.org",
  "@type": "WebPage",
  name: `${companyName} - Sign Up`,
  description:
    "Sign up for a new account on TheDev Starter and unlock exciting features.",
  url: `${siteUrl}/sign-up`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteUrl}/signup`,
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
        name: "Sign Up",
        item: `${siteUrl}/sign-up`,
      },
    ],
  },
};
export const metaData = {
  title:
    "Sign Up | The DevStarter : Next.js & Django SaaS Boilerplates and Templates for Your Development Success",
  description:
    "Sign up for a new account on TheDev Starter and access scalable and robust SAAS boilerplates and templates built using Django and Next.js.",
  metadataBase: new URL(`${siteUrl}/sign-up`),
  alternates: {
    canonical: "/",
  },
};
