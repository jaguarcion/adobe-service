"use client"

import * as React from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

const CATEGORIES = [
  { name: "Infrastructure", value: 43200, color: "hsl(var(--primary))" },
  { name: "Personnel", value: 98500, color: "hsl(221, 83%, 53%)" },
  { name: "Marketing", value: 31800, color: "hsl(142, 71%, 45%)" },
  { name: "Software", value: 18400, color: "hsl(38, 92%, 50%)" },
  { name: "Operations", value: 24100, color: "hsl(0, 72%, 51%)" },
]

const TOTAL = CATEGORIES.reduce((s, c) => s + c.value, 0)

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n)
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="border-border bg-card rounded-lg border px-3 py-2 text-xs shadow-lg">
      <div className="mb-1 flex items-center gap-2">
        <div
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: d.color }}
        />
        <span className="text-foreground font-semibold">{d.name}</span>
      </div>
      <p className="text-muted-foreground">
        {fmt(d.value)}{" "}
        <span className="text-foreground font-medium">
          ({((d.value / TOTAL) * 100).toFixed(1)}%)
        </span>
      </p>
    </div>
  )
}

export default function DonutChartBreakdown() {
  const [active, setActive] = React.useState<string | null>(null)

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="pb-2">
        <p className="text-base font-semibold">Budget Breakdown</p>
        <p className="text-muted-foreground text-xs">
          Annual operating expenses by category
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          {/* Donut */}
          <div className="relative h-52 w-full shrink-0 sm:h-52 sm:w-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORIES}
                  cx="50%"
                  cy="50%"
                  innerRadius="62%"
                  outerRadius="85%"
                  dataKey="value"
                  strokeWidth={0}
                  paddingAngle={3}
                  onMouseEnter={(_, idx) => setActive(CATEGORIES[idx].name)}
                  onMouseLeave={() => setActive(null)}
                >
                  {CATEGORIES.map((cat) => (
                    <Cell
                      key={cat.name}
                      fill={cat.color}
                      opacity={
                        active === null || active === cat.name ? 1 : 0.35
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={
                    <CustomTooltip active={undefined} payload={undefined} />
                  }
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold">{fmt(TOTAL)}</span>
              <span className="text-muted-foreground text-xs">Total</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-3">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className="cursor-default"
                onMouseEnter={() => setActive(cat.name)}
                onMouseLeave={() => setActive(null)}
              >
                <div className="mb-1 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span
                      className={`font-medium transition-colors ${
                        active === cat.name
                          ? "text-foreground"
                          : "text-foreground/80"
                      }`}
                    >
                      {cat.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">
                      {((cat.value / TOTAL) * 100).toFixed(1)}%
                    </span>
                    <span className="text-foreground font-semibold tabular-nums">
                      {fmt(cat.value)}
                    </span>
                  </div>
                </div>
                <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(cat.value / TOTAL) * 100}%`,
                      backgroundColor: cat.color,
                      opacity:
                        active === null || active === cat.name ? 1 : 0.35,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
