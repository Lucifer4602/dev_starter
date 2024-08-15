import React, { useEffect } from "react";
import { useLoadingModalContext } from "@/contexts/ModalProvider";
import { LoaderIcon } from "lucide-react";

const LoadingScreen = () => {
  const { isLoading, closeLoadingModal } = useLoadingModalContext();
  useEffect(() => {
    const handlePopstate = () => {
      if (isLoading) {
        closeLoadingModal();
      }
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [isLoading, closeLoadingModal]);
  return (
    isLoading && (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm animate-pulse">
        <LoaderIcon className="animate-spin absolute top-1/2 left-1/2 h-20 w-20" />
      </div>
    )
  );
};

export default LoadingScreen;
