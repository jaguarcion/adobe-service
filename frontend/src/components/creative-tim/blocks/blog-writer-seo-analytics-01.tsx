"use client"

import * as React from "react"
import { BarChart2, RefreshCw, TrendingUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const DR_HISTORY = [18, 22, 24, 25, 28, 31, 35, 38, 40, 42, 44, 46]
const MONTHS = [
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
]

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const height = 40
  const width = 200
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((v - min) / range) * height
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-10 w-full text-orange-500"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function BlogWriterSeoAnalytics01() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold">SEO Analytics</h1>
        <Button variant="outline" size="sm">
          <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
          Refresh
        </Button>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="px-4 py-3">
            <p className="text-muted-foreground text-xs">Domain Rating</p>
            <p className="text-2xl font-bold">
              46
              <span className="text-muted-foreground text-sm font-normal">
                /100
              </span>
            </p>
            <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              +4 this month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="px-4 py-3">
            <p className="text-muted-foreground text-xs">Articles Published</p>
            <p className="text-2xl font-bold">87</p>
            <p className="text-muted-foreground mt-1 text-xs">last 3 months</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="px-4 py-3">
            <p className="text-muted-foreground text-xs">Backlinks</p>
            <p className="text-2xl font-bold">234</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              +18 this month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="px-4 py-3">
            <p className="text-muted-foreground text-xs">SEO Provider</p>
            <p className="mt-1 text-sm font-medium">DataForSEO</p>
            <Badge
              variant="outline"
              className="mt-1 border-emerald-200 bg-emerald-50 text-xs text-emerald-700"
            >
              Active
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Domain rating trend */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Domain Rating Trend</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Sparkline data={DR_HISTORY} />
          <div className="text-muted-foreground flex justify-between text-xs">
            {MONTHS.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <p className="text-muted-foreground text-xs">
            Domain rating has grown from {DR_HISTORY[0]} to{" "}
            {DR_HISTORY[DR_HISTORY.length - 1]} over 12 months.
          </p>
        </CardContent>
      </Card>

      <p className="text-muted-foreground text-xs">
        Last synced: May 8, 2025 at 09:14 AM · Metrics from DataForSEO
      </p>
    </div>
  )
}
