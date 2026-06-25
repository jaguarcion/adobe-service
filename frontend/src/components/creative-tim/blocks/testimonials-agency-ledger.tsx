"use client"

const ENTRIES = [
  {
    index: "01",
    client: "Atlas Logistics",
    project: "Brand identity & flagship site",
    year: "2024",
    quote:
      "The most senior team we've worked with. No hand-holding, no churn — just a sharp point of view and a site that finally matches the scale of the business.",
    name: "Marcus Bell",
    role: "VP Brand",
  },
  {
    index: "02",
    client: "Foundry Health",
    project: "Positioning & product marketing site",
    year: "2023",
    quote:
      "They asked harder questions than our board does. The positioning work alone changed how we pitch — the site was almost a bonus.",
    name: "Priya Anand",
    role: "Co-founder & CEO",
  },
  {
    index: "03",
    client: "Verge Robotics",
    project: "Series B launch campaign",
    year: "2023",
    quote:
      "We had eight weeks before announcing our raise. They delivered a flagship site, a launch film, and a press kit — and every piece felt like one voice.",
    name: "Tom Whitfield",
    role: "Head of Communications",
  },
]

export default function TestimonialsAgencyLedger() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl">
          <span className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
            Engagements
          </span>
          <h2 className="text-foreground mt-5 text-4xl font-medium tracking-tight [text-wrap:balance] md:text-5xl">
            The work, and what they said after.
          </h2>
        </div>

        <div className="mt-16">
          {ENTRIES.map((e) => (
            <div
              key={e.index}
              className="border-border grid grid-cols-1 gap-6 border-t py-10 last:border-b md:grid-cols-12 md:gap-10 md:py-12"
            >
              <div className="md:col-span-4">
                <span className="text-muted-foreground/60 font-mono text-sm">
                  {e.index}
                </span>
                <p className="text-foreground mt-4 text-lg font-medium tracking-tight">
                  {e.client}
                </p>
                <p className="text-muted-foreground mt-1 text-sm">
                  {e.project}
                </p>
                <p className="text-muted-foreground/60 mt-1 text-sm">
                  {e.year}
                </p>
              </div>
              <div className="md:col-span-8">
                <blockquote className="text-foreground text-xl leading-relaxed font-medium tracking-tight [text-wrap:balance] md:text-2xl">
                  &ldquo;{e.quote}&rdquo;
                </blockquote>
                <p className="text-muted-foreground mt-6 text-sm">
                  {e.name} — {e.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
