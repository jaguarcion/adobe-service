"use client"

import * as React from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const METRICS = [
  {
    key: "revenue",
    label: "Revenue",
    value: "$2.4M",
    change: 18.2,
    color: "hsl(var(--primary))",
    data: [
      { month: "Jan", v: 142 },
      { month: "Feb", v: 168 },
      { month: "Mar", v: 155 },
      { month: "Apr", v: 191 },
      { month: "May", v: 178 },
      { month: "Jun", v: 214 },
      { month: "Jul", v: 238 },
      { month: "Aug", v: 221 },
      { month: "Sep", v: 259 },
      { month: "Oct", v: 244 },
      { month: "Nov", v: 278 },
      { month: "Dec", v: 312 },
    ],
  },
  {
    key: "users",
    label: "Active Users",
    value: "48.2K",
    change: 9.4,
    color: "hsl(221, 83%, 53%)",
    data: [
      { month: "Jan", v: 28 },
      { month: "Feb", v: 31 },
      { month: "Mar", v: 29 },
      { month: "Apr", v: 35 },
      { month: "May", v: 38 },
      { month: "Jun", v: 36 },
      { month: "Jul", v: 41 },
      { month: "Aug", v: 39 },
      { month: "Sep", v: 44 },
      { month: "Oct", v: 43 },
      { month: "Nov", v: 46 },
      { month: "Dec", v: 48 },
    ],
  },
  {
    key: "conversions",
    label: "Conversions",
    value: "3.8%",
    change: -0.6,
    color: "hsl(142, 71%, 45%)",
    data: [
      { month: "Jan", v: 4.2 },
      { month: "Feb", v: 4.5 },
      { month: "Mar", v: 4.1 },
      { month: "Apr", v: 4.4 },
      { month: "May", v: 4.0 },
      { month: "Jun", v: 3.9 },
      { month: "Jul", v: 4.1 },
      { month: "Aug", v: 3.8 },
      { month: "Sep", v: 3.7 },
      { month: "Oct", v: 3.9 },
      { month: "Nov", v: 3.7 },
      { month: "Dec", v: 3.8 },
    ],
  },
  {
    key: "sessions",
    label: "Sessions",
    value: "182K",
    change: 24.1,
    color: "hsl(38, 92%, 50%)",
    data: [
      { month: "Jan", v: 98 },
      { month: "Feb", v: 112 },
      { month: "Mar", v: 108 },
      { month: "Apr", v: 124 },
      { month: "May", v: 131 },
      { month: "Jun", v: 128 },
      { month: "Jul", v: 144 },
      { month: "Aug", v: 152 },
      { month: "Sep", v: 158 },
      { month: "Oct", v: 162 },
      { month: "Nov", v: 174 },
      { month: "Dec", v: 182 },
    ],
  },
]

function CustomTooltip({ active, payload, label, color }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="border-border bg-card rounded-lg border px-3 py-2 text-xs shadow-lg">
      <p className="text-foreground mb-1 font-medium">{label}</p>
      <div className="flex items-center gap-2">
        <div
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="text-foreground font-semibold">
          {payload[0].value}
        </span>
      </div>
    </div>
  )
}

export default function ChartTabsOverview() {
  const [activeKey, setActiveKey] = React.useState("revenue")
  const metric = METRICS.find((m) => m.key === activeKey)!

  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="p-0">
        {/* Metric tabs */}
        <div className="border-border grid grid-cols-2 border-b sm:grid-cols-4">
          {METRICS.map((m) => {
            const up = m.change >= 0
            const active = m.key === activeKey
            return (
              <button
                key={m.key}
                onClick={() => setActiveKey(m.key)}
                className={`border-border hover:bg-muted/50 flex flex-col gap-0.5 border-b-2 px-4 py-4 text-left transition-colors last:border-r-0 sm:border-r ${
                  active
                    ? "border-b-primary bg-muted/30"
                    : "border-b-transparent"
                }`}
              >
                <span className="text-muted-foreground text-xs font-medium">
                  {m.label}
                </span>
                <span className="text-foreground text-xl font-bold">
                  {m.value}
                </span>
                <span
                  className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                    up
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {up ? (
                    <ArrowUp className="h-3 w-3" />
                  ) : (
                    <ArrowDown className="h-3 w-3" />
                  )}
                  {Math.abs(m.change).toFixed(1)}%
                </span>
              </button>
            )
          })}
        </div>

        {/* Chart */}
        <div className="p-6 pt-4">
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={metric.data}
                margin={{ top: 4, right: 4, left: -8, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id={`grad-tab-${metric.key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={metric.color}
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="100%"
                      stopColor={metric.color}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={36}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                />
                <Tooltip
                  content={
                    <CustomTooltip
                      active={undefined}
                      payload={undefined}
                      label={undefined}
                      color={metric.color}
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={metric.color}
                  strokeWidth={2.5}
                  fill={`url(#grad-tab-${metric.key})`}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
