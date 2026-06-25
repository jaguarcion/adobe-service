"use client"

import { ArrowDown, ArrowUp } from "lucide-react"
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const DATA = [
  { month: "Jan", actual: 68, target: 75 },
  { month: "Feb", actual: 82, target: 75 },
  { month: "Mar", actual: 71, target: 80 },
  { month: "Apr", actual: 91, target: 80 },
  { month: "May", actual: 86, target: 85 },
  { month: "Jun", actual: 98, target: 90 },
  { month: "Jul", actual: 103, target: 95 },
  { month: "Aug", actual: 88, target: 100 },
  { month: "Sep", actual: 117, target: 100 },
  { month: "Oct", actual: 112, target: 105 },
  { month: "Nov", actual: 124, target: 110 },
  { month: "Dec", actual: 138, target: 115 },
]

const TOTAL_ACTUAL = DATA.reduce((s, d) => s + d.actual, 0)
const TOTAL_TARGET = DATA.reduce((s, d) => s + d.target, 0)
const ACHIEVEMENT = ((TOTAL_ACTUAL / TOTAL_TARGET) * 100).toFixed(1)

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  const actual = payload.find((p: any) => p.dataKey === "actual")
  const target = payload.find((p: any) => p.dataKey === "target")
  return (
    <div className="border-border bg-card min-w-32 rounded-lg border px-3 py-2 text-xs shadow-lg">
      <p className="text-foreground mb-1.5 font-medium">{label}</p>
      <Separator className="mb-1.5" />
      {actual && (
        <div className="mb-1 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <div className="bg-primary h-2 w-2 rounded-sm" />
            <span className="text-muted-foreground">Actual</span>
          </div>
          <span className="text-foreground font-semibold">{actual.value}K</span>
        </div>
      )}
      {target && (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <svg width="12" height="2" viewBox="0 0 12 2">
              <line
                x1="0"
                y1="1"
                x2="12"
                y2="1"
                stroke="hsl(38,92%,50%)"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
            </svg>
            <span className="text-muted-foreground">Target</span>
          </div>
          <span className="text-foreground font-semibold">{target.value}K</span>
        </div>
      )}
    </div>
  )
}

export default function ComboChartTarget() {
  const isAhead = parseFloat(ACHIEVEMENT) >= 100
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="mb-1 text-base font-semibold">Sales vs Target</p>
            <p className="text-muted-foreground text-xs">
              Monthly actual vs target — FY 2024
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="gap-1.5 text-xs">
              <div className="bg-primary h-2 w-2 rounded-sm" />
              <span className="text-muted-foreground">Actual:</span>
              <span className="font-semibold">{TOTAL_ACTUAL}K</span>
            </Badge>
            <Badge
              variant="outline"
              className={`gap-1 text-xs ${
                isAhead
                  ? "border-green-300 text-green-700 dark:text-green-400"
                  : "border-amber-300 text-amber-700 dark:text-amber-400"
              }`}
            >
              {isAhead ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )}
              {ACHIEVEMENT}% of target
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={DATA}
              margin={{ top: 4, right: 4, left: -8, bottom: 0 }}
            >
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
                  />
                }
              />
              <Bar
                dataKey="actual"
                fill="hsl(var(--primary))"
                opacity={0.85}
                radius={[3, 3, 0, 0]}
                maxBarSize={40}
              />
              {/* Target line renders on top of bars */}
              <Line
                type="monotone"
                dataKey="target"
                stroke="hsl(38, 92%, 50%)"
                strokeWidth={2.5}
                strokeDasharray="6 4"
                dot={false}
                strokeLinecap="round"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="text-muted-foreground mt-3 flex items-center gap-5 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="bg-primary/70 h-2.5 w-4 rounded-sm" />
            <span>Actual revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="20" height="2" viewBox="0 0 20 2" className="shrink-0">
              <line
                x1="0"
                y1="1"
                x2="20"
                y2="1"
                stroke="hsl(38,92%,50%)"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
            </svg>
            <span>Target</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
