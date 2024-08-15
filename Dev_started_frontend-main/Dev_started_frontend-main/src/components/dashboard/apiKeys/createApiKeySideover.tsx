import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { parseError } from "@/utils/errors";
import SideOver from "@/components/ui/sideover";
import GenericButton from "@/components/ui/button/genericButton";
import { createApiKey } from "@/queries/apiAuth/useGetAPIKeys";
import { ApiKeyBase } from "@/queries/apiAuth/types";
import { Copy } from "lucide-react";

interface ICreateAPIKeyProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    refetch?: () => void;
}

export function CreateApiKeySideover(props: ICreateAPIKeyProps) {
    const { isOpen, setIsOpen,refetch } = props;
    const [title, setTitle] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiKeyDetail, setApiKeyDetail] = useState<ApiKeyBase>();


    async function handleClick() {
        setIsLoading(true);
        try {
            const response = await createApiKey({
                title: title,
            });
            if (response) {
                setApiKeyDetail(response);
                toast.success("API Key Created");
                await refetch?.();
            }
        }
        catch (error) {
            toast.error(parseError(error));
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (isOpen) {
            setTitle("");
        }
        if(!isOpen){
            setApiKeyDetail(undefined);
        }
    }, [isOpen]);

    return (
        <>
            <SideOver
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title={"Create a new API Key"}
            >
                <div className="mx-2.5 mt-10">
                    {
                        apiKeyDetail ? (
                            <div>
                                <p className="font-bold">API Key Title:</p>
                                <p>{apiKeyDetail.title}</p>
                                <p className="font-bold mt-4">API Key:</p>
                                <div className="flex items-center">
                                    <p className="mr-2">{apiKeyDetail.key}</p>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(apiKeyDetail.key);
                                            toast.success("API Key copied to clipboard");
                                        }}
                                        className="p-2 border rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                                    >
                                        <Copy />
                                    </button>
                                </div>
                                <p className="text-red-500 mt-4">You can see the key only once. Please copy it now.</p>
                            </div>
                        ) : <>

                            <div className="mx-4">

                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                                    <input
                                        id="title"
                                        type="title"
                                        onChange={(e) => {
                                            setTitle(e.target.value);
                                        }}
                                        defaultValue=""
                                        disabled={false}
                                        required
                                        className="mt-1 px-2 py-2 my-2 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-300 dark:focus:border-indigo-600 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-800 focus:ring-opacity-50"
                                    />
                                </div>

                                <GenericButton
                                    onClick={() => {
                                        handleClick()
                                    }}
                                    isLoading={isLoading}
                                >
                                    Create
                                </GenericButton>

                            </div>

                        </>
                    }
                </div>
            </SideOver>
        </>
    );
}
