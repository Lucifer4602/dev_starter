import axios from "axios";
import { useMutation } from "react-query";

export const useSubmitContactFormWithMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (message: string) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation(
    async ({
      first_name,
      last_name,
      email,
      message,
      token,
    }: {
      first_name: string;
      last_name: string;
      email: string;
      message: string;
      token: string;
    }) => {
      try {
        return axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/communication/contact`,
          data: {
            first_name: first_name,
            last_name: last_name,
            email: email,
            message: message,
            token: token,
          },
        });
      } catch (err) {
        console.log("errr--<>", err);
      }
    },
    {
      onSuccess: (axiosResponse) => {
        console.log(axiosResponse);
        onSuccess?.(axiosResponse?.data?.message);
      },
      onError: (error) => {
        console.log("error --<>", error);
        onError?.(error);
      },
    },
  );
};
