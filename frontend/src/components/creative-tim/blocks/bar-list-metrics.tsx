"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const TABS = ["Pages", "Sources", "Devices"] as const
type Tab = (typeof TABS)[number]

const DATA: Record<Tab, { label: string; value: number; change: number }[]> = {
  Pages: [
    { label: "/dashboard", value: 12840, change: 8.4 },
    { label: "/pricing", value: 9210, change: 12.1 },
    { label: "/blog/intro", value: 7650, change: -2.3 },
    { label: "/docs/start", value: 6420, change: 5.7 },
    { label: "/login", value: 5180, change: 1.2 },
  ],
  Sources: [
    { label: "Organic Search", value: 21400, change: 15.2 },
    { label: "Direct", value: 14200, change: 3.8 },
    { label: "Social Media", value: 9800, change: 22.4 },
    { label: "Email Campaign", value: 6400, change: -4.1 },
    { label: "Referral", value: 4900, change: 8.9 },
  ],
  Devices: [
    { label: "Desktop", value: 28400, change: 2.1 },
    { label: "Mobile", value: 22100, change: 18.4 },
    { label: "Tablet", value: 6200, change: -1.5 },
    { label: "Smart TV", value: 980, change: 45.2 },
    { label: "Other", value: 320, change: -8.7 },
  ],
}

export default function BarListMetrics() {
  const [tab, setTab] = React.useState<Tab>("Pages")
  const items = DATA[tab]
  const max = Math.max(...items.map((i) => i.value))

  return (
    <Card className="w-full max-w-xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-base font-semibold">Top Traffic</p>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground h-7 gap-1 text-xs"
          >
            View all <ArrowUpRight className="h-3 w-3" />
          </Button>
        </div>
        <p className="text-muted-foreground text-xs">
          Last 30 days · 56,700 total visits
        </p>
        <div className="mt-2 flex gap-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {items.map((item, i) => {
            const pct = (item.value / max) * 100
            const isUp = item.change >= 0
            return (
              <div key={item.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="text-muted-foreground w-4 shrink-0 text-xs">
                      {i + 1}
                    </span>
                    <span className="text-foreground truncate font-medium">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-muted-foreground text-xs tabular-nums">
                      {item.value.toLocaleString()}
                    </span>
                    <Badge
                      variant="secondary"
                      className={`h-5 px-1.5 text-[10px] ${
                        isUp
                          ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                      }`}
                    >
                      {isUp ? "+" : ""}
                      {item.change.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
                <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${pct}%`,
                      opacity: 0.5 + 0.5 * (1 - i / items.length),
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
