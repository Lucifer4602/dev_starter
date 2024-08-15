import axios from "axios";
import { useQuery } from "react-query";

export const getSocialAuthInitUrl = async (nextRoute: string) => {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/authentication/social-auth-init-url`,
      params: {
        next_route: nextRoute,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch social auth");
  }
};

const useGetSocialAuthInitUrl = (nextRoute: string) => {
  return useQuery("user-info", async () => {
    return await getSocialAuthInitUrl(nextRoute);
  });
};

export default useGetSocialAuthInitUrl;
