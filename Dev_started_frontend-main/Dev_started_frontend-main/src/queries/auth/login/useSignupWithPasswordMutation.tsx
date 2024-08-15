import axios from "axios";
import { useMutation } from "react-query";

export const useSignUpWithPasswordMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (token: string, verificationRequired: string) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation(
    async ({
      first_name,
      last_name,
      email,
      password,
      affiliateCode,
    }: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      affiliateCode?: string;
    }) => {
      try {
        return axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/authentication/sign-up`,
          data: {
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name,
          },
          params: {
            affiliate_code: affiliateCode,
          },
        });
      } catch (err) {
        console.log("errr--<>", err);
      }
    },
    {
      onSuccess: (axiosResponse) => {
        console.log("axiosResponse---><", axiosResponse);

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
