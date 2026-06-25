"use client"

/**
 * Agency-grade content slide. Asymmetric 4/8 split — left rail with
 * eyebrow + heading + intro, right column with a hairline-divided
 * numbered list. No bullets/checkmarks; the numerals do the work.
 * Theme-token only.
 */
const POINTS = [
  {
    title: "Three flagship engagements shipped",
    body: "Brand and digital flagships for Atlas Logistics, Foundry Health, and Verge Robotics — each scoped, designed, and built end-to-end.",
  },
  {
    title: "A 14-person team, three new disciplines",
    body: "Motion, real-time 3D, and editorial copywriting all moved in-house this year — work that used to bottleneck on partners now ships continuously.",
  },
  {
    title: "Studio retainers, doubled",
    body: "Long-running partnerships now make up just over half of revenue. Predictable cadence for the work, predictable runway for the team.",
  },
  {
    title: "Time-to-first-impression cut in half",
    body: "A redesigned discovery sprint turns a blank brief into a presented direction in nine working days, down from eighteen at the start of the year.",
  },
]

export default function SlideAgencyContent() {
  return (
    <div className="bg-background flex h-[900px] w-full flex-col overflow-hidden">
      {/* Top meta */}
      <div className="border-border flex items-center justify-between border-b px-20 py-8">
        <span className="text-foreground text-sm font-semibold tracking-tight">
          STUDIO
        </span>
        <span className="text-muted-foreground font-mono text-xs">02 / 12</span>
      </div>

      {/* Body */}
      <div className="grid flex-1 grid-cols-12 gap-12 px-20 py-16">
        <div className="col-span-12 lg:col-span-4">
          <span className="text-primary text-xs font-medium tracking-[0.3em] uppercase">
            Section 02
          </span>
          <h2 className="text-foreground mt-6 text-5xl leading-[1.05] font-medium tracking-tight [text-wrap:balance]">
            What changed this year.
          </h2>
          <p className="text-muted-foreground mt-6 text-base leading-relaxed">
            Four shifts that define how the studio operates today — and that
            shape the proposals we&apos;ll bring you in the year ahead.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="border-border border-t">
            {POINTS.map((p, i) => (
              <div
                key={p.title}
                className="border-border grid grid-cols-12 gap-8 border-b py-7"
              >
                <span className="text-muted-foreground/60 col-span-1 font-mono text-sm">
                  0{i + 1}
                </span>
                <div className="col-span-11">
                  <h3 className="text-foreground text-xl font-medium tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-base leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
