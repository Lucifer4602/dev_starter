const techStack = [
  {
    name: "Next.js",
    logourl: "/technology/nextjs.svg",
    background: "black",
  },
  {
    name: "Tailwind CSS",
    logourl: "/technology/tailwindcss.svg",
    background: "#5ED3F3",
  },
  {
    name: "Django",
    logourl: "/technology/django.svg",
    background: "#052e16",
  },
  {
    name: "Postgresql",
    logourl: "/technology/postgres .svg",
    background: "#336791",
  },
];
import Image from "next/image";
export default function TechnologyUsed() {
  return (
    <>
      {/* Features Section: Key Features With Icons */}
      <div className="">
        <div className="container mx-auto space-y-16 px-4 py-16 lg:px-8 lg:py-32 xl:max-w-7xl">
          {/* Heading */}
          <div className="text-center">
            <div className="mb-1 text-sm font-bold uppercase tracking-wider text-pink-600 dark:text-pink-500">
              Revolutionize Your SAAS Shipping Experience
            </div>
            <h2 className="mb-4 text-4xl font-black text-black dark:text-white">
              The SAAS Template built for smoothest possible developer
              experience.{" "}
            </h2>
            <h3 className="mx-auto text-xl font-medium leading-relaxed text-gray-700 dark:text-gray-300 lg:w-2/3">
              Being a group of developers ourselves we’ve boiled down to the
              best stack in this saas template to ship out products with speed
              and comfort.
            </h3>
          </div>
          {/* END Heading */}

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4 md:gap-12">
            {techStack.map((technology, idx) => (
              <div key={idx} className="py-5">
                <div className="group relative mb-8 ml-3 inline-flex h-12 w-12 items-center justify-center">
                  <div
                    style={{ backgroundColor: technology.background }}
                    className={`absolute inset-0 -m-3 -rotate-6 rounded-xl } transition duration-150 ease-out group-hover:rotate-6 group-hover:scale-110`}
                  />
                  <div
                    className={`absolute inset-0 -m-3 rotate-2 rounded-xl bg-${technology.background} bg-opacity-50 shadow-inner transition duration-150 ease-out group-hover:-rotate-3 group-hover:scale-110`}
                  />
                  <Image
                    className="relative z-50"
                    src={technology.logourl}
                    height={100}
                    width={100}
                    alt={technology.name}
                  />
                </div>
                <h4 className="mb-2 text-lg font-bold">{technology.name}</h4>
              </div>
            ))}
          </div>
          {/* END Features */}

          {/* Extra Info */}
          <p className="mb-10 text-center text-xl leading-relaxed text-gray-600 dark:text-gray-400 md:mx-36 xl:mx-80">
            <span className="font-semibold">DevStarter&apos;s tech stack,</span>{" "}
            Fuel your SaaS journey with DevStarter&apos;s tech stack merging
            Django Ninja and Next.js for peak performance and scalability. Our
            Next.js Boilerplate excels in SEO and rapid load times, paired with
            TailwindCSS and Postgres DB for solid design and data stability.
            Explore our all-in-one Django and Next.js templates, delivering
            unmatched SaaS performance and reliability.
          </p>
          {/* END Extra Info */}
        </div>
      </div>
      {/* END Features Section: Key Features With Icons */}
    </>
  );
}
