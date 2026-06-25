"use client"

import { ArrowUpRight } from "lucide-react"

/**
 * 2026-style stats / mission hero slide. Bold sans display headline,
 * three oversized stat numbers with primary-tinted arrow badges, and a
 * dimmed photo collage on the right. All colors come from theme tokens
 * so the slide adapts to whichever theme the agent applied.
 *
 * Format: PowerPoint-style fixed h-[900px], 16:9 friendly. Lives next
 * to the other slide-* blocks; pair with slide-title and slide-closing
 * for a complete deck.
 */

const STATS = [
  { value: "36k", label: "Investments" },
  { value: "24k", label: "Seed Fund" },
  { value: "19k", label: "Founders" },
]

// Six placeholder portraits — replace with brand-relevant Unsplash photos.
const PHOTOS = [
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&w=600&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&w=600&q=80",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&w=600&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&w=600&q=80",
  "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?auto=format&w=600&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&w=600&q=80",
]

export default function SlideStatsHero() {
  return (
    <div className="bg-foreground text-background relative flex h-[900px] w-full flex-col overflow-hidden md:flex-row">
      {/* Subtle vignette so the photos blend into the canvas edge. */}
      <div className="from-foreground via-foreground/95 to-foreground/30 pointer-events-none absolute inset-0 bg-gradient-to-r" />

      {/* ── Left column: copy + stats. Full width on mobile, 60% on tablet+. */}
      <div className="relative z-10 flex w-full flex-col justify-between px-6 py-10 sm:px-10 sm:py-14 md:w-3/5 md:px-16 md:py-20">
        <div>
          <div className="mb-6 flex items-center gap-3 sm:mb-8">
            <span className="bg-background/60 h-px w-10" />
            <span className="text-background/70 text-xs tracking-[0.3em] uppercase">
              Company Mission
            </span>
          </div>
          {/* Fluid display type — clamps so the headline never overflows on
              mobile and never blows up on huge displays. */}
          <h1 className="max-w-2xl text-[clamp(2rem,7vw,3.75rem)] leading-[1.05] font-bold tracking-tight [text-wrap:balance]">
            We identify and invest in extraordinary founders doing amazing
            things with AI
          </h1>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 pr-0 sm:gap-8 md:pr-8">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-2 sm:gap-3">
              <div className="relative">
                <span className="text-[clamp(2.5rem,9vw,4.5rem)] leading-none font-bold tracking-tighter">
                  {value}
                </span>
                <span className="bg-primary text-primary-foreground absolute -top-2 right-1 flex h-7 w-7 items-center justify-center rounded-full sm:right-2 sm:h-9 sm:w-9">
                  <ArrowUpRight
                    className="h-3.5 w-3.5 sm:h-5 sm:w-5"
                    strokeWidth={2.5}
                  />
                </span>
              </div>
              <span className="text-background/70 text-xs sm:text-sm">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right column: photo collage. Hidden on mobile — landscape slide
          format doesn't have room and the copy/stats already make the point. */}
      <div className="relative hidden w-full md:block md:w-2/5">
        <div className="grid h-full grid-cols-2 grid-rows-3 gap-1 p-1">
          {PHOTOS.map((src, i) => (
            <div key={i} className="relative overflow-hidden">
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover opacity-80 grayscale-[0.15]"
              />
              {/* Inner darkening overlay so collage fades into the slide. */}
              <div className="from-foreground/40 to-foreground/0 pointer-events-none absolute inset-0 bg-gradient-to-l" />
            </div>
          ))}
        </div>
        {/* Hard left fade so the collage merges into the dark canvas. */}
        <div className="from-foreground pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r to-transparent" />
      </div>
    </div>
  )
}
