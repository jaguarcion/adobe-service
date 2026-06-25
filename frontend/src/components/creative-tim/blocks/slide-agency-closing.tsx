"use client"

import { ArrowUpRight } from "lucide-react"

/**
 * Agency-grade closing slide. Big editorial "Thank you.", a short
 * subhead, and three numbered "next steps" as hairline-bordered rows
 * with arrow chevrons — feels less like a thank-you slide, more like a
 * call-to-action handoff. Theme-token only.
 */
const NEXT = [
  { label: "Schedule a follow-up", meta: "30-min intro · this week" },
  { label: "Read the full report", meta: "PDF · 38 pages" },
  { label: "Reach the team directly", meta: "studio@agency.com" },
]

export default function SlideAgencyClosing() {
  return (
    <div className="bg-background flex h-[900px] w-full flex-col overflow-hidden">
      {/* Top meta */}
      <div className="border-border flex items-center justify-between border-b px-20 py-8">
        <span className="text-foreground text-sm font-semibold tracking-tight">
          STUDIO
        </span>
        <span className="text-muted-foreground font-mono text-xs">12 / 12</span>
      </div>

      {/* Heading */}
      <div className="px-20 pt-20">
        <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">
          End of deck
        </span>
        <h1 className="text-foreground mt-6 text-7xl leading-[1.02] font-medium tracking-tight">
          Thank you.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
          We&apos;re happy to take questions now, or continue the conversation
          on any of the channels below.
        </p>
      </div>

      {/* Next steps */}
      <div className="flex-1 px-20 pt-12">
        <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase">
          Next steps
        </span>
        <div className="border-border mt-6 border-t">
          {NEXT.map((n, i) => (
            <button
              key={n.label}
              type="button"
              className="border-border group flex w-full items-center justify-between border-b py-6 text-left"
            >
              <div className="flex items-center gap-8">
                <span className="text-muted-foreground/60 font-mono text-sm">
                  0{i + 1}
                </span>
                <span className="text-foreground text-2xl font-medium tracking-tight">
                  {n.label}
                </span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-muted-foreground text-sm">{n.meta}</span>
                <ArrowUpRight className="text-foreground h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-border flex items-center justify-between border-t px-20 py-6">
        <span className="text-muted-foreground text-sm">
          studio.com — hello@studio.com
        </span>
        <span className="text-muted-foreground text-sm">@studio</span>
      </div>
    </div>
  )
}
