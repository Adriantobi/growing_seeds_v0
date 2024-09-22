import React from "react";

interface PaginationProps {
  totalRows: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface Header {
  name: string;
  value: string;
}

interface TableProps {
  headers: (Header | string)[];
  data: Record<string, any>[];
  templates?: Record<string, (row: Record<string, any>) => JSX.Element>;
  useCheckbox?: boolean;
  pagination?: PaginationProps;
}

export function Table({
  headers,
  data,
  templates,
  pagination,
  useCheckbox,
}: TableProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-x-auto w-full no-scrollbar">
        <table className="table-fixed w-full">
          <thead>
            <tr className="bg-zinc-800 sticky top-0">
              {useCheckbox && (
                <th className="rounded-tl-xl rounded-bl-xl px-1 w-10">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    aria-label="Select all"
                  />
                </th>
              )}
              {headers.map((header) => (
                <th
                  key={typeof header === "string" ? header : header.value}
                  className="text-sm font-normal px-4 py-2 text-left text-zinc-500 first-of-type:rounded-l-xl last-of-type:rounded-r-xl"
                >
                  {(typeof header === "string" ? header : header.name)
                    .charAt(0)
                    .toUpperCase() +
                    (typeof header === "string" ? header : header.name).slice(
                      1,
                    )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={index}
                  className="cursor-default hover:bg-zinc-800 hover:bg-opacity-50"
                >
                  {useCheckbox && (
                    <td className="rounded-tl-xl rounded-bl-xl px-1 w-10">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        aria-label={`Select row ${index + 1}`}
                      />
                    </td>
                  )}
                  {headers.map((header) => (
                    <td
                      key={typeof header === "string" ? header : header.value}
                      className="px-4 py-2 text-sm text-nowrap overflow-ellipsis first-of-type:rounded-l-xl last-of-type:rounded-r-xl"
                    >
                      {templates?.[
                        typeof header === "string" ? header : header.value
                      ]
                        ? templates[
                            typeof header === "string" ? header : header.value
                          ](row)
                        : row[
                            typeof header === "string" ? header : header.value
                          ]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length + (useCheckbox ? 1 : 0)}
                  className="px-4 py-2 text-sm text-center text-zinc-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div className="mt-auto mb-3 bg-zinc-800 rounded-xl px-4 py-2 text-sm w-full">
          <div className="w-full grid grid-cols-3">
            <span className="flex justify-self-start items-center text-zinc-500">
              {pagination.totalRows} rows in {pagination.totalPages} pages
            </span>
            <span className="flex justify-self-center gap-1 items-center">
              {Array.from({ length: pagination.totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => pagination.onPageChange(index + 1)}
                  className={`flex h-6 w-6 justify-center items-center rounded-md ${
                    pagination.currentPage === index + 1
                      ? "bg-zinc-700 text-white"
                      : "bg-zinc-900 text-zinc-500 hover:bg-zinc-700 hover:text-white"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                  aria-current={
                    pagination.currentPage === index + 1 ? "page" : undefined
                  }
                >
                  {index + 1}
                </button>
              ))}
            </span>
            <span className="flex justify-self-end items-center text-zinc-500">
              {pagination.currentPage} of {pagination.totalPages}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
