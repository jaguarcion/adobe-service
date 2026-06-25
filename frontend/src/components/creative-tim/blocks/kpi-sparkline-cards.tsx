"use client"

import { ArrowDown, ArrowUp } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer } from "recharts"

import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const CARDS = [
  {
    label: "Monthly Revenue",
    value: "$84,200",
    change: 12.5,
    subtext: "$9,420 today",
    positiveIsGood: true,
    color: "hsl(var(--primary))",
    sparkData: [28, 42, 35, 58, 48, 72, 64, 81, 70, 95, 84, 100],
  },
  {
    label: "Active Users",
    value: "12,430",
    change: 8.2,
    subtext: "1,204 new this week",
    positiveIsGood: true,
    color: "hsl(221, 83%, 53%)",
    sparkData: [60, 72, 65, 80, 75, 88, 82, 91, 85, 94, 90, 100],
  },
  {
    label: "Avg. Session",
    value: "4m 12s",
    change: 3.1,
    subtext: "vs 4m 04s last month",
    positiveIsGood: true,
    color: "hsl(142, 71%, 45%)",
    sparkData: [70, 68, 75, 72, 78, 80, 77, 83, 85, 88, 86, 92],
  },
  {
    label: "Churn Rate",
    value: "2.4%",
    change: -0.8,
    subtext: "−0.8pp vs last month",
    positiveIsGood: false,
    color: "hsl(142, 71%, 45%)",
    sparkData: [45, 48, 44, 42, 46, 41, 38, 40, 35, 32, 34, 28],
  },
]

export default function KpiSparklineCards() {
  return (
    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {CARDS.map((card) => {
        const isUp = card.change >= 0
        const isGood = card.positiveIsGood ? isUp : !isUp
        const id = card.label.replace(/[^a-z]/gi, "")
        return (
          <Card key={card.label} className="flex flex-col overflow-hidden">
            <div className="flex-1 px-5 pt-5 pb-4">
              <div className="mb-3 flex items-start justify-between gap-2">
                <p className="text-muted-foreground text-xs leading-tight font-medium">
                  {card.label}
                </p>
                <span
                  className={`inline-flex shrink-0 items-center gap-0.5 text-xs font-semibold ${
                    isGood
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {isUp ? (
                    <ArrowUp className="h-3 w-3" />
                  ) : (
                    <ArrowDown className="h-3 w-3" />
                  )}
                  {Math.abs(card.change).toFixed(1)}%
                </span>
              </div>
              <p className="text-foreground mb-1 text-3xl font-bold tracking-tight">
                {card.value}
              </p>
              <p className="text-muted-foreground text-xs">{card.subtext}</p>
            </div>
            <Separator />
            <div className="h-20 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={card.sparkData.map((v, i) => ({ i, v }))}
                  margin={{ top: 6, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id={`spark-${id}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={card.color}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="100%"
                        stopColor={card.color}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke={card.color}
                    strokeWidth={2}
                    fill={`url(#spark-${id})`}
                    dot={false}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
