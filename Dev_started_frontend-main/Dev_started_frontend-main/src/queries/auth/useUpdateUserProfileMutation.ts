import { useMutation } from "react-query";
import authRequest from "../authRequest";
import { User } from "./login/types";

export const useUpdateUserProfileMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (userInfo: User) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation(
    async (form: FormData) => {
      return authRequest({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/authentication/user-profile`,
        method: "PATCH",
        data: form,
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
    },
    {
      onSuccess: (axiosResponse) => {
        console.log("axiosResponse.data---<><>", axiosResponse.data);
        onSuccess?.(axiosResponse.data);
      },
      onError: (error) => {
        console.log("error--<>", error);
        onError?.(error);
      },
    },
  );
};
