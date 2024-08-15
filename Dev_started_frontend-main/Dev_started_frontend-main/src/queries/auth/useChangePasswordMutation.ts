import { useMutation } from "react-query";
import authRequest from "../authRequest";
import { User } from "./login/types";

export const useChangePasswordMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (userInfo: User) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation(
    async ({
      oldPassword,
      newPassword,
    }: {
      oldPassword: string;
      newPassword: String;
    }) => {
      return authRequest({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/authentication/change-password`,
        method: "POST",
        data: {
          old_password: oldPassword,
          new_password: newPassword,
        },
      });
    },
    {
      onSuccess: (axiosResponse) => {
        onSuccess?.(axiosResponse.data);
      },
      onError: (error) => {
        onError?.(error);
      },
    },
  );
};
