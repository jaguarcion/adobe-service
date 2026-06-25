"use client"

import * as React from "react"
import { ArrowUpRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const PLANS = [
  {
    name: "Landing",
    project: "$28k",
    retainer: "$9k / mo",
    note: "One high-craft page",
    includes: [
      "Single flagship landing page",
      "Copy direction & art direction",
      "Responsive build & QA",
      "Analytics & launch support",
    ],
    featured: false,
  },
  {
    name: "Flagship",
    project: "$95k",
    retainer: "$22k / mo",
    note: "Full site, end to end",
    includes: [
      "Strategy & positioning sprint",
      "Identity & design system",
      "Up to 12 custom pages",
      "Motion & interaction design",
      "CMS build & team training",
      "Post-launch support window",
    ],
    featured: true,
  },
  {
    name: "Studio",
    project: "Custom",
    retainer: "$40k / mo",
    note: "Embedded senior team",
    includes: [
      "Dedicated design + eng pod",
      "Multi-brand / product scope",
      "Quarterly strategy reviews",
      "Priority turnaround",
      "Direct line to studio leads",
    ],
    featured: false,
  },
]

export default function PricingAgencyRetainer() {
  const [mode, setMode] = React.useState("project")

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
              Investment
            </span>
            <h2 className="text-foreground mt-5 text-4xl font-medium tracking-tight [text-wrap:balance] md:text-5xl">
              Priced for the outcome, not the hours.
            </h2>
          </div>
          <Tabs value={mode} onValueChange={setMode} className="w-64">
            <TabsList className="w-full rounded-none">
              <TabsTrigger className="w-full rounded-none" value="project">
                Fixed project
              </TabsTrigger>
              <TabsTrigger className="w-full rounded-none" value="retainer">
                Retainer
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="bg-border mt-16 grid grid-cols-1 gap-px lg:grid-cols-3">
          {PLANS.map((p) => (
            <Card
              key={p.name}
              className={`flex flex-col rounded-none border-0 p-8 md:p-10 ${
                p.featured ? "bg-foreground text-background" : "bg-background"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <h3
                  className={`text-lg font-medium tracking-tight ${
                    p.featured ? "" : "text-foreground"
                  }`}
                >
                  {p.name}
                </h3>
                {p.featured && (
                  <span className="bg-background/15 px-2 py-1 text-[10px] tracking-[0.15em] uppercase">
                    Most booked
                  </span>
                )}
              </div>

              <p
                className={`mt-6 text-4xl font-medium tracking-tight ${
                  p.featured ? "" : "text-foreground"
                }`}
              >
                {mode === "project" ? p.project : p.retainer}
              </p>
              <p
                className={`mt-2 text-sm ${
                  p.featured ? "text-background/60" : "text-muted-foreground"
                }`}
              >
                {p.note}
              </p>

              <div
                className={`mt-8 h-px w-full ${
                  p.featured ? "bg-background/15" : "bg-border"
                }`}
              />

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {p.includes.map((item) => (
                  <li
                    key={item}
                    className={`flex items-start gap-3 text-sm ${
                      p.featured
                        ? "text-background/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 stroke-[1.5]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={p.featured ? "secondary" : "outline"}
                className="mt-10 w-full rounded-none"
              >
                Request a proposal
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>

        <p className="text-muted-foreground mt-10 text-sm">
          All engagements begin with a paid discovery sprint. Final scope and
          pricing are confirmed in a written proposal before any work begins.
        </p>
      </div>
    </section>
  )
}
