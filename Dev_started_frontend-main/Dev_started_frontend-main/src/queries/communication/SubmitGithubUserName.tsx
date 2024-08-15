import authRequest from "../authRequest";
import { useMutation } from "react-query";

export const useSubmitGithubUsernameWithMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (message: string) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation(
    async ({ github_username }: { github_username: string }) => {
      return authRequest({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/communication/submit-github-username`,
        method: "POST",
        data: {
          github_username: github_username,
        },
      });
    },
    {
      onSuccess: (axiosResponse) => {
        onSuccess?.(axiosResponse.data);
      },
      onError: (error) => {
        onError?.(error);
      },
    },
  );
};
