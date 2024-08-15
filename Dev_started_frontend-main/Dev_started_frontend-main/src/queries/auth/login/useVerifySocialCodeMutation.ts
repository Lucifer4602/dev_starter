import axios from "axios";
import { useMutation } from "react-query";

export const useVerifySocialCodeMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (token: string) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation(
    async ({
      code,
      affiliateCode,
    }: {
      code: string;
      affiliateCode?: string;
    }) => {
      try {
        return axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/authentication/check-social-auth-code`,
          params: {
            code: code,
            affiliate_code: affiliateCode,
          },
        });
      } catch (err) {
        console.log("errr--<>", err);
      }
    },
    {
      onSuccess: (axiosResponse) => {
        onSuccess?.(axiosResponse?.data?.token);
      },
      onError: (error) => {
        onError?.(error);
      },
    },
  );
};
