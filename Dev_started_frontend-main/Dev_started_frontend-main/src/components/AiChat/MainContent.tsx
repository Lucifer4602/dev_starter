"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChatBox } from "./ChatBox";
import InputBox from "./InputBox";
import { Message } from "./types";
import { useRouter, useSearchParams } from "next/navigation";
import { CHAT_ID_KEY } from "./constants";
import { v4 as uuidv4 } from "uuid";
import { getToken } from "@/utils/auth";
import toast from "react-hot-toast";
import { parseSSEChunks } from "@/utils/streaming";

const MainContent = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const [input, setInput] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const chatId = searchParams.get(CHAT_ID_KEY);

  const token = getToken();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length && isStreaming) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, isStreaming]);

  const onSend = async (input: string) => {
    try {
      const controller = new AbortController();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/sse`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
          body: JSON.stringify({
            chat_id: chatId ?? uuidv4().toString(),
            question: input,
          }),
        },
      );
      const data = response.body;
      let done = false;
      if (!data || response.status != 200) {
        if (response.status == 402) {
          // TODO: add an upgrade model
          toast.error("Please upgrade your plan to continue.");
          return;
        }
        toast.error(
          `Something went wrong please contact ${
            process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support"
          }`,
        );
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();

      let resultString = "";
      let lastMessage = {
        chatContent: input,
        isSent: true,
      };

      let newChatArray: Message[] = messages ?? [];
      newChatArray.push(lastMessage);
      setMessages(newChatArray);
      setIsStreaming(true);
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        if (chunkValue != undefined && chunkValue !== "") {
          let chunks = parseSSEChunks(chunkValue);
          for (let chunk of chunks) {
            try {
              if (chunk["event"] === "update") {
                resultString += chunk["data"];

                if (newChatArray[newChatArray?.length - 1].isSent) {
                  newChatArray = [
                    ...newChatArray,
                    { isSent: false, chatContent: resultString },
                  ];
                  setMessages([...newChatArray]);
                } else {
                  newChatArray[newChatArray.length - 1].chatContent =
                    resultString;
                  setMessages([...newChatArray]);
                }
              }
            } catch (e) {
              console.log(chunkValue);
              console.log("error-<>", e);
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div
      id="page-content"
      className="flex max-w-full flex-auto flex-col md:pt-16 justify-between items-center  sm:px-6 md:px-24"
    >
      <div className="  flex-grow overflow-y-scroll no-scrollbar max-h-[650px] leading-loose scroll-smooth  px-4 w-full">
        {messages.map((message, idx) => {
          return (
            <ChatBox
              key={idx}
              isSent={message.isSent}
              chatContent={message.chatContent}
            />
          );
        })}

        {messages.length == 0 && (
          <ChatBox isSent={false} isDefault={true} chatContent="" />
        )}

        <div className="pt-4" ref={ref} />
      </div>
      <div className="fixed bottom-20 md:bottom-14 w-full">
        <InputBox
          input={input}
          setInput={setInput}
          onSend={onSend}
          hideSuggestions={!!!messages.length}
          isStreaming={isStreaming}
        />
      </div>
    </div>
  );
};

export default MainContent;
