"use client";
import React, { useEffect, useState } from "react";
import { useUserContext } from "@/contexts/userContext";
import { useSubmitGithubUsernameWithMutation } from "@/queries/communication/SubmitGithubUserName";
import toast from "react-hot-toast";
import { parseError } from "@/utils/errors";
import { CheckCircle2Icon } from "lucide-react";
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

const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

const dashboardData = {
  "@context": "http://schema.org",
  "@type": "WebPage",
  name: `${companyName} - Dashboard`,
  description:
    "Manage your SaaS venture with ease using TheDevStarter's dashboard.",
  url: `${siteUrl}/dashboard`,
};

const Dashboard = () => {
  const { user, setUser, subscription: currentSubscription } = useUserContext();
  const [disabled, setDisabled] = useState(false);
  const [githubUsername, setGithubUsername] = useState(" ");
  const { mutate: submitGithubUsername } = useSubmitGithubUsernameWithMutation({
    onSuccess: async (message) => {
      toast.success(message);
    },
    onError: (error: any) => {
      toast.error(parseError(error));
      setDisabled(false);
    },
  });
  useEffect(() => {
    if (user?.github_username) {
      setDisabled(true);
      setGithubUsername(user?.github_username);
    }
  }, [user]);
  const handlesubmit = () => {
    setDisabled(true);
    submitGithubUsername({ github_username: githubUsername });
  };
  return (
    <>
      <section>
        <script
          key="structured-data-dashboard"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dashboardData) }}
        />
      </section>
      <div>
        {currentSubscription ? (
          <>
            <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100">
              <div className="w-full grow border-l-4 border-pink-500 p-5">
                <h3 className="mb-1 text-lg font-semibold">Activation Step</h3>
                <p className="mb-4 text-gray-500 dark:text-gray-400">
                  Please enter your github username to get access to your repo
                </p>
                <div className="space-y-2 sm:flex sm:space-x-2 sm:space-y-0 md:w-1/2">
                  <input
                    className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm leading-5 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-700 dark:bg-gray-900/25 dark:placeholder-gray-400 dark:focus:border-pink-500"
                    type="text"
                    name="github_username"
                    disabled={disabled}
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                    placeholder="Enter github username"
                  />
                  <button
                    type="submit"
                    disabled={disabled}
                    onClick={handlesubmit}
                    className="inline-flex items-center justify-center space-x-2 rounded-lg border border-pink-200 bg-pink-100 px-3 py-2 text-sm font-semibold leading-5 text-pink-800 hover:border-pink-300 hover:text-pink-900 hover:shadow-sm focus:ring focus:ring-pink-300 focus:ring-opacity-25 active:border-pink-200 active:shadow-none dark:border-pink-200 dark:bg-pink-200 dark:hover:border-pink-300 dark:hover:bg-pink-300 dark:focus:ring-pink-500 dark:focus:ring-opacity-50 dark:active:border-pink-200 dark:active:bg-pink-200"
                  >
                    {!disabled ? "Submit" : "Accessed"}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
              <div className="container mx-auto space-y-8 px-4 py-16 lg:space-y-16 lg:px-8 lg:py-32 xl:max-w-7xl">
                <div className="text-center">
                  <h2 className="mb-4 text-4xl font-black text-black dark:text-white">
                    Unleash your business today
                  </h2>
                  <h3 className="mx-auto text-xl font-medium leading-relaxed text-gray-700 lg:w-2/3 dark:text-gray-300">
                    Effortlessly craft stunning SAAS products with our powerful
                    boilerplate and streamline your SAAS creation process with
                    ease.
                  </h3>
                </div>

                <div>
                  <div className="my-8 flex items-center">
                    <span
                      aria-hidden="true"
                      className="h-0.5 grow rounded bg-gray-100 dark:bg-gray-700/75"
                    />
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                      Best Features
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-0.5 grow rounded bg-gray-100 dark:bg-gray-700/75"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {features?.map((feature, idx) => (
                      <div key={idx} className="flex gap-3">
                        <CheckCircle2Icon className="hi-outline hi-check-circle inline-block size-6 flex-none text-emerald-600 dark:text-emerald-400" />

                        <div>
                          <h4 className="mb-2 font-semibold text-xl">
                            {feature.heading}{" "}
                          </h4>
                          <p className="text-base font-medium leading-relaxed text-gray-600 dark:text-gray-400">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="my-8 h-0.5 border-0 bg-gray-100 dark:bg-gray-700/75" />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center space-x-2 rounded-lg border border-pink-700 bg-pink-700 px-6 py-3 font-semibold leading-6 text-white hover:border-pink-600 hover:bg-pink-600 hover:text-white focus:ring focus:ring-pink-400 focus:ring-opacity-50 active:border-pink-700 active:bg-pink-700 dark:focus:ring-pink-400 dark:focus:ring-opacity-90"
                  >
                    <span>Buy Now</span>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
