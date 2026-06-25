"use client"

import { CheckCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"

const BULLETS = [
  "Shipped 3 major product milestones ahead of schedule",
  "Grew monthly active users by 47% year-over-year",
  "Reduced infrastructure costs by 31% through optimization",
  "Launched in 12 new markets across Europe and Asia-Pacific",
]

export default function SlideContent() {
  return (
    <div className="bg-background flex h-[900px] w-full flex-col overflow-hidden">
      {/* Top bar */}
      <div className="border-border flex items-center justify-between border-b px-16 py-6">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-xs">
            02 / 08
          </Badge>
          <span className="text-muted-foreground text-sm font-medium">
            Key Highlights
          </span>
        </div>
        <span className="text-foreground text-sm font-bold">Company</span>
      </div>

      {/* Content */}
      <div className="flex flex-1 items-center gap-16 px-16 py-12">
        {/* Left: text */}
        <div className="flex w-1/2 flex-col">
          <p className="text-primary mb-3 text-sm font-semibold tracking-widest uppercase">
            Year in Review
          </p>
          <h2 className="text-foreground mb-8 text-5xl leading-tight font-bold tracking-tight [text-wrap:balance]">
            What We Accomplished This Year
          </h2>
          <ul className="space-y-4">
            {BULLETS.map((text) => (
              <li key={text} className="flex items-start gap-3">
                <CheckCircle className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                <span className="text-muted-foreground text-base leading-relaxed">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: image */}
        <div className="flex w-1/2 items-center justify-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&w=900&q=80"
              alt="Team working"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}
