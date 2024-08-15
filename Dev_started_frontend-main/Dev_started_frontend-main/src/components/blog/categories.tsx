"use client";
import { ICategory } from "@/components/blog/types";
import Link from "next/link";
import Badge from "../generic/badge";
import { useSearchParams } from "next/navigation";

interface ICategoriesProps {
  categories: ICategory[];
}
export default function Categories(props: ICategoriesProps) {
  const { categories } = props;
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  return (
    <div className="gap-2 grid grid-flow-col auto-cols-max">
      <Link className="w-fit" href={`/blog`}>
        <Badge text={"All"} color={selectedCategory ? "pink" : "gray"}></Badge>
      </Link>

      {categories?.map((category) => {
        return (
          <div key={category.id} className="">
            <Link className="w-fit" href={`/blog?category=${category.title}`}>
              <Badge
                text={category.title}
                color={selectedCategory == category.title ? "gray" : "pink"}
              ></Badge>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
