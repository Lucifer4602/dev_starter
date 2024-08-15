import axios from "axios";

const getBlogs = async (page: number, category?: string, author?: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/blogs`,
      {
        params: {
          page: page,
          page_size: 10,
          category: category,
          author: author,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch blogs");
  }
};
export default getBlogs;
