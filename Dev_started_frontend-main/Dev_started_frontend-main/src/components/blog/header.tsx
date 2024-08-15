import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Categories from "./categories";
import { ICategory } from "./types";

interface BlogHeaderProps {
  categories: ICategory[];
}
export default function BlogHeader(props: BlogHeaderProps) {
  const { categories } = props;

  return (
    <>
      {/* Page Header Section: With Breadcrumb */}
      <div className="">
        <div className="container mx-auto space-y-16 px-6 py-4 lg:px-8 lg:py-12 xl:max-w-7xl">
          <div className="flex flex-col space-y-12 lg:flex-row lg:items-center lg:space-y-0">
            <div className="text-center lg:w-2/5 lg:text-left">
              <h2 className="mb-4 text-4xl font-black text-black dark:text-white">
                Latest Blogs
              </h2>
              <h3 className="text-md  leading-relaxed text-gray-700 dark:text-gray-300">
                We curate the stories and tutorials every week for you and your
                team.
              </h3>

              <h4 className="text-lg font-semibold leading-relaxed text-gray-700 dark:text-white mt-5">
                Top Categories
              </h4>
              <div className="mt-4">
                <Categories categories={categories} />
              </div>
            </div>

            <div className="text-center lg:w-3/5 lg:text-right">
              {/* Breadcrumbs: Simple with Icons */}
              <nav className="inline-block">
                <ol className="flex items-center">
                  <li>
                    <Link
                      href="/"
                      className="font-medium text-pink-600 hover:text-pink-400 dark:text-pink-400 dark:hover:text-pink-300"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="flex items-center px-1 opacity-25">
                    <ChevronRight className="inline-block size-5" />
                  </li>
                  <Link href="/blog" className="">
                    <li className="font-medium">Our Blog</li>
                  </Link>
                </ol>
              </nav>
              {/* END Breadcrumbs: Simple with Icons */}
            </div>
          </div>
        </div>
      </div>
      {/* END Page Header Section: With Breadcrumb */}
    </>
  );
}
