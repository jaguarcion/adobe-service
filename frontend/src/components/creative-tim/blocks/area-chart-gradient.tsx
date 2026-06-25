"use client"

import * as React from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const RANGES = ["7D", "1M", "3M", "1Y"] as const
type Range = (typeof RANGES)[number]

const DATA: Record<Range, { date: string; revenue: number; prev: number }[]> = {
  "7D": [
    { date: "Mon", revenue: 4200, prev: 3800 },
    { date: "Tue", revenue: 5800, prev: 4200 },
    { date: "Wed", revenue: 4900, prev: 4700 },
    { date: "Thu", revenue: 6200, prev: 5100 },
    { date: "Fri", revenue: 7400, prev: 5900 },
    { date: "Sat", revenue: 5600, prev: 4800 },
    { date: "Sun", revenue: 6800, prev: 5400 },
  ],
  "1M": [
    { date: "Jan 1", revenue: 38000, prev: 32000 },
    { date: "Jan 8", revenue: 42000, prev: 35000 },
    { date: "Jan 15", revenue: 51000, prev: 44000 },
    { date: "Jan 22", revenue: 47000, prev: 42000 },
    { date: "Jan 29", revenue: 63000, prev: 51000 },
  ],
  "3M": [
    { date: "Oct", revenue: 142000, prev: 118000 },
    { date: "Nov", revenue: 168000, prev: 145000 },
    { date: "Dec", revenue: 195000, prev: 162000 },
  ],
  "1Y": [
    { date: "Jan", revenue: 98000, prev: 82000 },
    { date: "Feb", revenue: 112000, prev: 91000 },
    { date: "Mar", revenue: 128000, prev: 105000 },
    { date: "Apr", revenue: 142000, prev: 118000 },
    { date: "May", revenue: 135000, prev: 124000 },
    { date: "Jun", revenue: 158000, prev: 131000 },
    { date: "Jul", revenue: 174000, prev: 142000 },
    { date: "Aug", revenue: 168000, prev: 155000 },
    { date: "Sep", revenue: 192000, prev: 162000 },
    { date: "Oct", revenue: 218000, prev: 178000 },
    { date: "Nov", revenue: 241000, prev: 195000 },
    { date: "Dec", revenue: 267000, prev: 212000 },
  ],
}

const TOTALS: Record<Range, { value: number; change: number }> = {
  "7D": { value: 40900, change: 12.4 },
  "1M": { value: 241000, change: 8.7 },
  "3M": { value: 505000, change: 15.2 },
  "1Y": { value: 1987000, change: 22.8 },
}

function fmt(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`
  return `$${n}`
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="border-border bg-card rounded-lg border px-3 py-2 text-xs shadow-lg">
      <p className="text-foreground mb-1.5 font-medium">{label}</p>
      <Separator className="mb-1.5" />
      {payload.map((p: any, i: number) => (
        <div
          key={i}
          className="mb-1 flex items-center justify-between gap-4 last:mb-0"
        >
          <div className="flex items-center gap-1.5">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: p.stroke }}
            />
            <span className="text-muted-foreground">
              {p.name === "revenue" ? "Current" : "Previous"}
            </span>
          </div>
          <span className="text-foreground font-semibold">{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

export default function AreaChartGradient() {
  const [range, setRange] = React.useState<Range>("1Y")
  const { value, change } = TOTALS[range]
  const isUp = change >= 0

  return (
    <Card className="w-full max-w-2xl overflow-hidden">
      <CardContent className="p-6">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-muted-foreground mb-1 text-sm">Total Revenue</p>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">{fmt(value)}</span>
              <span
                className={`inline-flex items-center gap-0.5 text-sm font-medium ${
                  isUp
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {isUp ? (
                  <ArrowUp className="h-3.5 w-3.5" />
                ) : (
                  <ArrowDown className="h-3.5 w-3.5" />
                )}
                {Math.abs(change).toFixed(1)}%
              </span>
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              vs. previous period
            </p>
          </div>
          <div className="border-border flex items-center overflow-hidden rounded-lg border">
            {RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  range === r
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={DATA[range]}
              margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="grad-revenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(var(--primary))"
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
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={45}
                tickFormatter={(v) => fmt(v)}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              />
              <Tooltip
                content={
                  <CustomTooltip
                    active={undefined}
                    payload={undefined}
                    label={undefined}
                  />
                }
              />
              {/* Area renders first — fill stays behind the dashed line */}
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={2.5}
                fill="url(#grad-revenue)"
                dot={false}
              />
              {/* Line renders last — always on top of the area fill */}
              <Line
                type="monotone"
                dataKey="prev"
                stroke="hsl(38, 92%, 50%)"
                strokeWidth={2}
                strokeDasharray="6 4"
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="text-muted-foreground mt-4 flex items-center gap-5 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="bg-primary/70 h-2.5 w-5 rounded-sm" />
            <span>Current period</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="20" height="2" viewBox="0 0 20 2" className="shrink-0">
              <line
                x1="0"
                y1="1"
                x2="20"
                y2="1"
                stroke="hsl(38, 92%, 50%)"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
            </svg>
            <span>Previous period</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
