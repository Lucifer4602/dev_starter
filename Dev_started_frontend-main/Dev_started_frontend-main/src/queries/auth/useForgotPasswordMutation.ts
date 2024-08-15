import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export const useForgotPasswordMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (token: string) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation(
    async ({ email }: { email: string }) => {
      try {
        return axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/authentication/request-reset-password`,
          params: {
            email: email,
          },
        });
      } catch (err) {
        console.log("errr--<>", err);
      }
    },
    {
      onSuccess: (axiosResponse) => {
        console.log("axiosResponse---><", axiosResponse);
        toast.success("Please check your email for a Reset link");
      },
      onError: (error) => {
        console.log("error --<>", error);
        onError?.(error);
      },
    },
  );
};
