import TimelineWithExtraInfo from "./Timeline";
import Image from "next/image";
export default function AboutCompanywithImages() {
  return (
    <>
      {/* About Section: Company with Images */}
      <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
        <div className="container mx-auto space-y-16 px-4 py-16 lg:px-8 lg:py-28 xl:max-w-7xl">
          {/* Heading */}
          <div>
            <h2 className="mb-4 text-4xl font-black dark:text-white text-black">
              Welcome to TheDevStarter
            </h2>

            <h3 className="text-xl font-medium leading-relaxed text-gray-800 dark:text-gray-300 ">
              Are you tired of grappling with boilerplate code and development
              hassles just like us? Fear not, because TheDevStarter is here to
              revolutionize your SaaS development journey.
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-400">
              Navigating the complexities of starting a new project or SaaS
              venture can be overwhelming. That&apos;s why we&apos;ve crafted
              TheDevStarter, a next.js template and saas boilerplate that takes
              the headache out of development. With a passion for innovation and
              collaboration, our team of dedicated full-stack developers has
              meticulously designed this template to be your launchpad for SaaS
              success.
            </p>
          </div>
          {/* END Heading */}

          {/* Values */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
            <div>
              <h3 className="mb-2 text-xl font-bold text-black">Our Mission</h3>
              <p className="leading-relaxed text-gray-700 dark:text-gray-400">
                At TheDevStarter, our mission is to empower developers,
                startups, and entrepreneurs on their journey to SaaS success. We
                envision a world where the barriers to entry in the tech
                industry are minimized, allowing innovation to flourish and
                ideas to come to life seamlessly.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold text-black">
                The Power of TheDevStarter:
              </h3>
              <p className="leading-relaxed text-gray-700 dark:text-gray-400">
                Experience the transformative power of TheDevStarter – your
                ultimate ally in conquering the challenges of SaaS development.
                Unleash the full potential of your projects with a next.js
                template and saas boilerplate that redefines efficiency,
                performance, and scalability.
              </p>
            </div>
            {/* <div>
                            <h3 className="mb-2 text-xl font-bold">Less is More</h3>
                            <p className="leading-relaxed text-gray-700 dark:text-gray-400">
                                We believe that design should be invisible and enhance the user
                                experience, not get in the way. This gives room for your content
                                to breath and attracts your users’ attention.
                            </p>
                        </div> */}
          </div>
          {/* END Values */}

          {/* Images */}
          <div className=" space-x-2 p-8">
            <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-indigo-600 via-sky-500 to-purple-600 p-2">
              <div className="aspect-h-7 aspect-w-8">
                <Image
                  src="/prototype.png"
                  height={300}
                  width={300}
                  className="rounded-2xl"
                  alt="about"
                />
              </div>
            </div>
            <p className="leading-relaxed text-gray-700 dark:text-gray-400 text-center font-bold m-4">
              TheDevStarter prototype
            </p>
          </div>
          {/* END Images */}

          <TimelineWithExtraInfo />
        </div>
      </div>
      {/* END About Section: Company with Images */}
    </>
  );
}
