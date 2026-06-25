"use client"

import { ArrowUpRight } from "lucide-react"

import { Card } from "@/components/ui/card"

const SECONDARY = [
  { label: "New customers", value: "1,284", delta: "+9.2%" },
  { label: "Churn rate", value: "1.8%", delta: "-0.3%" },
  { label: "Avg. deal size", value: "$2,410", delta: "+5.6%" },
]

export default function KpiAgencySpotlight() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-foreground text-xl font-semibold tracking-tight">
          Revenue overview
        </p>
        <p className="text-muted-foreground text-sm">
          Headline metric and supporting indicators.
        </p>
      </div>

      <div className="bg-border grid grid-cols-1 gap-px overflow-hidden rounded-lg lg:grid-cols-3">
        {/* Spotlight metric */}
        <Card className="bg-foreground text-background flex flex-col justify-between rounded-none border-0 p-8 lg:row-span-3">
          <div>
            <p className="text-background/60 text-xs tracking-[0.2em] uppercase">
              Total revenue
            </p>
            <p className="mt-6 text-5xl font-medium tracking-tight">$482,900</p>
            <div className="mt-4 flex items-center gap-1.5">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm font-medium">+18.3%</span>
              <span className="text-background/60 text-sm">
                vs. last quarter
              </span>
            </div>
          </div>
          <p className="text-background/60 mt-10 text-sm leading-relaxed">
            Tracking 14% ahead of the annual target with one month left in the
            quarter.
          </p>
        </Card>

        {/* Supporting metrics */}
        {SECONDARY.map((s) => (
          <div key={s.label} className="bg-card p-8 lg:col-span-2">
            <div className="flex items-baseline justify-between">
              <p className="text-muted-foreground text-xs tracking-[0.15em] uppercase">
                {s.label}
              </p>
              <span className="text-xs font-medium text-emerald-500">
                {s.delta}
              </span>
            </div>
            <p className="text-foreground mt-3 text-3xl font-medium tracking-tight">
              {s.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
