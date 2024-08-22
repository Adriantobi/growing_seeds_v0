import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

interface LineGraphProps {
  data: Record<string, any>[];
  xKey: string;
  line1: string;
  line2: string;
}

function LineGraphTooltip({ active, payload, label }: any) {
  if (active && payload.length) {
    return (
      <div className="bg-zinc-900 rounded-lg text-xs px-4 py-2 border border-zinc-800 flex flex-col gap-2">
        <p className="label">{label}</p>
        <div className="flex flex-col">
          {payload.map((pld: any, index: number) => (
            <div className="flex gap-2 items-center" key={index}>
              <div
                style={{ background: pld.color ? pld.color : "#fff" }}
                className="w-2 h-2 rounded-full"
              ></div>
              <div className="flex gap-4 items-center">
                <div className="text-zinc-500">
                  {pld.dataKey.split("")[0].toUpperCase() +
                    pld.dataKey.slice(1)}
                </div>
                <div>£{pld.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

function LineGraphLegend({ payload }: any) {
  return (
    <div className="flex gap-4 justify-end text-sm">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex gap-2 items-center">
          <div
            style={{ background: entry.color }}
            className="w-2 h-2 rounded-full"
          />
          <span className="text-zinc-500">
            {entry.value.split("")[0].toUpperCase() + entry.value.slice(1)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function LineGraph({ data, xKey, line1, line2 }: LineGraphProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        accessibilityLayer={false}
        data={data}
        margin={{
          left: 18,
          right: 18,
        }}
      >
        <XAxis
          dataKey={xKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          className="text-xs"
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Tooltip
          cursor={false}
          content={<LineGraphTooltip active={false} payload={[]} label={""} />}
        />
        <Legend verticalAlign="top" height={36} content={<LineGraphLegend />} />
        <Line
          dataKey={line1}
          type="linear"
          stroke="#00d693"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey={line2}
          type="linear"
          stroke="#bd553c"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
