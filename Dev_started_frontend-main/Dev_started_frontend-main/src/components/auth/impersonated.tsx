"use client";

import { useUserContext } from "@/contexts/userContext";
import useHandleLoginSuccess from "@/hooks/auth/usehandleLoginSuccess";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Impersonated() {
  const searchParams = useSearchParams();
  const [isImpersonated, setIsImpersonated] = useState<boolean>(false);
  const { handleLoginSuccess } = useHandleLoginSuccess();
  const { user } = useUserContext();

  useEffect(() => {
    const code = searchParams?.get("ImpersonationToken");
    if (code) {
      setIsImpersonated(true);
      handleLoginSuccess(code);
    }
    if (user?.is_impersonated) {
      setIsImpersonated(true);
    }
  }, [searchParams, user?.is_impersonated, handleLoginSuccess]);

  if (!isImpersonated) {
    return null;
  }
  return (
    <div className="bg-white fixed bottom-10 right-10 w-56 h-10 rounded-md flex">
      <div>
        <span className=" flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </div>
      <div className="text-gray-700 text-sm">
        You are viewing customer account
      </div>
    </div>
  );
}
