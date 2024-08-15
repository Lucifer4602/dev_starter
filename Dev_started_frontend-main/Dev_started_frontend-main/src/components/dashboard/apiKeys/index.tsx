"use client";

import useGetAPIKeys, { deleteApiKey } from "@/queries/apiAuth/useGetAPIKeys";
import { parseError } from "@/utils/errors";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TablesInCardwithSearchandActions from "../../ui/table/tableWIthSearch";
import { API_KEY_TABLE_HEADERS } from "./constants";
import { TableData } from "@/components/ui/table/types";
import { snakeCaseToTitleCase } from "@/utils/snakeCaseToTitleCase";
import { Trash } from "lucide-react";
import { CreateApiKeySideover } from "./createApiKeySideover";

const ApiKeysTable = () => {

    const { data: apiKeys, isLoading, isError, error, refetch } = useGetAPIKeys();
    const [parsedApiKeys, setParsedApiKeys] = useState<TableData[]>([]);
    const [isCreateApiKeySideoverOpen, setIsCreateApiKeySideoverOpen] = useState(false);

    useEffect(() => {
        const parsedData: Array<TableData> = [];
        apiKeys?.forEach(
            (item: any) => {
                const parsedItem: any = {};
                Object.keys(item)?.map((key: string) => {
                    parsedItem[key] = {
                        title: snakeCaseToTitleCase(key),
                        data: item[key],
                    };
                });
                parsedItem["delete"] = {
                    title: "Delete ?",
                    data: <Trash />,
                    handleClick: async (id: string) => {
                        try {
                            await deleteApiKey(id);
                            toast.success("API Key deleted Succesfully");
                            await refetch();
                        } catch (error) {
                            toast.error(parseError(error));
                        }
                    },
                };
                parsedData.push(parsedItem);
            }
        );
        setParsedApiKeys(parsedData);
    }, [apiKeys, refetch]);

    async function createApiKey() {
        setIsCreateApiKeySideoverOpen(true);
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">API Keys</h2>
            <p className="mb-4">
                {"Your organization’s API keys are listed below. Please be careful with them!"}
            </p>

            <TablesInCardwithSearchandActions
                paginate={false}
                tableHeaders={API_KEY_TABLE_HEADERS}
                heading={"API Keys"}
                allowSearch={false}
                data={parsedApiKeys}
                currentPage={0}
                buttonText={"Create New"}
                onButtonClick={createApiKey}
            />
            <CreateApiKeySideover 
                isOpen={isCreateApiKeySideoverOpen} 
                setIsOpen={() => { setIsCreateApiKeySideoverOpen(!isCreateApiKeySideoverOpen) }} 
                refetch={refetch}
            />
        </div>
    );
}

export default ApiKeysTable;
