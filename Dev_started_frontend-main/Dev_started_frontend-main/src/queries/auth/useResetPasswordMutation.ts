import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export const useResetPasswordMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (token: string) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation(
    async ({ code, password }: { code: string; password: string }) => {
      try {
        return axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/authentication/reset-password`,
          data: {
            code: code,
            password: password,
          },
        });
      } catch (err) {
        console.log("errr--<>", err);
      }
    },
    {
      onSuccess: (axiosResponse) => {
        toast.success("Password Reset succesfully");
        onSuccess?.(axiosResponse?.data?.token);
      },
      onError: (error) => {
        console.log("error --<>", error);
        onError?.(error);
      },
    },
  );
};
