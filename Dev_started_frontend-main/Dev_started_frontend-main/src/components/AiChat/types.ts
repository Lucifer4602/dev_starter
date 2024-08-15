import { Dispatch, SetStateAction } from "react";
export interface IChatBoxProps {
  isSent: boolean;
  chatContent: string;
  isDefault?: boolean;
}

export type Message = {
  isSent: boolean;
  chatContent: string;
};

export interface IInputBoxProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  onSend: (message: string) => void;
  hideSuggestions: boolean;
  isStreaming: boolean;
}

export interface ISuggestionBoxProps {
  onSuggestionClick: (suggestion: string) => void;
}
