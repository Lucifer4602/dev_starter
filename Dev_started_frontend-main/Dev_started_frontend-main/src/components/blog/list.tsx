"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { IBlogList, ICategory } from "./types";
import { useState } from "react";
import BlogCard from "./card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFeedbackModalContext } from "@/contexts/ModalProvider";

interface IBlogCardProps extends IBlogList {
  categories: ICategory[];
}
export default function BlogList(props: IBlogCardProps) {
  const { blogs, categories } = props;

  const [blogList, setBlogList] = useState<IBlogList>();
  const router = useRouter();
  const params = useSearchParams();
  const page = parseInt(params.get("page") ?? "1");
  const { openFeedbackModal } = useFeedbackModalContext();

  const changePage = (delta: number) => {
    router.push(`/blog?page=${page + delta}`);
  };

  return (
    <>
      {/* Blog List Section: Featured Posts */}
      <div className="">
        <div className="container mx-auto space-y-4 px-4  py-4 lg:px-8 lg:py-8  xl:max-w-7xl">
          {/* Heading */}
          <div className="flex items-center justify-between border-b py-2 dark:border-gray-700/75">
            <h3 className="font-bold uppercase tracking-wide">Blogs</h3>
            <div>
              {page > 1 && (
                <button
                  onClick={() => {
                    changePage(-1);
                  }}
                  type="button"
                  className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-semibold leading-6 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
                >
                  <ChevronLeft className="inline-block h-5 w-5" />
                </button>
              )}
              {blogs.length > 0 && (
                <button
                  onClick={() => {
                    changePage(1);
                  }}
                  type="button"
                  className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-semibold leading-6 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
                >
                  <ChevronRight className="inline-block h-5 w-5" />
                </button>
              )}
            </div>
          </div>
          {/* END Heading */}

          {/* Blog Posts */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {blogs.map((blog, idx: number) => {
              return <BlogCard key={idx} {...blog} />;
            })}
          </div>
          {/* END Blog Posts */}
        </div>
      </div>
      {/* END Blog List Section: Featured Posts */}
    </>
  );
}
