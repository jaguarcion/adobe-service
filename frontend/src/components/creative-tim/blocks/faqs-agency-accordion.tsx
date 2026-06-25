"use client"

import * as React from "react"
import { Plus } from "lucide-react"

const FAQS = [
  {
    q: "How do engagements typically start?",
    a: "Every engagement opens with a paid discovery sprint — usually one to two weeks. We interview stakeholders, audit what exists, and return a positioning thesis and a scoped proposal before any design work begins.",
  },
  {
    q: "What does a flagship project cost?",
    a: "Most full-site engagements land between $120k and $250k depending on scope, page count, and motion. Brand sprints start around $45k. Every project is quoted individually in writing — no hourly surprises.",
  },
  {
    q: "Who actually works on my project?",
    a: "The senior team you meet in the kickoff is the team that ships. No account layers, no juniors learning on your budget — typically a strategist, a designer, and an engineer, with a studio lead accountable throughout.",
  },
  {
    q: "How long does a flagship site take?",
    a: "Eight to twelve weeks from kickoff to launch is typical. Brand sprints run three to four. We hold the timeline by keeping scope explicit and decisions fast.",
  },
  {
    q: "Do you work alongside our internal team?",
    a: "Often. We can embed with in-house designers and engineers, hand off a documented system, and run a four-week support window so your team owns the work confidently after launch.",
  },
  {
    q: "What happens after launch?",
    a: "Every project includes a post-launch support window. Beyond that, many clients move onto a rolling partnership for ongoing design and engineering — but there's no obligation to.",
  },
]

export default function FaqsAgencyAccordion() {
  const [open, setOpen] = React.useState<number | null>(0)

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto max-w-3xl px-6">
        <div className="mb-14">
          <span className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
            Frequently asked
          </span>
          <h2 className="text-foreground mt-5 text-4xl font-medium tracking-tight [text-wrap:balance] md:text-5xl">
            The questions we hear most.
          </h2>
        </div>

        <div className="border-border border-t">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="border-border border-b">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-start gap-6 py-6 text-left"
                >
                  <span className="text-muted-foreground/60 mt-0.5 font-mono text-sm">
                    0{i + 1}
                  </span>
                  <span className="text-foreground flex-1 text-lg font-medium tracking-tight">
                    {item.q}
                  </span>
                  <Plus
                    className={`text-muted-foreground mt-1 h-4 w-4 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-muted-foreground pb-6 pl-12 text-sm leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
