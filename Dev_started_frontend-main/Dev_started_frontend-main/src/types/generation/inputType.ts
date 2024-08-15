import { HTMLInputTypeAttribute } from "react";

export const enum InputType {
  textInput,
  textArea,
  numberInput,
  InputCluster,
  FileUpload,
}

export type InputTypeProps = {
  name: string;
  label: string;
  placeholder: string;
  type: InputType;
  minLength: number;
  maxLength: number;
  required: boolean;
  dataType: HTMLInputTypeAttribute;
  //Process File would return inputs that can be seeded by to other peers
  processFile?: () => InputValue;
};

export type InputValue = {
  [key: string]: any;
};
