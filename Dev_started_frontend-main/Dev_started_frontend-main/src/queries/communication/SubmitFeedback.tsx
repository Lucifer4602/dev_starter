import axios from "axios";
import { useMutation } from "react-query";

export const useSubmitFeedbackFormWithMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (message: string) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation(
    async ({
      feedback_score,
      feedback_suggestion,
      feedback_other_suggestions,
    }: {
      feedback_score: number;
      feedback_suggestion: string;
      feedback_other_suggestions: string;
    }) => {
      try {
        return axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/communication/feedback`,
          data: {
            feedback_score: feedback_score,
            feedback_suggestion: feedback_suggestion,
            feedback_other_suggestions: feedback_other_suggestions,
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
