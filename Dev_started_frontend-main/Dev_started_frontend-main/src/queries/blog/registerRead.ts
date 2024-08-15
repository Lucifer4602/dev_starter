import axios from "axios";

const registerRead = async (slug: string): Promise<number> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${slug}/read-count`,
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch read count");
  }
};
export default registerRead;
