import axios from "axios";
import { useMutation } from "react-query";

export const useLoginWithPasswordMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (token: string, verificationRequired: string) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      try {
        return axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/authentication/log-in`,
          data: { email: email, password: password },
        });
      } catch (err) {
        console.log("errr--<>", err);
      }
    },
    {
      onSuccess: (axiosResponse) => {
        console.log(axiosResponse);
        onSuccess?.(
          axiosResponse?.data?.token,
          axiosResponse?.data?.verification_required,
        );
      },
      onError: (error) => {
        console.log("error --<>", error);
        onError?.(error);
      },
    },
  );
};
