"use client"

const QUOTE = {
  text: "They didn't redesign our website — they rebuilt how the market sees us. Six weeks after launch, inbound from enterprise accounts had doubled and our sales team finally had a story they were proud to tell.",
  name: "Daniela Krause",
  role: "Chief Marketing Officer",
  company: "Northwind Capital",
  image:
    "https://images.unsplash.com/photo-1716662318479-a9c0f1cd1a0e?auto=format&fit=crop&q=80&w=200&h=200",
}

const CLIENTS = [
  "Northwind",
  "Atlas Logistics",
  "Foundry Health",
  "Lumen Studio",
  "Verge Robotics",
]

export default function TestimonialsAgencyFeatured() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          <span className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
            Client, in their words
          </span>
          <blockquote className="text-foreground mt-8 text-3xl leading-[1.25] font-medium tracking-tight [text-wrap:balance] md:text-4xl">
            &ldquo;{QUOTE.text}&rdquo;
          </blockquote>
          <div className="mt-10 flex items-center gap-4">
            <img
              src={QUOTE.image}
              alt={QUOTE.name}
              className="h-12 w-12 rounded-full object-cover grayscale"
            />
            <div>
              <p className="text-foreground text-sm font-medium">
                {QUOTE.name}
              </p>
              <p className="text-muted-foreground text-sm">
                {QUOTE.role}, {QUOTE.company}
              </p>
            </div>
          </div>
        </div>

        <div className="border-border mt-20 border-t pt-10">
          <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase">
            Selected clients
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4">
            {CLIENTS.map((c) => (
              <span
                key={c}
                className="text-muted-foreground/70 text-lg font-medium tracking-tight"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
