"use client"

import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"

const CAPABILITIES = [
  {
    index: "01",
    title: "Brand Strategy & Positioning",
    description:
      "We interrogate the market, the audience, and the ambition — then define the territory only you can own.",
  },
  {
    index: "02",
    title: "Identity & Art Direction",
    description:
      "Typography, motion, and visual systems built to outlast trend cycles and scale across every surface.",
  },
  {
    index: "03",
    title: "Experience & Interface Design",
    description:
      "Flagship websites and product interfaces designed pixel-by-pixel, prototyped, and pressure-tested.",
  },
  {
    index: "04",
    title: "Engineering & Build",
    description:
      "Hand-built front-ends with performance budgets, accessibility baked in, and a CMS your team will actually use.",
  },
  {
    index: "05",
    title: "Motion & Real-Time 3D",
    description:
      "A considered motion language and real-time 3D that earns attention without ever costing comprehension.",
  },
  {
    index: "06",
    title: "Launch & Growth",
    description:
      "Measurement, iteration, and creative support past launch — because the work is never finished at go-live.",
  },
]

export default function FeaturesAgencyCapabilities() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="border-border flex flex-col gap-10 border-b pb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
              Capabilities
            </span>
            <h2 className="text-foreground mt-5 text-4xl font-medium tracking-tight [text-wrap:balance] md:text-5xl">
              A studio built around the work, not the org chart.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-base leading-relaxed">
            Six disciplines, one senior team. We embed with founders and brand
            leaders to ship category-defining digital flagships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map(({ index, title, description }) => (
            <div
              key={index}
              className="group border-border border-b px-0 py-10 md:border-r md:px-8 md:[&:nth-child(3n)]:border-r-0"
            >
              <span className="text-muted-foreground/60 font-mono text-sm">
                {index}
              </span>
              <h3 className="text-foreground mt-6 text-xl font-medium tracking-tight">
                {title}
              </h3>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground text-sm">
            Currently booking flagship engagements for Q3.
          </p>
          <Button variant="outline" className="rounded-none">
            Start a project
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
