import { Fragment } from "react";

// Headless UI, for more info and examples you can check out https://github.com/tailwindlabs/headlessui
import { Tab } from "@headlessui/react";
import { UserRoundCog, Wallet } from "lucide-react";
import Profile from "./profile";
import ChangePassword from "./changePassword";
import Billing from "./Billing";

export default function SettingTabs() {
  return (
    <>
      <div className="dark:text-gray-100 dark:bg-gray-900">
        <Tab.Group>
          <Tab.List className="flex items-center space-x-1 text-sm md:space-x-2">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`flex items-center space-x-2 rounded-lg border px-3 py-2.5 font-medium transition focus:outline-none focus:ring focus:ring-pink-500 focus:ring-opacity-25 active:border-pink-100 dark:active:border-pink-500 dark:active:border-opacity-25 md:px-5 ${
                    selected
                      ? "border-pink-50 bg-pink-50 text-pink-600 dark:border-transparent dark:bg-pink-500 dark:bg-opacity-20 dark:text-pink-100"
                      : "border-transparent text-gray-600 hover:bg-pink-50 hover:text-pink-600 dark:text-gray-300 dark:hover:bg-pink-500 dark:hover:bg-opacity-20 dark:hover:text-pink-100"
                  }`}
                >
                  <UserRoundCog className="w-6 h-6 text-gray-500" />
                  <span className="hidden sm:inline-block">Profile</span>
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`flex items-center space-x-2 rounded-lg border px-3 py-2.5 font-medium transition focus:outline-none focus:ring focus:ring-pink-500 focus:ring-opacity-25 active:border-pink-100 dark:active:border-pink-500 dark:active:border-opacity-25 md:px-5 ${
                    selected
                      ? "border-pink-50 bg-pink-50 text-pink-600 dark:border-transparent dark:bg-pink-500 dark:bg-opacity-20 dark:text-pink-100"
                      : "border-transparent text-gray-600 hover:bg-pink-50 hover:text-pink-600 dark:text-gray-300 dark:hover:bg-pink-500 dark:hover:bg-opacity-20 dark:hover:text-pink-100"
                  }`}
                >
                  <Wallet className="w-6 h-6 text-gray-500" />
                  <span className="hidden sm:inline-block">Billing</span>
                </button>
              )}
            </Tab>
          </Tab.List>

          <Tab.Panels className="py-6">
            <Tab.Panel>
              <Profile />
              <ChangePassword />
            </Tab.Panel>
            <Tab.Panel>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-400">
                <Billing />
              </p>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}
