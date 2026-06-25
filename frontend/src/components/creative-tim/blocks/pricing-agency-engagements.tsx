"use client"

import { ArrowUpRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const ENGAGEMENTS = [
  {
    name: "Brand Sprint",
    priceLabel: "from $45k",
    duration: "3–4 weeks",
    summary:
      "A focused engagement to sharpen positioning and ship an identity refresh or a single flagship page.",
    deliverables: [
      "Positioning & messaging thesis",
      "Visual identity direction",
      "One flagship page, designed & built",
      "Two-week support window",
    ],
    featured: false,
  },
  {
    name: "Flagship Site",
    priceLabel: "from $120k",
    duration: "8–12 weeks",
    summary:
      "Our signature engagement — a full digital flagship from strategy through engineering and launch.",
    deliverables: [
      "Discovery & strategy sprint",
      "Full identity & design system",
      "8–14 pages, custom-built",
      "Motion & interaction design",
      "CMS integration & team handoff",
      "Four-week post-launch support",
    ],
    featured: true,
  },
  {
    name: "Ongoing Partnership",
    priceLabel: "from $18k / mo",
    duration: "Rolling · 6-mo min.",
    summary:
      "A dedicated senior team on retainer for brands that treat design as a continuous advantage.",
    deliverables: [
      "Dedicated design + engineering pod",
      "Quarterly roadmap & priorities",
      "Unlimited briefs, one at a time",
      "Performance & growth reporting",
    ],
    featured: false,
  },
]

export default function PricingAgencyEngagements() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl">
          <span className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
            Engagements
          </span>
          <h2 className="text-foreground mt-5 text-4xl font-medium tracking-tight [text-wrap:balance] md:text-5xl">
            Ways to work together.
          </h2>
          <p className="text-muted-foreground mt-5 text-base leading-relaxed">
            Every project is scoped and quoted individually — the ranges below
            are where most engagements land. No retainers you can&apos;t leave,
            no surprises on the invoice.
          </p>
        </div>

        <div className="bg-border mt-16 grid grid-cols-1 gap-px lg:grid-cols-3">
          {ENGAGEMENTS.map((e) => (
            <Card
              key={e.name}
              className={`flex flex-col rounded-none border-0 p-8 md:p-10 ${
                e.featured ? "bg-foreground text-background" : "bg-background"
              }`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3
                  className={`text-lg font-medium tracking-tight ${
                    e.featured ? "" : "text-foreground"
                  }`}
                >
                  {e.name}
                </h3>
                <span
                  className={`shrink-0 text-xs tracking-[0.15em] uppercase ${
                    e.featured ? "text-background/50" : "text-muted-foreground"
                  }`}
                >
                  {e.duration}
                </span>
              </div>

              <p
                className={`mt-6 text-3xl font-medium tracking-tight ${
                  e.featured ? "" : "text-foreground"
                }`}
              >
                {e.priceLabel}
              </p>

              <p
                className={`mt-4 text-sm leading-relaxed ${
                  e.featured ? "text-background/70" : "text-muted-foreground"
                }`}
              >
                {e.summary}
              </p>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {e.deliverables.map((d) => (
                  <li
                    key={d}
                    className={`flex items-start gap-3 text-sm ${
                      e.featured
                        ? "text-background/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 stroke-[1.5]" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={e.featured ? "secondary" : "outline"}
                className="mt-10 w-full rounded-none"
              >
                Book an intro call
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
