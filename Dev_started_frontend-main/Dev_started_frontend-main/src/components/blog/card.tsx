import Link from "next/link";
import { IBlog } from "./types";
import Image from "next/image";
import { Eye, MessagesSquare, MoveUpRight } from "lucide-react";
import formatTimeDifference from "@/utils/formatDateTime";
export default function BlogCard(props: IBlog) {
  const {
    category,
    title,
    slug,
    author,
    updated_on,
    content,
    created_on,
    read_count,
    read_time,
    likes_count,
    image,
  } = props;

  return (
    <div className="flex flex-col">
      <Link
        href={`/blog/${slug}`}
        className="group relative block overflow-hidden rounded-lg w-full"
      >
        <div className="absolute inset-0 flex items-center justify-center bg-pink-700 bg-opacity-75 opacity-0 transition duration-150 ease-out group-hover:opacity-100">
          <MoveUpRight className="text-white text-lg" />
        </div>
        <Image
          src={image ?? "/images/blogDefault.jpeg"}
          alt="Featured Image of blog post"
          height={300}
          width={300}
          className="h-60 w-full"
        />
      </Link>
      <p className="mb-1 mt-3 text-sm font-medium text-gray-600 dark:text-gray-400">
        <span className="font-medium">{formatTimeDifference(created_on)}</span>{" "}
        · {read_time} min read
      </p>
      <h4 className="mb-2 text-lg font-bold sm:text-xl">
        <Link
          href={`/blog/${slug}`}
          className="leading-7 text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400"
        >
          {title}
        </Link>
      </h4>
      <div className="flex gap-2.5">
        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
        >
          <MessagesSquare className="inline-block h-4 w-4 opacity-50" />

          <span>{likes_count}</span>
        </Link>
        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
        >
          <Eye className=" h-4 w-4 opacity-50" />
          <span>{read_count}</span>
        </Link>
      </div>
    </div>
  );
}
