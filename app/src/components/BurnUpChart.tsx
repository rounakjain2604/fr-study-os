import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { BurnUpPoint } from "../lib/analytics";

const tooltipStyle = { background: "var(--panel)", border: "1px solid var(--rule)", color: "var(--text)" };

// Isolated so recharts (a heavy dependency) is loaded only when a chart-bearing
// view is opened, keeping it out of the initial bundle. Default export so it
// can be React.lazy()-ed directly.
export default function BurnUpChart({ burnUp }: { burnUp: BurnUpPoint[] }) {
  return (
    <ResponsiveContainer height={270} width="100%">
      <LineChart data={burnUp} margin={{ bottom: 0, left: -18, right: 10, top: 12 }}>
        <CartesianGrid stroke="var(--rule)" strokeDasharray="2 6" />
        <XAxis dataKey="date" minTickGap={24} stroke="var(--muted)" tick={{ fontSize: 11 }} />
        <YAxis stroke="var(--muted)" tick={{ fontSize: 11 }} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line dataKey="planned" dot={false} stroke="var(--pending)" strokeWidth={2} type="monotone" />
        <Line dataKey="actual" dot={false} stroke="var(--posted)" strokeWidth={3} type="monotone" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function ScoreTrendChart({ data }: { data: Array<{ label: string; score: number }> }) {
  return (
    <ResponsiveContainer height={240} width="100%">
      <LineChart data={data} margin={{ left: -18, right: 10, top: 12 }}>
        <CartesianGrid stroke="var(--rule)" strokeDasharray="2 6" />
        <XAxis dataKey="label" stroke="var(--muted)" tick={{ fontSize: 11 }} />
        <YAxis stroke="var(--muted)" tick={{ fontSize: 11 }} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line dataKey="score" stroke="var(--posted)" strokeWidth={3} type="monotone" />
      </LineChart>
    </ResponsiveContainer>
  );
}
