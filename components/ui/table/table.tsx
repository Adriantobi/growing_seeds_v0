interface TableProps {
  headers: string[];
  data: Record<string, any>[];
  templates?: Record<string, (...args: any) => JSX.Element>;
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

export function Table({ headers, data, templates }: TableProps) {
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
      </table>
    </div>
  );
}
