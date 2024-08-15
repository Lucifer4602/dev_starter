export type TableHeaderType = "img" | "text" | "button" | "date" | "array";

export interface TableHeader {
  title: string;
  type: TableHeaderType;
  isHeaderVisible?: boolean;
  inputKey?: string;
}

export type TableHeaderObject = { [key: string]: TableHeader };

export interface TableData extends TableHeader {
  data: any;
}
