"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRightToLine,
  BookIcon,
  LayoutDashboardIcon,
  LogOutIcon,
} from "lucide-react";
const navigationLinks = [
  { href: "/#faq", text: "FAQ" },
  { href: "/contact", text: "Contact" },
  { href: "/pricing", text: "Pricing" },
  { href: "/aboutus", text: "About" },
  { href: "/blog", text: "Blog" },
  {
    href: "https://join.slack.com/t/thedevstarter/shared_invite/zt-29xe3325j-y1RRcoDhpfuAusVBWX1Wxg",
    text: "Slack",
  },
  { href: "/roadmap", text: "Roadmap" },
  { href: "/changelog", text: "Changelog" },
];
import { useUserContext } from "@/contexts/userContext";
import useLogout from "@/hooks/auth/useLogout";
import LogoToggle from '../LogoToggle';

export default function Nav() {
  const { user } = useUserContext();
  const logout = useLogout();
  const logoSrc =LogoToggle();

  return (
    <>
      <header
        id="page-header"
        className="relative flex flex-none items-center py-2.5"
      >
        {/* Main Header Content */}
        <div className="container mx-auto flex flex-col space-y-4 px-4 text-center lg:flex-row lg:items-center lg:justify-between lg:space-x-8 lg:space-y-0 lg:px-8 xl:max-w-7xl">
          {/* Brand */}
          <div className="flex flex-none items-center justify-center">
            <Link
              href="/"
              className=""
            >
            <Image
              src={logoSrc}
              alt={`${process.env.NEXT_PUBLIC_COMPANY_NAME} Logo`}
              width={200}
              height={180}
            />
            </Link>
          </div>
          {/* END Brand */}
          <div className="flex grow flex-col space-y-4 text-center lg:flex-row lg:items-center lg:justify-between lg:space-x-8 lg:space-y-0">
            {/* Navigation */}
            <nav className="flex flex-col gap-6 sm:flex-row justify-center">
              {navigationLinks.map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className="text-sm font-semibold text-gray-900 hover:text-pink-600 dark:text-gray-100 dark:hover:text-pink-400"
                  >
                    <span>{item.text}</span>
                  </Link>
                );
              })}
            </nav>
            {/* END Navigation */}

            {/* Actions */}
            <div className="flex items-center justify-center space-x-2">
              <Link
                target="_blank"
                href="https://docs.thedevstarter.com/"
                className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-900 dark:bg-opacity-50 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
              >
                <BookIcon className="hi-mini hi-document-text inline-block h-5 w-5 text-pink-500" />

                <span>Docs</span>
              </Link>
              {user ? (
                <div className="flex items-center justify-center space-x-2">
                  {" "}
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-900 dark:bg-opacity-50 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
                  >
                    <LayoutDashboardIcon className="hi-mini hi-document-text inline-block h-5 w-5 text-pink-500" />

                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={async () => {
                      await logout();
                    }}
                    className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-900 dark:bg-opacity-50 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
                  >
                    {" "}
                    <LogOutIcon className="hi-mini hi-document-text inline-block h-5 w-5 text-pink-500" />
                    <span>Log out</span>
                  </button>{" "}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-900 dark:bg-opacity-50 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
                >
                  <ArrowRightToLine className="hi-mini hi-document-text inline-block h-5 w-5 text-pink-500" />

                  <span>Login</span>
                </Link>
              )}
            </div>
            {/* END Actions */}
          </div>
        </div>
        {/* END Main Header Content */}
      </header>
    </>
  );
}
