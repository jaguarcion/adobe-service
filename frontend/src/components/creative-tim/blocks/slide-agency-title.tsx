"use client"

/**
 * Agency-grade cover slide. Editorial split header, oversized display
 * headline, and a giant typographic slide number as a visual anchor.
 * Theme-token only — `bg-background`, `text-foreground`, `text-primary`,
 * `text-muted-foreground`, `border-border` — so the theme generator
 * drives every color.
 */
export default function SlideAgencyTitle() {
  return (
    <div className="bg-background flex h-[900px] w-full flex-col overflow-hidden">
      {/* Top meta bar */}
      <div className="border-border flex items-center justify-between border-b px-20 py-8">
        <div className="flex items-center gap-4">
          <span className="text-foreground text-sm font-semibold tracking-tight">
            STUDIO
          </span>
          <span className="bg-border h-px w-16" />
          <span className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
            FY26 · Annual Review
          </span>
        </div>
        <span className="text-muted-foreground font-mono text-xs">01 / 12</span>
      </div>

      {/* Main body */}
      <div className="flex flex-1 items-end px-20 pt-16 pb-24">
        <div className="grid w-full grid-cols-12 items-end gap-12">
          <div className="col-span-12 lg:col-span-9">
            <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">
              The year in work
            </span>
            <h1 className="text-foreground mt-6 text-7xl leading-[1.02] font-medium tracking-tight [text-wrap:balance]">
              Building quietly,
              <br />
              shipping decisively.
            </h1>
            <p className="text-muted-foreground mt-8 max-w-2xl text-lg leading-relaxed">
              Twelve months of selected projects, the principles that shaped
              them, and the work we have planned for the year ahead.
            </p>
          </div>
          <div className="col-span-12 hidden items-end justify-end lg:col-span-3 lg:flex">
            <span className="text-muted-foreground/20 font-mono text-[10rem] leading-none">
              01
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-border flex items-center justify-between border-t px-20 py-6">
        <span className="text-muted-foreground text-sm">
          Jane Doe — Founder &amp; Creative Director
        </span>
        <span className="text-muted-foreground text-sm">May 2026</span>
      </div>
    </div>
  )
}
