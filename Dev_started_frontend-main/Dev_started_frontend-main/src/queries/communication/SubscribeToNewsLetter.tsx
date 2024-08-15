import axios from "axios";
import { useMutation } from "react-query";

export const useSubscibeToNewsLetterWithMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (message: string) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation(
    async ({ email }: { email: string }) => {
      try {
        return axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/communication/subscribe-to-newsletter`,
          data: { email: email },
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
