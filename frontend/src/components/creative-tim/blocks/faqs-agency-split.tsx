"use client"

import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"

const FAQS = [
  {
    q: "Do you take on projects outside your core disciplines?",
    a: "Occasionally. If a project sits adjacent to brand, web, and product, we'll either take it or point you to someone we trust. We won't stretch the team thin to win work.",
  },
  {
    q: "Can you work with our existing brand guidelines?",
    a: "Yes. Plenty of engagements are execution-only — we treat an existing system as a constraint to honor, not a starting point to relitigate.",
  },
  {
    q: "How do you handle revisions?",
    a: "Each phase has a defined review built in. Feedback is consolidated, we revise once per round, and we keep a written decision log so nothing gets relitigated twice.",
  },
  {
    q: "What do you need from us to start?",
    a: "A point of contact who can make decisions, access to the people who know the business, and honesty about timeline and budget. That's most of it.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "Yes — a four-week support window is included with every build, and a rolling partnership is available for teams that want a continuous design and engineering pod.",
  },
]

export default function FaqsAgencySplit() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <span className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
                Frequently asked
              </span>
              <h2 className="text-foreground mt-5 text-3xl font-medium tracking-tight [text-wrap:balance] md:text-4xl">
                Still deciding? Start here.
              </h2>
              <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
                Can&apos;t find what you&apos;re looking for? We&apos;d rather
                answer it directly.
              </p>
              <Button variant="outline" className="mt-8 rounded-none">
                Ask us anything
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="border-border border-t">
              {FAQS.map((item) => (
                <div key={item.q} className="border-border border-b py-7">
                  <h3 className="text-foreground text-lg font-medium tracking-tight">
                    {item.q}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {item.a}
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
