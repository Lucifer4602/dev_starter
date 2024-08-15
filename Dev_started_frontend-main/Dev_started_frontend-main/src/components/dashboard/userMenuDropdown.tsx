import { useUserContext } from "@/contexts/userContext";
import useLogout from "@/hooks/auth/useLogout";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDown, LogOut, UserCog } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import Image from "next/image";

export default function UserMenuDropdown() {
  const { user } = useUserContext();
  useEffect(() => {
    console.log(user);
  });
  const logout = useLogout();
  return (
    <div className="flex items-center space-x-2">
      {/* User Dropdown */}
      <Menu as="div" className="relative inline-block">
        {/* Dropdown Toggle Button */}
        <Menu.Button className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700">
          <div>
            <Image
              src={user?.avatar_url ?? "/images/defaultAvatar.jpeg"}
              width={32}
              height={32}
              className="rounded-full"
              alt="user Avatar"
            />
          </div>

          <span className="hidden sm:inline">{user?.username}</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="opacity-0 scale-90"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-90"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg shadow-xl focus:outline-none dark:shadow-gray-900">
            <div className="divide-y divide-gray-100 rounded-lg bg-white ring-1 ring-black ring-opacity-5 dark:divide-gray-700 dark:bg-gray-800 dark:ring-gray-700">
              <div className="space-y-1 p-2.5">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/dashboard/settings"
                      className={`group flex w-full items-center space-x-3 rounded-lg border border-transparent px-2.5 py-2 text-sm font-medium ${
                        active
                          ? "bg-pink-50 text-pink-800 dark:border-transparent dark:bg-gray-700/75 dark:text-white"
                          : "text-gray-700 hover:bg-pink-50 hover:text-pink-800 active:border-pink-100 dark:text-gray-200 dark:hover:bg-gray-700/75 dark:hover:text-white dark:active:border-gray-600"
                      }`}
                    >
                      <UserCog className="w-5 h-5 text-gray-500" />
                      <span className="">Settings</span>
                    </Link>
                  )}
                </Menu.Item>
              </div>
              <div className="space-y-1 p-2.5">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={async () => {
                        await logout();
                      }}
                      className={`group flex w-full items-center space-x-3 rounded-lg border border-transparent px-2.5 py-2 text-sm font-medium ${
                        active
                          ? "bg-pink-50 text-pink-800 dark:border-transparent dark:bg-gray-700/75 dark:text-white"
                          : "text-gray-700 hover:bg-pink-50 hover:text-pink-800 active:border-pink-100 dark:text-gray-200 dark:hover:bg-gray-700/75 dark:hover:text-white dark:active:border-gray-600"
                      }`}
                    >
                      <LogOut className="w-5 h-5 text-gray-400" />
                      <span className="">Log out</span>
                    </button>
                  )}
                </Menu.Item>
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
