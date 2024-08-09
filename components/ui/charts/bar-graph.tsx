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
            {/*from #f3876f to #f34a22*/}
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
          className="text-sm"
          tickFormatter={(value) => value.slice(0, 3).toUpperCase()}
        />
        <YAxis
          dataKey={yKey}
          tickLine={false}
          tickMargin={0}
          axisLine={false}
          className="text-sm"
        />
        <Tooltip wrapperClassName="rounded-lg text-sm" cursor={false} />
        <Bar
          dataKey={barKey}
          fill="url(#colorUv)"
          barSize={35}
          radius={4}
          activeBar={<Rectangle fill="url(#colorUvSelected)" />}
        />{" "}
      </BarChart>
    </ResponsiveContainer>
  );
}
