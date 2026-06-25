"use client"

/**
 * Agency-grade stats slide. Pure typography — no photos, no gradients.
 * Big editorial heading on top, a four-tile hairline-bordered grid of
 * KPIs below with one tile inverted (`bg-foreground / text-background`)
 * to anchor the eye. Theme-token only.
 */
const STATS = [
  {
    label: "Engagements shipped",
    value: "27",
    note: "Across brand, web, and product",
    featured: false,
  },
  {
    label: "Total project value",
    value: "$8.4M",
    note: "Up 42% year-over-year",
    featured: true,
  },
  {
    label: "Client renewal rate",
    value: "92%",
    note: "Of partnerships continued in 2026",
    featured: false,
  },
  {
    label: "Kickoff to launch",
    value: "9.6 wks",
    note: "Down from 14.2 weeks in 2025",
    featured: false,
  },
]

export default function SlideAgencyStats() {
  return (
    <div className="bg-background flex h-[900px] w-full flex-col overflow-hidden">
      {/* Top meta */}
      <div className="border-border flex items-center justify-between border-b px-20 py-8">
        <span className="text-foreground text-sm font-semibold tracking-tight">
          STUDIO
        </span>
        <span className="text-muted-foreground font-mono text-xs">04 / 12</span>
      </div>

      {/* Heading */}
      <div className="px-20 pt-16">
        <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">
          By the numbers
        </span>
        <h2 className="text-foreground mt-6 max-w-3xl text-6xl leading-[1.05] font-medium tracking-tight [text-wrap:balance]">
          A year measured in shipped work, not pitch decks.
        </h2>
      </div>

      {/* Stats grid */}
      <div className="mt-auto px-20 pb-20">
        <div className="bg-border grid grid-cols-2 gap-px overflow-hidden lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className={`flex flex-col justify-between p-8 ${
                s.featured ? "bg-foreground text-background" : "bg-background"
              }`}
            >
              <span
                className={`text-xs tracking-[0.2em] uppercase ${
                  s.featured ? "text-background/60" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
              <div className="mt-12">
                <p
                  className={`text-6xl leading-none font-medium tracking-tight ${
                    s.featured ? "" : "text-foreground"
                  }`}
                >
                  {s.value}
                </p>
                <p
                  className={`mt-4 text-sm leading-relaxed ${
                    s.featured ? "text-background/70" : "text-muted-foreground"
                  }`}
                >
                  {s.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
