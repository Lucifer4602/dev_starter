import { useMutation } from "react-query";
import authRequest from "../authRequest";

export const useCreateCheckoutSessionMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (
    sessionId?: string,
    invoiceUrl?: string,
    message?: string,
  ) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation(
    async (priceId: string) => {
      return authRequest({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/checkout-session`,
        method: "POST",
        params: {
          price_id: priceId,
        },
      });
    },
    {
      onSuccess: (axiosResponse) => {
        onSuccess?.(
          axiosResponse.data?.id,
          axiosResponse.data?.invoice_url,
          axiosResponse.data?.message,
        );
      },
      onError: (error) => {
        console.log("error--<>", error);
        onError?.(error);
      },
    },
  );
};
