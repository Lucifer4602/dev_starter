import { ChevronLeft, ChevronRight, RotateCw, Search } from "lucide-react";
import { TableHeaderObject } from "./types";

import { useState } from "react";
import { truncateText } from "@/utils/truncate";
import { formatDate } from "@/utils/formatDateTime";

interface ITableWithSearchProps {
    tableHeaders: TableHeaderObject;
    heading: string;
    subheading?: string;
    onSearch?: (q: string) => void;
    data: Array<any>;
    onButtonClick?: () => void;
    buttonText?: string;
    currentPage: number;
    setCurrentPage?: (page: number) => void;
    paginate?: boolean;
    allowSearch?: boolean;
}

export default function TablesInCardwithSearchandActions(
    props: ITableWithSearchProps,
) {
    const {
        heading,
        subheading,
        onSearch,
        data,
        onButtonClick,
        buttonText,
        tableHeaders,
        currentPage,
        setCurrentPage,
        paginate = true,
        allowSearch = true
    } = props;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const pageSize = 10; // Number of items per page

    const handleTableButtonClick = (direction: "next" | "prev") => {
        if (direction === "next") {
            setCurrentPage?.(props.currentPage + 1);
        } else {
            setCurrentPage?.(props.currentPage - 1);
        }
    };

    return (
        <>
            {/* Tables: In Card with Search and Actions */}
            <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100">
                <div className="flex flex-col gap-3 bg-gray-50 px-5 py-4 text-center dark:bg-gray-700/50 sm:flex-row sm:items-center sm:justify-between sm:text-left">
                    {
                        paginate && (
                            <div className="flex justify-between mt-4 items-center">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => handleTableButtonClick("prev")}
                                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <div className="ml-2 mr-2 border border-gray-300 px-2 py-1 rounded-full ">
                                    {currentPage}
                                </div>
                                <button
                                    disabled={data.length < pageSize}
                                    onClick={() => handleTableButtonClick("next")}
                                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        )

                    }

                    <div>
                        <h3 className="mb-1 font-semibold">{heading}</h3>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {subheading}
                        </h4>
                    </div>
                    <div className="flex items-center gap-2">
                        {buttonText && (
                            <button
                                type="button"
                                onClick={onButtonClick}
                                className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
                            >
                                {buttonText}
                            </button>
                        )}
                    </div>
                </div>
                {
                    allowSearch && (

                        <div className="grow border-b border-gray-100 p-5 dark:border-gray-700">
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0  ml-px flex w-10 items-center justify-center rounded-l text-gray-500">
                                    <Search className="h-4 w-4" />
                                </div>
                                <input
                                    type="text"
                                    id="search"
                                    name="search"
                                    onChange={(e) => onSearch?.(e.target.value)}
                                    className="block w-full rounded-lg border border-gray-200 py-2 pl-10 pr-3 text-sm leading-6 placeholder-gray-400 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-teal-500"
                                    placeholder={`Search all ${heading}..`}
                                />
                            </div>
                        </div>
                    )
                }

                <div className="grow p-5">
                    {/* Responsive Table Container */}
                    <div className="min-w-full overflow-x-auto rounded bg-white dark:border-gray-700 dark:bg-gray-800">
                        {/* Table */}
                        <table className="min-w-full whitespace-nowrap align-middle text-sm">
                            {/* Table Header */}
                            <thead>
                                <tr>
                                    {Object.keys(tableHeaders)?.map((key: string) => {
                                        return (
                                            <>
                                                <th className="border-b-2 border-gray-200/50 pb-4 pr-3 text-left font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-50">
                                                    {tableHeaders[key].isHeaderVisible !== false &&
                                                        tableHeaders[key].title}
                                                </th>
                                            </>
                                        );
                                    })}
                                </tr>
                            </thead>
                            {/* END Table Header */}

                            {/* Table Body */}
                            <tbody>
                                {data.map((item, index) => {
                                    return (
                                        <tr
                                            className="border-b border-gray-100 dark:border-gray-700/50"
                                            key={index}
                                        >
                                            {Object.keys(tableHeaders)?.map(
                                                (key: string, index: number) => {
                                                    if (tableHeaders[key].type == "button") {
                                                        return (
                                                            <td key={index} className="py-1.5 ">
                                                                <button
                                                                    onClick={() => {
                                                                        setIsLoading(true);
                                                                        try {
                                                                            item[key].handleClick(
                                                                                item[tableHeaders[key].inputKey ?? ""]
                                                                                    .data,
                                                                            );
                                                                        } finally {
                                                                            setIsLoading(false);
                                                                        }
                                                                    }}
                                                                    type="button"
                                                                    className=" items-center justify-center space-x-2 rounded-lg  bg-white px-2 py-1 text-sm font-semibold leading-5     dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
                                                                >
                                                                    <div className="flex">
                                                                        {isLoading && (
                                                                            <RotateCw className="animate-spin text-teal-400 h-5 w-5" />
                                                                        )}
                                                                        {item[key]?.data}
                                                                    </div>
                                                                </button>
                                                            </td>
                                                        );
                                                    } else if (tableHeaders[key].type == "date") {
                                                        return (
                                                            <>
                                                                <td className="py-1 pr-3 font-medium">
                                                                    <span
                                                                        title={item[key]?.data}
                                                                        className="inline-block max-w-xs"
                                                                    >
                                                                        {formatDate(item[key]?.data)}
                                                                    </span>
                                                                </td>
                                                            </>
                                                        );
                                                    } else if (tableHeaders[key].type == "array") {
                                                        console.log("------<><><>", item[key]?.data);
                                                        return (
                                                            <>
                                                                <td className="py-1 pr-3 font-medium">
                                                                    <span
                                                                        title={item[key]?.data}
                                                                        className="inline-block max-w-xs"
                                                                    >
                                                                        {item[key]?.data?.join(",")}
                                                                    </span>
                                                                </td>
                                                            </>
                                                        );
                                                    }

                                                    return (
                                                        <>
                                                            <td className="py-1 pr-3 font-medium">
                                                                <span
                                                                    title={item[key]?.data}
                                                                    className=" inline-block max-w-xs"
                                                                >
                                                                    {truncateText(item[key]?.data, 40)}
                                                                </span>
                                                            </td>
                                                        </>
                                                    );
                                                },
                                            )}{" "}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
