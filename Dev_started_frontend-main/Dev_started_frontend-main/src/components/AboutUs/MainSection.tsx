import {
  BadgeCheckIcon,
  CheckCircleIcon,
  FlameKindlingIcon,
  FlaskConical,
  HeartIcon,
  ZapIcon,
} from "lucide-react";

export default function AboutCompanywithValues() {
  return (
    <>
      {/* About Section: Company with Values */}
      <div className="">
        <div className="container mx-auto space-y-16 px-4 py-16 lg:px-8 lg:py-32 xl:max-w-7xl">
          {/* Heading */}
          <div className="text-center">
            <h2 className="mb-4 text-4xl font-black dark:text-white">
              Introducing TheDevStarter by Byteoski Pvt. LTD
            </h2>
            <h3 className="mx-auto text-xl font-medium leading-relaxed text-gray-800 lg:w-2/3 dark:text-gray-300">
              At TheDevAngel, we&apos;re more than just developers — we&apos;re
              Tech Innovators dedicated to elevating your SaaS venture. Our
              product, TheDevStarter, is a powerful saas boilerplate designed to
              catalyze your success. Let&apos;s explore the key pillars that
              define our approach:
            </h3>
          </div>
          {/* END Heading */}

          {/* Values with Icons */}
          <div className="grid grid-cols-2 gap-8 rounded-lg border p-8 text-center sm:grid-cols-3 lg:grid-cols-6 dark:border-gray-700/75">
            <div className="space-y-4">
              <HeartIcon className="hi-outline hi-heart inline-block h-10 w-10 text-rose-500" />

              <h3 className="font-medium">Passion</h3>
            </div>
            <div className="space-y-4">
              <FlaskConical className="hi-outline hi-beaker inline-block h-10 w-10 text-emerald-500" />

              <h3 className="font-medium">Creativity</h3>
            </div>
            <div className="space-y-4">
              <BadgeCheckIcon className="hi-outline hi-check-badge inline-block h-10 w-10 text-orange-500" />
              <h3 className="font-medium">Design</h3>
            </div>
            <div className="space-y-4">
              <CheckCircleIcon className="hi-outline hi-check-circle inline-block h-10 w-10 text-sky-500" />

              <h3 className="font-medium">Quality</h3>
            </div>
            <div className="space-y-4">
              <ZapIcon className="hi-outline hi-bolt inline-block h-10 w-10 text-purple-500" />
              <h3 className="font-medium">Simplicity</h3>
            </div>
            <div className="space-y-4">
              <FlameKindlingIcon className="hi-outline hi-fire inline-block h-10 w-10 text-pink-500" />

              <h3 className="font-medium">Motivation</h3>
            </div>
          </div>
          {/* END Values with Icons */}

          {/* Values */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-16">
            <div>
              <h3 className="mb-2 text-xl font-bold">Passion</h3>
              <p className="leading-relaxed text-gray-700 dark:text-gray-400">
                At the heart of our team is a fervent passion for innovation. We
                thrive on crafting products that not only simplify your life but
                also empower you to succeed. Our attention to detail ensures
                that every aspect of TheDevStarter is meticulously designed for
                the best user experience.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold">Commitment</h3>
              <p className="leading-relaxed text-gray-700 dark:text-gray-400">
                We are committed to our craft and stand firmly behind our
                projects. Our commitment extends beyond the initial launch — we
                continually strive to improve and enhance TheDevStarter with
                each update. Our goal is to deliver full-featured packages with
                the smallest possible footprint, ensuring efficiency and
                excellence.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold">Less is More</h3>
              <p className="leading-relaxed text-gray-700 dark:text-gray-400">
                We adhere to the principle that design should be invisible,
                enhancing rather than hindering the user experience. This
                philosophy allows your content to breathe and captivates your
                user&apos;s attention. TheDevStarter embodies this ethos,
                providing a seamless and unobtrusive design that puts your
                project in the spotlight.
              </p>
            </div>
          </div>
          {/* END Values */}
        </div>
      </div>
      {/* END About Section: Company with Values */}
    </>
  );
}
