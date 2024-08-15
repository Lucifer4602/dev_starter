const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
export const jsonLdData = {
  "@context": "http://schema.org",
  "@type": "WebSite",

  name: companyName,
  description:
    "TheDevStarter boilerplate is your launchpad for SaaS success, offering rapid development, optimal performance, and endless scalability. Elevate your SaaS journey today!",
  inLanguage: "en",
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,

  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91 7347298215",
    contactType: "customer service",
    areaServed: ["IN", "US", "BD", "NP", "NG", "IR", "GB"],
    availableLanguage: "en",
  },

  sameAs: [
    "https://twitter.com/thedevstarter",
    "https://www.instagram.com/thedevstarter/",
    "https://www.linkedin.com/company/100653143",
  ],

  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Features",
        item: `${siteUrl}/#features`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Dashboard",
        item: `${siteUrl}/dashboard`,
      },
    ],
  },

  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": siteUrl,
  },
};

export const metaData = {
  title: `Home | The DevStarter | Next.js & Django SaaS Boilerplates and Templates for Your Development Success`,
  keywords: [
    "SAAS Boilerplate",
    "Django Boilerplate",
    "Next.js template",
    "MVP template",
    "Boilerplate",
  ],
  description:
    'Elevate your SaaS journey with TheDevStarter boilerplate, a powerful combination of Django Ninja and Next.js for optimal performance and scalability."',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
};
