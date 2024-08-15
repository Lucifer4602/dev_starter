const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

const faqs = [
  {
    question: "What sets TheDevStarter apart from the rest? ",
    answer:
      "The standout feature of TheDevStarter lies in integrating Django Ninja's async powers with Next.js's high performance. This powerful combination delivers an ultra-efficient development workflow, giving you the confidence to launch a robust and scalable SaaS platform built on a dependable foundation.",
  },
  {
    question: "What target audience is TheDevStarter geared towards?",
    answer:
      "Entrepreneurs, startups, and developers looking to embark on a SaaS venture will find TheDevStarter an invaluable resource. It offers a comprehensive set of tools and components for those who want to establish a secure, scalable, and highly performant SaaS application, irrespective of the project's size.",
  },
  {
    question: "Is prior knowledge of React necessary to use TheDevStarter?",
    answer:
      "No, prior React expertise is not a prerequisite to make the most of TheDevStarter. Given that it's built on the React-based Next.js framework, the extensive documentation provided with TheDevStarter is designed to help even those new to React or Next.js to quickly get up to speed.",
  },
  {
    question: "Am I allowed to replicate TheDevStarter and sell it elsewhere?",
    answer:
      "Replicating and reselling TheDevStarter directly contravenes our licensing terms. You may, however, leverage the template as groundwork for your own unique SaaS projects and commercially exploit the final product you create.",
  },
  {
    question:
      "What avenues are available for obtaining support with TheDevStarter?",
    answer:
      "Should you require any support, our team is prepared to assist you promptly. Reach out to us through our designated support channel, and we will address any queries or challenges you face concerning TheDevStarter.",
  },
  {
    question: "Is TheDevStarter equipped with a quality styling tool?",
    answer:
      "Indeed, TheDevStarter is equipped with TailwindCSS, which is celebrated for its modern, utility-first approach to CSS, enabling quick and custom designs with negligible hassle. It's a favorite due to its adaptability and the beautiful, responsive interfaces it can help create.",
  },
  {
    question: "What is TheDevStarter's policy on refunds?",
    answer:
      " Given the digital format of our product, we are unable to issue refunds once a purchase has been completed. Nevertheless, we're committed to your satisfaction and are on hand to resolve any bugs or accommodate requests swiftly to ensure that your experience with TheDevStarter is exceptional.",
  },
  {
    question:
      "How can I get my additional questions about TheDevStarter answered?",
    answer:
      "If you have additional questions or need more detailed guidance, our support team is available to provide the answers and support you need. We want to ensure you have a thorough understanding of how TheDevStarter can benefit your SaaS project, so please feel free to contact us for further information.",
  },
];

export const jsonLdData = {
  "@context": "http://schema.org",
  "@type": "WebPage",
  name: `${companyName} - Contact Us`,
  description:
    "Get in touch with the Dev Starter team for the best SAAS boilerplate help perfect for professionals. Contact us now to unlock your potential!",
  url: `${siteUrl}/contact`,

  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteUrl}/contact`,
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
        name: "Contact Us",
        item: `${siteUrl}/contact`,
      },
    ],
  },

  faqSection: {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq, index) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
};

export const metaData = {
  title: `Contact | Contact support for The DevStarter : Next.js & Django SaaS Boilerplates and Templates for Your Development Success`,
  description:
    "Get in touch with the Dev Starter team for the best SAAS boilerplate help perfect for professionals. Contact us now to unlock your potential!",
  metadataBase: new URL(`${siteUrl}/contact`),
  alternates: {
    canonical: "/",
  },
};
