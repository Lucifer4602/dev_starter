import axios from "axios";

const getBlogDetail = async (slug: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/blog/${slug}`,
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch blog data");
  }
};
export default getBlogDetail;
