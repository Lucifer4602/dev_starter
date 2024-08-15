import { useQuery } from "react-query";
import getBlogs from "./getBlogs";

const useGetPaginatedBlogs = (page: number) => {
  return useQuery(["paginatedBlogs", page], ({ queryKey }) => {
    const [_, page] = queryKey;
    getBlogs(page as number);
  });
};

export default useGetPaginatedBlogs;
