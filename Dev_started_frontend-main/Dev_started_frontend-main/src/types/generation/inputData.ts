import { InputTypeProps } from "./inputType";

export type InputForm = {
  endpoint: string;
  inputs: InputTypeProps[];
};

export type FeatureData = {
  title: string;
  inputs: InputForm;
  description: string;
  icon: string;
};
