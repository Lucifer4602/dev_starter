import { BoxIcon, ForwardIcon } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      {/* Hero Section: Simple with Logo */}
      <div className="relative overflow-hidden">
        {/* Hero Content */}
        <div className="container relative mx-auto px-4 py-12 lg:px-8 xl:max-w-7xl">
          <div className="text-center">
            <div className="group mb-10 inline-block text-pink-600 hover:text-pink-500 dark:text-pink-400 dark:hover:text-pink-300">
              <BoxIcon className="hi-outline hi-cube-transparent inline-block h-12 w-12 transition group-hover:scale-110 group-active:scale-100" />
            </div>
            <h1 className="mb-4 text-4xl font-black text-black dark:text-white">
              Next.js and Django SaaS Boilerplate: A Perfect Match for
              Enterprises
            </h1>
            <h2 className="mx-auto text-xl font-medium leading-relaxed text-gray-700 dark:text-gray-300 lg:w-2/3">
              Empower enterprise solutions with our Next.js & Django SaaS
              Boilerplate. Built for peak performance, scalability, and
              reliability—an MVP-ready solution accelerating your development
              journey.
            </h2>
          </div>
          <div className="flex flex-col space-y-2 pb-28 pt-10 sm:flex-row sm:items-center sm:justify-center sm:space-x-2 sm:space-y-0">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center space-x-2 rounded-lg border border-pink-700 bg-pink-700 px-7 py-3.5 font-semibold leading-6 text-white hover:border-pink-600 hover:bg-pink-600 hover:text-white focus:ring focus:ring-pink-400 focus:ring-opacity-50 active:border-pink-700 active:bg-pink-700 dark:focus:ring-pink-400 dark:focus:ring-opacity-90"
            >
              <span>Get Started</span>
              <ForwardIcon className="hi-mini hi-arrow-right inline-block h-5 w-5 opacity-50" />
            </Link>
            <Link
              href="aboutus"
              className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-7 py-3.5 font-semibold leading-6 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
            >
              <span>Learn More</span>
            </Link>
          </div>
          <div className="relative mx-5 -mb-5 sm:mb-0 lg:mx-32">
            <div className="absolute inset-0 -m-6 -rotate-2 rounded-xl bg-pink-100 dark:bg-gray-800 lg:-m-8" />
            <div className="absolute inset-0 -m-6 rotate-1 rounded-xl bg-pink-800 bg-opacity-75 shadow-inner dark:bg-pink-900 dark:bg-opacity-75 lg:-m-8" />
            <img
              src="/hero.jpeg"
              className="relative mx-auto rounded-lg shadow-lg"
              alt="Hero Image"
            />
          </div>
        </div>
        {/* END Hero Content */}
      </div>
      {/* END Hero Section: Simple with Logo */}
    </>
  );
}
