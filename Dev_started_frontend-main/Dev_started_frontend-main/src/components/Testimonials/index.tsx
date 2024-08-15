import { TwitterIcon } from "lucide-react";

const testimonials = [
  {
    imgUrl: "/testimonials/Gautam.jpg",
    name: "Gautam Singla",
    review:
      "Dev Starter has become an essential tool for my software development projects. Its seamless integration with key technologies like Django, Next.js, and Stripe has not only streamlined development but also allowed me to focus on innovation. Highly recommended!",
    hashTags:
      "#InnovativeDevelopment #StreamlinedWorkflow #DevStarterExperience",
  },
  {
    imgUrl: "/testimonials/Lavish.jpg",
    name: "Lavish Goyal",
    review:
      "Launching a new software project is effortless with Dev Starter. The incorporation of Django Ninja and Next.js, combined with Stripe integration, makes it a standout investment. Exceptionally satisfied with Dev Starter. Strongly recommended.",
    hashTags: "#EffortlessLaunch #DjangoNinjaIntegration #DevStarterInvestment",
  },
  {
    imgUrl: "/testimonials/Ankita.jpg",
    name: "Ankita Chaudhary",
    review:
      "I've used several boilerplates for software projects, but Dev Starter outshines the rest. The smooth integration with Django, Next.js, and Stripe, along with outstanding support, makes it my go-to choice. Don't miss out on trying it!",
    hashTags: "#OutstandingSupport #GoToChoice #DevStarterExcellence",
  },
];
export default function Testimonials() {
  return (
    <>
      {/* Testimonials Section: Social Multiple */}

      <div className="">
        <div className="container mx-auto space-y-16 px-4 py-16 lg:px-8 lg:py-32 xl:max-w-7xl">
          {/* Heading */}
          <div className="text-center">
            <h2 className="mb-4 text-4xl font-black text-black dark:text-white">
              Our users Love TheDevStarter Template
            </h2>
            <div className="mx-auto mb-3 h-1 w-8 rounded-lg bg-pink-500 dark:text-pink-400" />
            <h3 className="mx-auto mb-5 text-xl font-medium leading-relaxed text-gray-700 dark:text-gray-300 lg:w-2/3">
              People are shipping crazy products using TheDevStarter.com
            </h3>
          </div>
          {/* END Heading */}

          {/* Feedback */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="group block rounded-xl border border-gray-200 p-8 transition hover:border-gray-300 active:border-gray-200 active:opacity-75 dark:border-gray-700/75 dark:hover:border-gray-700 dark:active:border-gray-700/75 bg-white dark:bg-transparent"
              >
                <div className="mb-5 flex items-center justify-between space-x-4">
                  <div className="dark:shadow-dark-gray-950 h-12 w-12 flex-none overflow-hidden rounded-full border-2 border-gray-50 transition duration-150 ease-out hover:scale-125 hover:border-white hover:shadow-md active:scale-110 active:border-gray-50 active:shadow-sm dark:border-gray-900 ">
                    <img src={testimonial.imgUrl} alt="testimonial-image" />
                  </div>
                  <div className="grow">
                    <h4 className="text-xl font-semibold">
                      {testimonial.name}
                    </h4>
                  </div>
                  <TwitterIcon className="text-gray-800 hover:scale-125" />
                </div>
                <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-300">
                  {testimonial.review}
                  <span className="text-pink-600 dark:text-pink-400 text-nowrap">
                    {testimonial.hashTags}
                  </span>
                </p>
              </div>
            ))}
          </div>
          {/* END Feedback */}
        </div>
      </div>
      {/* END Testimonials Section: Social Multiple */}
    </>
  );
}
