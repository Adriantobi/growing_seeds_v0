import {
  Bar,
  Rectangle,
  Tooltip,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface BarGraphProps {
  data: Record<string, any>[];
  xKey: string;
  yKey: string;
  barKey: string;
}

function BarGraphTooltip({ active, payload }: any) {
  if (active && payload.length) {
    return (
      <div className="bg-zinc-900 rounded-lg text-xs px-2 py-1 border border-zinc-800">
        <div className="flex flex-col">
          {payload.map((pld: any, index: number) => (
            <div className="flex gap-2 items-center" key={index}>
              <div className="flex gap-4 items-center">
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

export function BarGraph({ data, xKey, yKey, barKey }: BarGraphProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={150}
        height={40}
        margin={{
          left: -20,
          right: 0,
        }}
        data={data}
        accessibilityLayer={false}
      >
        <defs>
          <linearGradient id="colorUvSelected" x1="0" y1="0" x2="0" y2="1">
            <stop offset="15%" stopColor="#f3876f" stopOpacity={0.8} />
            <stop offset="85%" stopColor="#f34a22" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#f3876f" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="15%" stopColor="#302f2f" stopOpacity={0.8} />
            <stop offset="85%" stopColor="#212121" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#302f2f" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey={xKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          className="text-xs"
          tickFormatter={(value) => value.slice(0, 3).toUpperCase()}
        />
        <YAxis
          dataKey={yKey}
          tickLine={false}
          tickMargin={0}
          axisLine={false}
          className="text-xs font-semibold"
        />
        <Tooltip
          cursor={false}
          allowEscapeViewBox={{ x: true, y: true }}
          content={<BarGraphTooltip active={false} payload={[]} label={""} />}
        />
        <Bar
          dataKey={barKey}
          fill="url(#colorUv)"
          barSize={35}
          radius={4}
          activeBar={<Rectangle fill="url(#colorUvSelected)" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
