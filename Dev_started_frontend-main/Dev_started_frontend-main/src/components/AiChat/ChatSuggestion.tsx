import React from "react";
import { SuggestionArr } from "./constants";
import { ISuggestionBoxProps } from "./types";

const ChatSuggestion = (props: ISuggestionBoxProps) => {
  const { onSuggestionClick } = props;
  return (
    <div>
      <div className="pl-2">Suggestions</div>
      <div className="flex flex-wrap">
        {SuggestionArr.map((suggestion, index) => (
          <p
            className="ml-2 mt-2 mb-2 border rounded-lg p-2 cursor-pointer hover:bg-[#2564ebc7] hover:text-white"
            onClick={() => {
              onSuggestionClick(suggestion);
            }}
            key={index}
          >
            {suggestion}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ChatSuggestion;
