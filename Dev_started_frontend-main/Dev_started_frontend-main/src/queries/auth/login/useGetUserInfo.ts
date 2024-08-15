import { useQuery } from "react-query";
import authRequest from "../../authRequest";

export const getUserInfo = async () => {
  try {
    const response = await authRequest({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/authentication/user-info`,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user info");
  }
};

const useGetUserInfo = () => {
  return useQuery("user-info", getUserInfo);
};

export default useGetUserInfo;
