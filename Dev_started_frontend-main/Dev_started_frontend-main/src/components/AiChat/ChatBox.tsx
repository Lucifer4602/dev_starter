"use client";
import React from "react";
import Image from "next/image";
import { IChatBoxProps } from "./types";

import { CHATBOT_NAME, DEFAULT_MESSAGE } from "./constants";
import { useUserContext } from "../../contexts/userContext";
import { classNames } from "@/utils/classNames";

export const ChatBox = (props: IChatBoxProps) => {
  const { isSent, chatContent, isDefault = false } = props;

  const { user } = useUserContext();

  return (
    <div
      className={classNames(
        isSent ? "items-end" : "",
        "flex flex-col mt-12 w-full",
      )}
    >
      <div className="flex mb-2 ">
        <Image
          src={isSent ? user?.avatar_url ?? "" : "/logos/rocket.png"}
          alt=" logo"
          width={32}
          height={32}
        />{" "}
        <span
          className={classNames(
            isSent ? "text-gray-800" : "text-[#2563EB] ",
            "pl-2 font-semibold align-middle flex items-center",
          )}
        >
          {isSent ? `${user?.first_name} ${user?.last_name}` : CHATBOT_NAME}
        </span>
      </div>
      <div
        className={`md:w-3/5 px-4 py-2  border rounded-lg border-[#e1e1e1] shadow-lg shadow-pink-200`}
      >
        {isDefault ? DEFAULT_MESSAGE : chatContent}
      </div>
    </div>
  );
};
