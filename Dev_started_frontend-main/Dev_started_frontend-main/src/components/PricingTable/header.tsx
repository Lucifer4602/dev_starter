export default function PricingHeader() {
  return (
    <div>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold leading-7 text-pink-600">
          Pricing
        </h2>
        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          {"Simple Pricing that can save weeks of crucial time"}
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 dark:text-gray-400">
        {
          "Acquire instantly and bypass over three months of development duration, extensive effort, and savings exceeding $15,000. Initiate your SAAS enterprise promptly with built-in features like Authentication, Projects, Admin Panel, and integrated Payments, feedback etc."
        }
      </p>
    </div>
  );
}
