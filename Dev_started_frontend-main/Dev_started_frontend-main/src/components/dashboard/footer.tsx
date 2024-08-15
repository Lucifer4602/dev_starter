import { HeartIcon } from "lucide-react";

export default function DashboardFooter() {
  return (
    <footer
      id="page-footer"
      className="flex flex-none items-center bg-white dark:bg-gray-800 dark:bg-opacity-50"
    >
      <div className="mx-auto flex w-full max-w-10xl flex-col px-4 text-center text-sm md:flex-row md:justify-between md:text-left lg:px-8">
        <div className="pb-1 pt-4 md:pb-4">
          <a
            href={process.env.NEXT_PUBLIC_SITE_URL}
            target="_blank"
            className="font-medium text-pink-600 hover:text-pink-400 dark:text-pink-400 dark:hover:text-pink-300"
          >
            {process.env.NEXT_PUBLIC_COMPANY_NAME}
          </a>{" "}
          ©
        </div>
        <div className="inline-flex items-center justify-center pb-4 pt-1 md:pt-4 text-gray-600 dark:text-gray-50">
          <span>Crafted with</span>
          <HeartIcon className="hi-solid hi-heart mx-1 inline-block h-4 w-4 text-red-600" />
          <span>
            by{" "}
            <a
              href={process.env.NEXT_PUBLIC_SITE_URL}
              target="_blank"
              className="font-medium text-pink-600 hover:text-pink-400 dark:text-pink-400 dark:hover:text-pink-300"
            >
              {process.env.NEXT_PUBLIC_COMPANY_NAME}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
