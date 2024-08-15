"use client";
import { CheckIcon, ForwardIcon } from "lucide-react";
import Link from "next/link";

const features = [
  {
    heading: "Next.js and Django Ninja Integration",
    description:
      "Experience the seamless integration of Next.js and Django Ninja, combining the speed of Django Ninja with the powerful optimizations of Next.js for your SaaS projects.",
  },
  {
    heading: "Optimized for SaaS Ventures",
    description:
      "TheDevStarter is a robust saas boilerplate specifically designed to kickstart your SaaS venture. Benefit from the speed, efficiency, and reliability of this next.js template tailored for success.",
  },
  {
    heading: "Fast and Efficient Development",
    description:
      "Embark on your development journey with TheDevStarter and enjoy a streamlined experience. Leverage the strengths of Django Ninja and Next.js to build your SaaS project with speed and precision.",
  },
];
export default function CTAWithFeatures() {
  return (
    <>
      <div className="">
        <div className="container mx-auto space-y-8 px-4 py-16 lg:space-y-16 lg:px-8 lg:py-32 xl:max-w-7xl">
          {/* Heading */}
          <div className="text-center">
            <h2 className="mb-4 text-4xl font-black text-black dark:text-white">
              Accelerate Your SaaS Journey with TheDevStarter
            </h2>
            <h3 className="mx-auto text-xl font-medium leading-relaxed text-gray-700 dark:text-gray-300 lg:w-2/3">
              You will love working with your newly updated and customized
              boilerplate.
            </h3>
          </div>
          {/* END Heading */}

          {/* Features Section */}
          <div>
            {/* Divider: With Label */}
            <div className="my-8 flex items-center">
              <span
                aria-hidden="true"
                className="h-0.5 grow rounded bg-gray-100 dark:bg-gray-700/75"
              />
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                A Joy to use
              </span>
              <span
                aria-hidden="true"
                className="h-0.5 grow rounded bg-gray-100 dark:bg-gray-700/75"
              />
            </div>
            {/* END Divider: With Label */}

            {/* Features */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-3">
                  <CheckIcon className="hi-outline hi-check-circle inline-block h-6 w-6 flex-none text-emerald-600 dark:text-emerald-400" />

                  <div>
                    <h4 className="mb-2 font-semibold text-xl">
                      {feature.heading}
                    </h4>
                    <p className="text-lg font-medium leading-relaxed text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* END Features */}

            {/* Divider */}
            <hr className="my-8 h-0.5 border-0 bg-gray-100 dark:bg-gray-700/75" />
            {/* END Divider */}
          </div>
          {/* END Features Section */}

          {/* Actions */}
          <div className="flex flex-col space-y-2 pb-28 pt-10 sm:flex-row sm:items-center sm:justify-center sm:space-x-2 sm:space-y-0">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center space-x-2 rounded-lg border border-pink-700 bg-pink-700 px-7 py-3.5 font-semibold leading-6 text-white hover:border-pink-600 hover:bg-pink-600 hover:text-white focus:ring focus:ring-pink-400 focus:ring-opacity-50 active:border-pink-700 active:bg-pink-700 dark:focus:ring-pink-400 dark:focus:ring-opacity-90"
            >
              <span>Get Started</span>
              <ForwardIcon className="hi-mini hi-arrow-right inline-block h-5 w-5 opacity-50" />
            </Link>
            <Link
              href="/aboutus"
              className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-7 py-3.5 font-semibold leading-6 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
            >
              <span>Learn More</span>
            </Link>
          </div>
          {/* END Actions */}
        </div>
      </div>
      {/* END CTA Section: With Features */}
    </>
  );
}
