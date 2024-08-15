import React from "react";

const changelogs = [
  {
    date: "January 1, 2024",
    title: "Wishing You a Happy New Year!",
    content:
      "As we step into the new year, TheDevStarter team extends warm wishes for a successful and innovative year ahead. Thank you for being a part of our journey.",
  },
  {
    date: "December 28, 2023",
    title: "Performance Boost with Django Ninja",
    content:
      "Leveraging the power of Django Ninja, TheDevStarter APIs receive a performance boost. Experience faster and more effective endpoints, combining the robust features of Django with the speed of FastAPI.",
  },
  {
    date: "December 18, 2023",
    title: "Seamless Payments with Stripe Integration",
    content:
      "TheDevStarter takes a leap in global transactions with seamless integration of Stripe. Effortlessly manage subscriptions and handle payments, ensuring a smooth experience for your users.",
  },
  {
    date: "December 10, 2023",
    title: "New Authentication Options Added",
    content:
      "Enhance user onboarding with expanded authentication choices. TheDevStarter now supports Google/Social Auth, Magic Link, and Password Auth, providing unparalleled flexibility and security for your SaaS project.",
  },
  {
    date: "November 5, 2023",
    title: "TheDevStarter v1.0 Released!",
    content:
      "Exciting news! TheDevStarter has been updated to version 4.0, bringing a host of new features, optimizations, and bug fixes. Explore the latest enhancements and elevate your SaaS development experience.",
  },
];

const Changelog = () => {
  return (
    <>
      <div className="relative md:my-24 py-5 dark:text-gray-100 max-w-7xl mx-auto">
        <div
          className="absolute bottom-0 left-0 top-0 flex w-10 flex-col justify-center md:w-12 lg:ml-40"
          aria-hidden="true"
        >
          <div className="mx-auto h-2.5 w-1 grow-0 rounded-t bg-gradient-to-b from-transparent to-pink-100 dark:to-pink-900" />
          <div className="mx-auto w-1 grow bg-pink-100 dark:bg-pink-900" />
          <div className="mx-auto h-2.5 w-1 grow-0 rounded-b bg-gradient-to-t from-transparent to-pink-100 dark:to-pink-900" />
        </div>

        <ul className="relative space-y-4 pl-10 md:pl-12 lg:ml-40">
          {changelogs.map((log, index) => (
            <li key={index} className="relative">
              <div className="absolute bottom-0 left-0 top-0 mt-5 flex w-10 -translate-x-full justify-center md:w-12">
                <div className="h-3 w-3 rounded-full bg-pink-500 ring ring-pink-100 ring-opacity-100 ring-offset-2 dark:bg-pink-300 dark:ring-pink-900 dark:ring-offset-gray-900" />
              </div>
              <div className="rounded-xl bg-gray-200 p-4 hover:ring hover:ring-gray-100 hover:ring-offset-2 dark:bg-gray-800 dark:ring-offset-gray-900 dark:hover:ring-gray-700">
                <h4 className="mb-2 font-semibold">{log.title}</h4>
                <p className="text-sm leading-relaxed">{log.content}</p>
              </div>
              <div className="px-4 py-2 lg:absolute lg:bottom-0 lg:left-0 lg:top-0 lg:-ml-12 lg:mt-4 lg:flex lg:w-40 lg:-translate-x-full lg:flex-col lg:p-0 lg:text-right">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {log.date}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Changelog;
