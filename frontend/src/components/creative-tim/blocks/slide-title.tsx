"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function SlideTitle() {
  return (
    <div className="bg-card relative flex h-[900px] w-full flex-col overflow-hidden">
      {/* Background gradient */}
      <div className="from-primary/10 to-primary/5 pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent" />
      <div className="bg-primary/10 pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl" />
      <div className="bg-primary/5 pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full blur-3xl" />

      {/* Header bar */}
      <div className="relative z-10 flex items-center justify-between px-16 pt-12">
        <span className="text-foreground text-lg font-bold tracking-tight">
          Company
        </span>
        <Badge variant="secondary" className="px-3 py-1 text-xs">
          2025 Annual Review
        </Badge>
      </div>

      {/* Main content — centered */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-16 text-center">
        <p className="text-primary mb-6 text-sm font-semibold tracking-widest uppercase">
          Presented by Product Team
        </p>
        <h1 className="text-foreground mb-6 max-w-3xl text-6xl leading-tight font-bold tracking-tight [text-wrap:balance]">
          Building the Future of Work
        </h1>
        <p className="text-muted-foreground mb-12 max-w-xl text-xl [text-wrap:balance]">
          A look at our progress, key learnings, and the roadmap ahead for the
          next twelve months.
        </p>
        <div className="flex items-center gap-4">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">
            View Agenda
          </Button>
        </div>
      </div>

      {/* Footer bar */}
      <div className="border-border relative z-10 flex items-center justify-between border-t px-16 py-8">
        <p className="text-muted-foreground text-sm">Jane Doe · CEO</p>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className={`h-1.5 rounded-full transition-all ${n === 1 ? "bg-primary w-6" : "bg-muted w-1.5"}`}
            />
          ))}
        </div>
        <p className="text-muted-foreground text-sm">April 2025</p>
      </div>
    </div>
  )
}
