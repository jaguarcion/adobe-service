"use client"

import { ArrowDownRight, ArrowUpRight } from "lucide-react"

import { Card } from "@/components/ui/card"

const KPIS = [
  {
    label: "Revenue",
    value: "$48,250",
    delta: "+12.4%",
    trend: "up",
    note: "vs. last month",
  },
  {
    label: "Active users",
    value: "8,912",
    delta: "+4.1%",
    trend: "up",
    note: "vs. last month",
  },
  {
    label: "Conversion",
    value: "3.6%",
    delta: "-0.8%",
    trend: "down",
    note: "vs. last month",
  },
  {
    label: "Avg. session",
    value: "4m 32s",
    delta: "+18s",
    trend: "up",
    note: "vs. last month",
  },
]

export default function KpiAgencyMinimal() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-foreground text-xl font-semibold tracking-tight">
          Performance
        </p>
        <p className="text-muted-foreground text-sm">
          Key metrics across the last 30 days.
        </p>
      </div>

      <Card className="bg-border grid grid-cols-1 gap-px overflow-hidden rounded-lg border-0 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((k) => {
          const up = k.trend === "up"
          return (
            <div key={k.label} className="bg-card p-6">
              <p className="text-muted-foreground text-xs tracking-[0.15em] uppercase">
                {k.label}
              </p>
              <p className="text-foreground mt-4 text-3xl font-medium tracking-tight">
                {k.value}
              </p>
              <div className="mt-3 flex items-center gap-1.5">
                {up ? (
                  <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
                )}
                <span
                  className={`text-xs font-medium ${
                    up ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {k.delta}
                </span>
                <span className="text-muted-foreground text-xs">{k.note}</span>
              </div>
            </div>
          )
        })}
      </Card>
    </div>
  )
}
