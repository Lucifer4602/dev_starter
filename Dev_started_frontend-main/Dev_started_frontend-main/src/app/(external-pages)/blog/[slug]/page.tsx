import getBlogDetail from "@/queries/blog/getBlogDetail";
import BlogDetail from "../../../../components/blog/detail";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const slug = params.slug;
  console.log(slug);
  const blogDetail = await getBlogDetail(slug);
  return {
    title: `${blogDetail?.title} | Blog`,
    description: `This blog delves into the intriguing world of ${blogDetail?.title}, exploring its nuances, insights, and captivating narratives`,
    metadataBase: new URL(`${siteUrl}/blog/${slug}`),
    alternates: {
      canonical: "/",
    },
  };
}

// @link https://github.com/vercel/next.js/issues/58615#issuecomment-1839619903
// Force-dynamic required to avoid a noindex tag
export const dynamic = "force-dynamic";
export default async function BlogDetailPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const slug = params.slug;
  console.log(slug);
  const blogDetail = await getBlogDetail(slug);
  const blogData = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    name: `${blogDetail?.title} | Blog`,
    description: `This blog delves into the intriguing world of ${blogDetail?.title}, exploring its nuances, insights, and captivating narratives`,
    url: `${siteUrl}/blog/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${slug}`,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: blogDetail?.title,
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: `${blogDetail?.title} | Blog`,
          item: `${siteUrl}/blog/${slug}`,
        },
      ],
    },
  };
  return (
    <>
      <section>
        {" "}
        <script
          key="structured-data-blog"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogData) }}
        />
      </section>
      <BlogDetail {...blogDetail} slug={slug} />
    </>
  );
}
