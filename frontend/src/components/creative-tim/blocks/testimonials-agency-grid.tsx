"use client"

import { Card } from "@/components/ui/card"

const TESTIMONIALS = [
  {
    quote:
      "A studio that treats craft as non-negotiable. Every detail we'd have let slide, they caught — and the work is stronger for it.",
    name: "Sarah Johnson",
    role: "VP Design",
    company: "Lumen Studio",
    image:
      "https://images.unsplash.com/photo-1716662318479-a9c0f1cd1a0e?auto=format&fit=crop&q=80&w=200&h=200",
    featured: false,
  },
  {
    quote:
      "We've hired three agencies in five years. This is the first time the result outlasted the trend cycle — a year on, the site still feels current.",
    name: "Michael Chen",
    role: "Founder",
    company: "Verge Robotics",
    image:
      "https://images.unsplash.com/photo-1623853434105-8e7a72898180?auto=format&fit=crop&q=80&w=200&h=200",
    featured: true,
  },
  {
    quote:
      "Senior people, end to end. The person who scoped the project was the person who shipped it. That changes everything.",
    name: "Emma Rodriguez",
    role: "Head of Marketing",
    company: "Foundry Health",
    image:
      "https://images.unsplash.com/photo-1641906840000-4b88f1d44de6?auto=format&fit=crop&q=80&w=200&h=200",
    featured: false,
  },
]

export default function TestimonialsAgencyGrid() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
              Testimonials
            </span>
            <h2 className="text-foreground mt-5 text-4xl font-medium tracking-tight [text-wrap:balance] md:text-5xl">
              Trusted by teams who don&apos;t settle.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
            A decade of flagship work for founders, brand leaders, and the
            occasional skeptic.
          </p>
        </div>

        <div className="bg-border mt-16 grid grid-cols-1 gap-px md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card
              key={t.name}
              className={`flex flex-col justify-between rounded-none border-0 p-8 md:p-10 ${
                t.featured ? "bg-foreground text-background" : "bg-background"
              }`}
            >
              <blockquote
                className={`text-lg leading-relaxed font-medium tracking-tight ${
                  t.featured ? "" : "text-foreground"
                }`}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-10 flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover grayscale"
                />
                <div>
                  <p
                    className={`text-sm font-medium ${
                      t.featured ? "" : "text-foreground"
                    }`}
                  >
                    {t.name}
                  </p>
                  <p
                    className={`text-sm ${
                      t.featured
                        ? "text-background/60"
                        : "text-muted-foreground"
                    }`}
                  >
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
