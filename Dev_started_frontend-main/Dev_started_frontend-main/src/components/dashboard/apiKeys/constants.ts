import { TableHeaderObject } from "@/components/ui/table/types";



export const API_KEY_TABLE_HEADERS: TableHeaderObject = {
    id:{
        title:"ID",
        type:"text",
        isHeaderVisible:false
    },
    title: {
      title: "Title",
      type: "text",
    },
    key: {
        title: "Key",
        type: "text",
    },
    created_on: {
      title: "Created On",
      type: "date",
    },
    delete: {
      title: "Delete",
      type: "button",
      inputKey: "id",
    },
  };