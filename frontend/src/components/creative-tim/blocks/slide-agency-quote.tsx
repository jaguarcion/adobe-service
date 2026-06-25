"use client"

/**
 * Agency-grade quote slide. Inverted `bg-foreground / text-background`
 * canvas (the only token-level color flip we ever do — gives the deck a
 * tonal accent slide that still respects the theme). One oversized
 * editorial quote; no decorative quotation marks. A single `bg-primary`
 * hairline above the quote is the only accent, so the theme generator's
 * primary color reads through.
 */
export default function SlideAgencyQuote() {
  return (
    <div className="bg-foreground text-background flex h-[900px] w-full flex-col overflow-hidden">
      {/* Top meta */}
      <div className="border-background/15 flex items-center justify-between border-b px-20 py-8">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold tracking-tight">STUDIO</span>
          <span className="bg-background/30 h-px w-16" />
          <span className="text-background/60 text-xs tracking-[0.3em] uppercase">
            Voice of the client
          </span>
        </div>
        <span className="text-background/60 font-mono text-xs">03 / 12</span>
      </div>

      {/* Body */}
      <div className="flex flex-1 items-center px-20">
        <div className="max-w-5xl">
          <span className="bg-primary mb-10 inline-block h-px w-20" />
          <blockquote className="text-5xl leading-[1.15] font-medium tracking-tight [text-wrap:balance] md:text-6xl">
            They didn&apos;t redesign our website — they rebuilt how the market
            sees us.
          </blockquote>
          <div className="mt-14 flex items-center gap-4">
            <span className="bg-background/40 h-px w-10" />
            <div>
              <p className="text-base font-medium">Daniela Krause</p>
              <p className="text-background/60 text-sm">
                Chief Marketing Officer, Northwind Capital
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-background/15 flex items-center justify-between border-t px-20 py-6">
        <span className="text-background/60 text-sm">
          Engagement: Brand + Flagship Site, 2024
        </span>
        <span className="text-background/60 text-sm">May 2026</span>
      </div>
    </div>
  )
}
