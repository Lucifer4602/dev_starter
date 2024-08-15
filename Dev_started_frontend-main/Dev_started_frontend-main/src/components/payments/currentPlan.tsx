import { BookmarkCheckIcon, CheckCircle2 } from "lucide-react";
import { useUserContext } from "../../contexts/userContext";
import Link from "next/link";

export default function CurrentPlan() {
  const { user, setUser, subscription: currentSubscription } = useUserContext();
  const activationLink: string =
    process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_LINK ?? "";
  return (
    <>
      {currentSubscription && (
        <div className="mx-auto mt-8 items-center overflow-hidden rounded-lg bg-white/50 shadow backdrop-blur-sm dark:bg-gray-800/70 dark:shadow-none md:flex xl:w-5/6">
          <div className="grow p-8">
            <div className="flex justify-start items-center space-x-4 mb-4">
              <h4 className="mb-0.5 text-xl font-bold text-gray-600">
                Current Plan : {currentSubscription.price.plan.title}
              </h4>
              {activationLink && (
                <Link href={activationLink} target="_blank">
                  <button
                    type="button"
                    className="inline-flex justify-center items-center gap-2 border font-semibold rounded-lg px-4 py-1 leading-6 border-pink-700 bg-pink-700 text-white hover:text-white hover:bg-pink-600 hover:border-pink-600 focus:ring focus:ring-pink-400 focus:ring-opacity-50 active:bg-pink-700 active:border-pink-700 dark:focus:ring-pink-400 dark:focus:ring-opacity-90"
                  >
                    Manage Account{" "}
                  </button>
                </Link>
              )}
            </div>
            <p className="mb-5 leading-relaxed text-gray-600 dark:text-gray-400">
              {currentSubscription.price.plan.description}
            </p>

            {currentSubscription.price.plan.features && (
              <>
                <h5 className="my-8 flex items-center">
                  <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-gray-100">
                    Included Features
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-0.5 grow rounded bg-gray-200 dark:bg-gray-700/75"
                  />
                </h5>
                <div className="space-y-4 font-medium lg:space-x-12 lg:space-y-0">
                  <ul className=" gap-6 text-sm grid sm:grid sm:grid-cols-2 md:grid-cols-3">
                    {currentSubscription.price.plan.features?.map(
                      (feature: string, idx: number) => {
                        return (
                          <li key={idx} className="flex items-center space-x-2">
                            <CheckCircle2 className="text-green-600 h-6 w-6 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        );
                      },
                    )}
                  </ul>
                </div>
              </>
            )}
          </div>
          <div className="relative flex-none p-6 md:w-72">
            <div className="absolute right-0 top-0 mr-5 mt-5 flex h-10 w-10 items-center justify-center text-pink-600 dark:text-pink-400">
              <BookmarkCheckIcon className="hi-solid hi-bookmark inline-block h-5 w-5" />
            </div>
            <div className="rounded-lg bg-pink-100 bg-opacity-50 p-6 text-center dark:bg-pink-900 dark:bg-opacity-25">
              <div className="mb-1 text-3xl font-extrabold lg:text-4xl text-gray-600">
                {currentSubscription.price.currency.toUpperCase()}{" "}
                {currentSubscription.price.amount / 100}
              </div>
              {/* <p className="mb-5 text-sm font-medium text-gray-700 dark:text-gray-300">
                {currentSubscription.price.frequency == "month"
                  ? "Monthly"
                  : "Annual"}{" "}
                Subscription
              </p> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
