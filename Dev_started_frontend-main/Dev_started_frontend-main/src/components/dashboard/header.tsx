import Link from "next/link";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { MenuIcon } from "lucide-react";
import UserMenuDropdown from "./userMenuDropdown";
import LogoToggle from '../LogoToggle';

interface DashboardHeaderProps {
  desktopSidebarOpen: boolean;
  mobileSidebarOpen: boolean;
  setDesktopSidebarOpen: Dispatch<SetStateAction<boolean>>;
  setMobileSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DashboardHeader(props: DashboardHeaderProps) {
  const logoSrc =LogoToggle();
  const {
    desktopSidebarOpen,
    setDesktopSidebarOpen,
    setMobileSidebarOpen,
    mobileSidebarOpen,
  } = props;

  return (
    <header
      id="page-header"
      className={`fixed left-0 right-0 top-0 z-30 flex h-[70px] flex-none items-center bg-white shadow-sm dark:bg-gray-800 ${
        desktopSidebarOpen ? "lg:pl-64" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-10xl justify-between px-4 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center space-x-2">
          {/* Toggle Sidebar on Desktop */}
          <div className="hidden lg:block">
            <button
              onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
              type="button"
              className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
            >
              <MenuIcon className="hi-solid hi-menu-alt-1 inline-block h-5 w-5" />
            </button>
          </div>
          {/* END Toggle Sidebar on Desktop */}

          {/* Toggle Sidebar on Mobile */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              type="button"
              className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
            >
              <MenuIcon className="hi-solid hi-menu-alt-1 inline-block h-5 w-5" />
            </button>
          </div>
          {/* END Toggle Sidebar on Mobile */}

          {/* END Search */}
        </div>
        {/* END Left Section */}

        {/* Center Section */}
        <div className="flex items-center lg:hidden">
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
        {/* END Center Section */}

        <UserMenuDropdown />
        {/* Right Section */}

        {/* END Right Section */}
      </div>
    </header>
  );
}
