import { RocketIcon } from "lucide-react";

const devFeatures = [
  {
    name: "Customizable Authentication",
    img_url: "/features/authentication.png",
    description:
      " Elevate flexibility with TheDevStarter's customizable authentication. Opt into features like Social Auth, Magic Links, password auth, password reset etc.",
    href: "",
  },
  {
    name: "Stripe Payments",
    img_url: "/features/payments.png",
    description:
      "Boilerplate comes with a Stripe integration that can be used out of the box for subscriptions and one time sales.",
    href: "",
  },
  {
    name: "Performance-Driven APIs",
    img_url: "/features/api.png",
    description:
      "The Boilerplate is powered by Django Ninja, a state of the art REST API framework that gives you speed and performance with async endpoints.",
    href: "",
  },
  {
    name: "Powerful Admin Dashboard with User Impersonation",
    img_url: "/features/djangoadmin.png",
    description:
      "TheDevStarter comes with all batteries included, using Django’s powerful Admin panel customised for ease of use and better content management",
    href: "",
  },
  {
    name: "Customer Support ",
    img_url: "/features/crisp.png",
    description:
      "Crisp Chat comes inbuilt with the template so that you can focus on core business instead of worrying about peripherals",
    href: "",
  },
  {
    name: "Newsletter Management",
    img_url: "/features/newsletter.png",
    description:
      "Connect with your base effortlessly using inbuilt Beehiiv newsletter integration, you can customise it to use your favourite provider with ease",
    href: "",
  },
  {
    name: "Feedback Collection",
    img_url: "/features/feedbackmodal.png",
    description:
      "Use the inbuilt feedback modal to collect NPS (Net Promoter Score) and suggestions to drive your product growth.",
    href: "",
  },
  {
    name: "User Engagement Modals and Toasts",
    img_url: "/features/generalmodal.png",
    description:
      "Trigger modals to target CTAs for premium features, warnings and notifications using inbuilt UI Modals.",
    href: "",
  },
  {
    name: "Admin Controlled Banners",
    img_url: "/features/banner.png",
    description:
      " Use the Banner module of boilerplate to announce sales, offers, new features and maintenance times.",
    href: "",
  },
];

export default function Features() {
  return (
    <>
      {/* Features Section: With Images */}
      <div id="features" className="">
        <div className="container mx-auto space-y-16 px-4 py-16 lg:px-8 lg:py-32 xl:max-w-7xl">
          {/* Heading */}
          <div className="text-center">
            <div className="mb-2 text-sm font-bold uppercase tracking-wider text-pink-600 dark:text-pink-500">
              <RocketIcon className="hi-outline hi-rocket-launch inline-block h-8 w-8" />
            </div>
            <h2 className="mb-4 text-4xl font-black text-black dark:text-white">
              {"Features that are built for developer’s delight"}
            </h2>
            <h3 className="mx-auto text-xl font-medium leading-relaxed text-gray-700 dark:text-gray-300 lg:w-2/3">
              TheDevStarter is built from a developer’s perspective with
              features that are built to help you ship your products like a
              breeze.
            </h3>
          </div>
          {/* END Heading */}

          {/* Features */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-12">
            {devFeatures.map((feature, idx) => (
              <div key={idx} className="py-5">
                <div
                  className="h-[250px] w-[400px] mb-8  bg-gradient-to-r from-pink-200 via-purple-300 to-pink-400



 p-6 rounded-lg flex justify-center"
                >
                  <img
                    src={feature.img_url}
                    className="rounded-lg object-contain "
                    alt="Preview Feature Image"
                  />
                </div>
                <h4 className="mb-2 text-2xl font-bold">{feature.name}</h4>
                <p className="mb-4 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          {/* END Features */}
        </div>
      </div>
      {/* END Features Section: With Images */}
    </>
  );
}
