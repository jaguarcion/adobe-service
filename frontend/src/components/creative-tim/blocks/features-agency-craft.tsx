"use client"

import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const PRINCIPLES = [
  {
    title: "Research before pixels",
    description:
      "Every engagement opens with a discovery sprint — stakeholder interviews, an audit, and a positioning thesis we all sign off on.",
  },
  {
    title: "One senior team, end to end",
    description:
      "No account layers, no juniors learning on your budget. The people in the kickoff are the people who ship.",
  },
  {
    title: "Designed in the browser",
    description:
      "We prototype in real code early, so motion, performance, and responsiveness are decisions — not afterthoughts.",
  },
  {
    title: "Built to hand off",
    description:
      "Documented systems, a CMS your team controls, and a four-week support window after every launch.",
  },
]

export default function FeaturesAgencyCraft() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Card className="bg-foreground text-background flex h-full flex-col justify-between rounded-none border-0 p-10">
              <div>
                <span className="text-background/50 text-xs font-medium tracking-[0.2em] uppercase">
                  How we work
                </span>
                <h2 className="mt-6 text-3xl font-medium tracking-tight [text-wrap:balance] md:text-4xl">
                  The process is the product.
                </h2>
                <p className="text-background/70 mt-5 text-sm leading-relaxed">
                  We&apos;ve spent a decade refining a way of working that turns
                  a blank brief into a flagship. It&apos;s deliberate, it&apos;s
                  senior, and it&apos;s the reason clients come back.
                </p>
              </div>
              <Button variant="secondary" className="mt-10 w-fit rounded-none">
                See selected work
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {PRINCIPLES.map(({ title, description }, i) => (
                <div
                  key={title}
                  className="border-border border-b py-8 first:border-t sm:py-10 sm:[&:nth-child(-n+2)]:border-t sm:[&:nth-child(even)]:pl-8 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(odd)]:pr-8"
                >
                  <span className="text-muted-foreground/60 font-mono text-sm">
                    0{i + 1}
                  </span>
                  <h3 className="text-foreground mt-5 text-lg font-medium tracking-tight">
                    {title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
