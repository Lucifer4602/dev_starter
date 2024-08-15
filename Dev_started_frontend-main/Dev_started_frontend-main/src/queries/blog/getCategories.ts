import { ICategory } from "@/components/blog/types";
import axios from "axios";

const getCategories = async (): Promise<Array<ICategory>> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/categories`,
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Categories");
  }
};
export default getCategories;
