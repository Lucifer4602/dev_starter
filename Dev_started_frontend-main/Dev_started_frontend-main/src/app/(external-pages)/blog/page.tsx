import { Metadata } from "next";
import BlogList from "@/components/blog/list";
import getBlogs from "../../../queries/blog/getBlogs";
import { Suspense } from "react";
import getCategories from "@/queries/blog/getCategories";
import BlogHeader from "@/components/blog/header";
import { metaData, jsonLdData } from "./metainfo";

export const metadata: Metadata = metaData;
export const dynamic = "force-dynamic";
export default async function BlogPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams?.["page"] ?? 1;
  const selectedCategory = searchParams?.["category"];

  const [blogs, categories] = await Promise.all([
    getBlogs(page as number, (selectedCategory as string) ?? undefined),
    getCategories(),
  ]);
  console.log(blogs);

  return (
    <>
      <section>
        {" "}
        <script
          key="structured-data-blog"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </section>
      <BlogHeader categories={categories} />
      <Suspense key={page as number} fallback={<div />}>
        <BlogList blogs={blogs} categories={categories} />
      </Suspense>
    </>
  );
}
