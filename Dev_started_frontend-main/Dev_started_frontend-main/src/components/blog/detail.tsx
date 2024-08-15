"use client";
import { IBlog } from "@/components/blog/types";
import registerRead from "@/queries/blog/registerRead";
import { formatDate } from "@/utils/formatDateTime";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useEffectOnceWhen } from "rooks";

const READ_PERCENTAGE_CUTOFF = 0.5;
export default function BlogDetail(props: IBlog) {
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

  const [countRead, setCountRead] = useState<boolean>(true);

  // register a read once user spends READ_PERCENTAGE_CUTOFF percent of estimated read time

  useEffectOnceWhen(() => {
    setTimeout(
      async () => {
        setCountRead(false);
        registerRead(slug);
      },
      READ_PERCENTAGE_CUTOFF * read_time * 60 * 1000,
    );
  }, countRead);

  return (
    <>
      <div className="">
        <div className="container mx-auto space-y-16 px-4 py-16 lg:px-8 lg:py-32 xl:max-w-7xl">
          <div className="text-center">
            <div className="mb-1 text-sm font-bold uppercase tracking-wider text-pink-600 dark:text-pink-500">
              <Link href={`blog?category=${category.id}`}>
                {category.title}
              </Link>
            </div>
            <h2 className="mb-4 text-4xl font-black text-black dark:text-white">
              {title}
            </h2>
            <h3 className="mx-auto text-xl font-medium leading-relaxed text-gray-700 dark:text-gray-300 lg:w-2/3">
              <Link
                href={`blog?author=${author.username}`}
                className="text-pink-600 hover:text-pink-400 dark:text-pink-400 dark:hover:text-pink-300"
              >
                {author.full_name} &nbsp;
              </Link>
              on <span className="font-semibold">{formatDate(created_on)}</span>{" "}
              · {read_time} min read
            </h3>
          </div>

          <div className="flex flex-1 justify-center">
            <Image
              src={image ?? "/images/blogDefault.jpeg"}
              alt="Featured Image of blog post"
              className="rounded-lg"
              height={1200}
              width={800}
            />
          </div>

          <article className="prose prose-lg prose-pink mx-auto dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </article>
        </div>
      </div>
    </>
  );
}
