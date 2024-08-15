import { registerWaitingList } from "@/utils/server-actions/registerWaitingList";
import { useMutation } from "react-query";

export const useSubscribeWaitingListMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (message: string) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation(
    async ({ email }: { email: string }) => {
      try {
        const resp = await registerWaitingList(email);
        console.log("Brevo API Response:", resp);
        return resp;
      } catch (err) {
        console.error("Error subscribing to waiting list:", err);
        throw err;
      }
    },
    {
      onSuccess: (data) => {
        console.log("Subscription successful:", data);
        onSuccess?.("Subscription successful");
      },
      onError: (error) => {
        console.error("Subscription error:", error);
        onError?.(error);
      },
    },
  );
};
