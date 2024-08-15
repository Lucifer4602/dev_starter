import { ChevronUpIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "What sets TheDevStarter boilerplate apart from the rest?",
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
      " Given the digital format of our product, we are unable to issue refunds once a purchase has been completed. Nevertheless, we're committed to your satisfaction and are on hand to resolve any bugs or accommodate requests swiftly to ensure that your experience with TheDevStarter is exceptional and can help you build on top of theDevStarter since we value community and the culture we’re building.",
  },
  {
    question:
      "How can I get my additional questions about TheDevStarter answered?",
    answer:
      "If you have additional questions or need more detailed guidance, our support team is available to provide the answers and support you need. We want to ensure you have a thorough understanding of how TheDevStarter can benefit your SaaS project, so please feel free to contact us for further information.",
  },
];
export default function FAQ() {
  return (
    <>
      {/* FAQ Section: Toggleable */}
      <div id="faq" className="">
        <div className="container mx-auto space-y-16 px-4 py-16 lg:px-8 lg:py-32 xl:max-w-7xl">
          {/* Heading */}
          <div className="text-center">
            <div className="mb-1 text-sm font-bold uppercase tracking-wider text-pink-600 dark:text-pink-500">
              We Answer
            </div>
            <h2 className="text-4xl font-black text-black dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>
          {/* END Heading */}

          {/* FAQ */}
          <div className="mx-auto max-w-2xl divide-y divide-gray-200 dark:divide-gray-700/50">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-4 hover:bg-gray-50 group-open:bg-gray-50 dark:hover:bg-gray-800/50 dark:group-open:bg-gray-800/50">
                  <h4 className="font-semibold text-xl">{faq.question}</h4>
                  <div className="opacity-50 transition duration-300 group-open:rotate-180">
                    <ChevronUpIcon className="hi-mini hi-chevron-down inline-block h-5 w-5" />
                  </div>
                </summary>
                <p className="px-3 pb-6 pt-3 leading-7 text-gray-600 dark:text-gray-400 text-lg">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
          {/* END FAQ */}

          {/* Link */}
          <div className="text-center">
            <Link
              href="contact"
              className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-4 py-2 font-semibold leading-6 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
            >
              <span>Go to support center</span>
              <ExternalLinkIcon className="hi-mini hi-arrow-top-right-on-square inline-block h-5 w-5 opacity-50" />
            </Link>
          </div>
          {/* END Link */}
        </div>
      </div>
      {/* END FAQ Section: Toggleable */}
    </>
  );
}
