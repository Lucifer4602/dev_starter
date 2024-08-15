import React from "react";

import ChatSuggestion from "./ChatSuggestion";
import { IInputBoxProps } from "./types";
import { Mic, SendHorizontal } from "lucide-react";

const InputBox = (props: IInputBoxProps) => {
  const { input, setInput, onSend, isStreaming, hideSuggestions } = props;

  const onSuggestionClick = (suggestion: string) => {
    // setInput(suggestion);
    onSend(suggestion);
  };

  return (
    <div className="max-w-md md:max-w-3xl xl:max-w-5xl mx-auto px-4">
      {hideSuggestions && (
        <ChatSuggestion onSuggestionClick={onSuggestionClick}></ChatSuggestion>
      )}

      <div className="flex border justify-between items-center rounded-full border-gray-300 text-secondary font-semibold mb-2 gap-12 px-4 py-3">
        <input
          type="text"
          placeholder="Type your Question ...."
          className="text-[#2563EB]  placeholder: focus:none bg-transparent  focus:outline-none w-full"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
        />
        <span className="flex flex-row gap-3 flex-shrink-0">
          <button>
            <Mic className="h-5 w-5 text-[#2563EB] " />
          </button>{" "}
          <button
            onClick={() => {
              onSend(input);
            }}
          >
            <SendHorizontal className="w-6 h-6 text-[#2563EB] " />
          </button>{" "}
        </span>
      </div>
    </div>
  );
};

export default InputBox;
