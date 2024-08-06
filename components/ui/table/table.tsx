interface PaginationProps {
  totalRows: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface TableProps {
  headers: string[];
  data: Record<string, any>[];
  templates?: Record<string, (...args: any) => JSX.Element>;
  pagination?: PaginationProps;
}

function getParamNames(func: any) {
  const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
  const ARGUMENT_NAMES = /([^\s,]+)/g;
  let fnStr = func.toString().replace(STRIP_COMMENTS, "");
  let result = fnStr
    .slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")"))
    .match(ARGUMENT_NAMES);
  if (result === null) result = [];
  return result;
}

export function Table({ headers, data, templates, pagination }: TableProps) {
  return (
    <div className="overflow-x-auto w-full no-scrollbar">
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-zinc-800 sticky top-0">
            {headers.map((header) => (
              <th
                key={header}
                className="text-sm font-normal px-4 py-2 text-left text-zinc-500 first-of-type:rounded-l-xl last-of-type:rounded-r-xl"
              >
                {header.charAt(0).toUpperCase() + header.slice(1)}
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
              {headers.map((header) => (
                <td
                  key={header}
                  className="px-4 py-2 text-sm text-nowrap overflow-ellipsis first-of-type:rounded-l-xl last-of-type:rounded-r-xl"
                >
                  {templates?.[header]
                    ? templates[header](
                        ...getParamNames(templates[header]).map(
                          (param: string) => row[param],
                        ),
                      )
                    : row[header]}
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
