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
    <div className="overflow-x-auto w-full no-scrollbar">
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-zinc-800 sticky top-0">
            {useCheckbox && (
              <th className="rounded-tl-xl rounded-bl-xl px-1">
                <input type="checkbox" />
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
                  (typeof header === "string" ? header : header.name).slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="cursor-default hover:bg-zinc-800 hover:bg-opacity-50"
            >
              {useCheckbox && (
                <td className="rounded-tl-xl rounded-bl-xl flex justify-center items-center h-9">
                  <input type="checkbox" />
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
                    : row[typeof header === "string" ? header : header.value]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {pagination && (
          <tfoot>
            <tr className="bg-zinc-800 sticky bottom-3 ">
              <td colSpan={100} className="rounded-xl px-4 py-2 text-sm w-full">
                <div className="w-full grid grid-cols-3">
                  <span className="flex justify-self-start items-center text-zinc-500">
                    {pagination?.totalRows} rows in {pagination?.totalPages}{" "}
                    pages
                  </span>
                  <span className="flex justify-self-center gap-1 items-center">
                    {new Array(pagination?.totalPages)
                      .fill(0)
                      .map((_, index) => index)
                      .map((number: number) => (
                        <span
                          key={number + 1}
                          className="flex h-6 w-6 bg-zinc-900 justify-center items-center rounded-md"
                        >
                          {number + 1}
                        </span>
                      ))}
                  </span>
                  <span className="flex justify-self-end items-center text-zinc-500">
                    {pagination?.currentPage} of {pagination?.totalPages}
                  </span>
                </div>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
