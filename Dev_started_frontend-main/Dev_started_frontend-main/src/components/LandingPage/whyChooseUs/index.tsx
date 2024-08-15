import { GlobeIcon, KanbanIcon, PieChartIcon, PuzzleIcon } from "lucide-react";

const WhyChooseFeatures = [
  {
    heading: "Powerful Duo: Django Ninja and Next.js",
    description:
      "Experience the synergy of Django Ninja, a FastAPI-inspired Django framework, seamlessly blended with Next.js. This powerful combination retains Django&apos;s prolific features while enhancing asynchronous functionality for peak performance.",
    syle1: "",
  },
  {
    heading: "TailwindCSS & Postgress DB",
    description:
      "Leverage TailwindCSS for swift and stylish designs with minimal effort. Ensure stability for your data-driven services with Postgress DB, a tried-and-true database that promises reliability and performance.",
  },
  {
    heading: "Comprehensive Feature Suite",
    description:
      "With TheDevStarter, you&apos;re not just getting a saas boilerplate; you&apos;re acquiring a future-proof foundation for your SaaS project. Benefit from detailed documentation, an admin panel, blog integration, and newsletter support to streamline your development process.",
  },
  {
    heading: "Streamlined Deployment and Infrastructure",
    description:
      "Utilize CI/CD pipelines for easy deployment on AWS, Docker, and Docker Compose support for flexible deployment options. Fully async APIs optimize compute usage with performance-tested asynchronous functionality.",
  },
  {
    heading: "Lifetime Updates and Support",
    description:
      "TheDevStarter isn&apos;t just a starting point; it&apos;s a long-term partner in your SaaS journey. Enjoy lifetime updates, an admin panel for seamless content management, blog integration for enhanced SEO, and newsletter support for effective email marketing.",
  },
];

export default function WhyChooseUs() {
  return (
    <>
      {/* Features Section: Vertical Cards */}
      <div className="overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-32 xl:max-w-7xl">
          <div className="flex flex-col space-y-12 lg:flex-row lg:items-center lg:space-x-20 lg:space-y-0">
            {/* Heading */}
            <div className="space-y-10 md:py-12 lg:w-5/12 xl:w-5/12">
              <div>
                <div className="mb-1 text-sm font-bold uppercase tracking-wider text-pink-600 dark:text-pink-500">
                  {"Choose the best NEXT.js and Django template"}
                </div>
                <h2 className="mb-4 text-4xl font-black text-black dark:text-white">
                  Why Choose TheDevStarter out of all SAAS Boilerplates{" "}
                </h2>
              </div>
            </div>
            {/* END Heading */}

            {/* Features in Cards */}
            <div className="relative flex-none lg:w-7/12 xl:w-7/12">
              <div className="bg-tranparent absolute left-0 top-0 -ml-12 -mt-5 h-40 w-40 rounded-full border border-orange-200 dark:border-orange-900 lg:h-72 lg:w-72" />
              <div className="bg-tranparent absolute left-0 top-0 -ml-14 -mt-2 h-40 w-40 rounded-full border border-orange-100 dark:border-orange-950 lg:h-72 lg:w-72" />
              <div className="bg-tranparent absolute bottom-0 right-0 -mb-5 -mr-12 h-40 w-40 rounded-full border border-purple-200 dark:border-purple-900 lg:h-72 lg:w-72" />
              <div className="bg-tranparent absolute bottom-0 right-0 -mb-2 -mr-14 h-40 w-40 rounded-full border border-purple-100 dark:border-purple-950 lg:h-72 lg:w-72" />
              <div className="relative flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
                <div className="space-y-6 md:mt-24 md:w-1/2">
                  <div className="group rounded-2xl border border-gray-200 bg-white/25 p-6 backdrop-blur-sm transition duration-200 ease-out hover:border-orange-300 dark:border-gray-700/75 dark:bg-gray-800/25 dark:hover:border-orange-700/75 xl:p-8">
                    <div className="relative m-2 mb-6 inline-flex h-10 w-10 items-center justify-center">
                      <div className="absolute inset-0 -m-2 rotate-6 transform rounded-3xl bg-orange-300 transition duration-200 ease-out group-hover:-rotate-3 group-hover:scale-105" />
                      <div className="absolute inset-0 -rotate-6 transform rounded-2xl bg-orange-700 bg-opacity-75 shadow-inner transition duration-200 ease-out group-hover:rotate-2 group-hover:scale-105" />
                      <KanbanIcon className="hi-outline hi-chart-pie relative inline-block h-6 w-6 text-white transition duration-200 ease-out group-hover:scale-110" />
                    </div>
                    <h4 className="mb-2 text-lg font-bold">
                      Powerful Duo: Django Ninja and Next.js
                    </h4>
                    <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                      {
                        "Experience the synergy of Django Ninja, a FastAPI-inspired Django framework, seamlessly blended with Next.js. This powerful combination retains Django's prolific features while enhancing asynchronous functionality for peak performance."
                      }
                    </p>
                  </div>
                  <div className="group rounded-2xl border border-gray-200 bg-white/25 p-6 backdrop-blur-sm transition duration-200 ease-out hover:border-rose-300 dark:border-gray-700/75 dark:bg-gray-800/25 dark:hover:border-rose-700/75 xl:p-8">
                    <div className="relative m-2 mb-6 inline-flex h-10 w-10 items-center justify-center">
                      <div className="absolute inset-0 -m-2 rotate-6 transform rounded-3xl bg-rose-300 transition duration-200 ease-out group-hover:-rotate-3 group-hover:scale-105" />
                      <div className="absolute inset-0 -rotate-6 transform rounded-2xl bg-rose-700 bg-opacity-75 shadow-inner transition duration-200 ease-out group-hover:rotate-2 group-hover:scale-105" />
                      <PieChartIcon className="hi-outline hi-chart-pie relative inline-block h-6 w-6 text-white transition duration-200 ease-out group-hover:scale-110" />
                    </div>
                    <h4 className="mb-2 text-lg font-bold">
                      Comprehensive Feature Suite
                    </h4>
                    <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                      {
                        "With TheDevStarter, you're not just getting a saas boilerplate; you're acquiring a future-proof foundation for your SaaS project. Benefit from detailed documentation, an admin panel, blog integration, and newsletter support to streamline your development process"
                      }
                    </p>
                  </div>
                </div>
                <div className="space-y-6 md:w-1/2">
                  <div className="group rounded-2xl border border-gray-200 bg-white/25 p-6 backdrop-blur-sm transition duration-200 ease-out hover:border-emerald-300 dark:border-gray-700/75 dark:bg-gray-800/25 dark:hover:border-emerald-700/75 xl:p-8">
                    <div className="relative m-2 mb-6 inline-flex h-10 w-10 items-center justify-center">
                      <div className="absolute inset-0 -m-2 rotate-6 transform rounded-3xl bg-emerald-300 transition duration-200 ease-out group-hover:-rotate-3 group-hover:scale-105" />
                      <div className="absolute inset-0 -rotate-6 transform rounded-2xl bg-emerald-700 bg-opacity-75 shadow-inner transition duration-200 ease-out group-hover:rotate-2 group-hover:scale-105" />
                      <GlobeIcon className="hi-outline hi-chart-pie relative inline-block h-6 w-6 text-white transition duration-200 ease-out group-hover:scale-110" />
                    </div>
                    <h4 className="mb-2 text-lg font-bold">
                      Streamlined Deployment and Architecture
                    </h4>
                    <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                      {
                        "Utilize CI/CD pipelines for easy deployment on AWS using Docker, and Docker Compose support for flexible deployment options. Fully async APIs to optimize your compute usage with performance-tested asynchronous functionality."
                      }
                    </p>
                  </div>
                  <div className="group rounded-2xl border border-gray-200 bg-white/25 p-6 backdrop-blur-sm transition duration-200 ease-out hover:border-purple-300 dark:border-gray-700/75 dark:bg-gray-800/25 dark:hover:border-purple-700/75 xl:p-8">
                    <div className="relative m-2 mb-6 inline-flex h-10 w-10 items-center justify-center">
                      <div className="absolute inset-0 -m-2 rotate-6 transform rounded-3xl bg-purple-300 transition duration-200 ease-out group-hover:-rotate-3 group-hover:scale-105" />
                      <div className="absolute inset-0 -rotate-6 transform rounded-2xl bg-purple-700 bg-opacity-75 shadow-inner transition duration-200 ease-out group-hover:rotate-2 group-hover:scale-105" />
                      <PuzzleIcon className="hi-outline hi-chart-pie relative inline-block h-6 w-6 text-white transition duration-200 ease-out group-hover:scale-110" />
                    </div>
                    <h4 className="mb-2 text-lg font-bold">
                      Lifetime Updates and Support
                    </h4>
                    <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                      {
                        "TheDevStarter isn't just a starting point; it's a long-term partner in your SaaS journey. Enjoy lifetime updates, an admin panel for seamless content management, blog integration for enhanced SEO, and newsletter support for effective email marketing. Our team is always ready to entertain your requests and build features you would want in next updates."
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* END Features in Cards */}
          </div>
        </div>
      </div>
      {/* END Features Section: Vertical Cards */}
    </>
  );
}
