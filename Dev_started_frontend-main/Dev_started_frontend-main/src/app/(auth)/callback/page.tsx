"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useHandleLoginSuccess from "../../../hooks/auth/usehandleLoginSuccess";
import { parseError } from "../../../utils/errors";
import { useVerifySocialCodeMutation } from "../../../queries/auth/login/useVerifySocialCodeMutation";
import { useVerifyMagicLinkCode } from "@/queries/auth/login/useVerifyMagicLinkCode";
import Cookies from "js-cookie";
import { AFFILIATE_CODE_KEY } from "@/utils/constants";
import { useLoadingModalContext } from "@/contexts/ModalProvider";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { handleLoginSuccess } = useHandleLoginSuccess();


  const { openLoadingModal, closeLoadingModal } = useLoadingModalContext();
  const {
    mutate: validateToken,
    isLoading: isLoadingCheckoutSession,
    error: checkoutError,
  } = useVerifySocialCodeMutation({
    onError: (error: any) => {
      toast.error(parseError(error));

      // router.push("/login")
    },
    onSuccess: async (token: string) => {
      await handleLoginSuccess(token);
      closeLoadingModal();
    },
  });

  const { mutate: verifyMagicLink, isLoading: isLoadingMagicLink } =
    useVerifyMagicLinkCode({
      onError: (error: any) => {
        toast.error(parseError(error));
      },
      onSuccess: async (token: string) => {
        await handleLoginSuccess(token);
        closeLoadingModal();
      },
    });

  useEffect(() => {
    openLoadingModal();
    const googleToken = searchParams.get("code");

    const emailVerifyCode = searchParams.get("emailVerifyCode");
    const affiliateCode = Cookies.get(AFFILIATE_CODE_KEY);
    if (googleToken) {
      validateToken({
        code: googleToken,
        affiliateCode,
      });
    } else if (emailVerifyCode) {
      //loading start

      verifyMagicLink(emailVerifyCode);
    }
  }, [searchParams, validateToken, verifyMagicLink]);

  return <></>;
}
