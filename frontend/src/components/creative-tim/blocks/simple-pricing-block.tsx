"use client"

import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const DATA = [
  {
    title: "Starter",
    desc: "Free access for 2 members",
    price: 199,
    options: ["Complete documentation", "Working materials in Sketch"],
  },
  {
    title: "PRO",
    desc: "Free access for 30 members",
    price: 299,
    options: [
      "Complete documentation",
      "Working materials in Sketch",
      "2GB cloud storage",
    ],
  },
  {
    marked: true,
    title: "Premium",
    desc: "Free access for 200 members",
    price: 499,
    options: [
      "Complete documentation",
      "Working materials in Sketch",
      "20GB cloud storage",
      "100 team members",
    ],
  },
  {
    title: "Enterprise",
    desc: "Free access for all members",
    price: 899,
    options: [
      "Complete documentation",
      "Working materials in Sketch",
      "100GB cloud storage",
      "500 team members",
      "Premium support",
    ],
  },
]

export default function SimplePricingBlock() {
  return (
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight">
          Pick the best plan for you
        </h2>
        <p className="text-muted-foreground text-lg">
          You have Free Unlimited Updates and Premium Support on each package.
        </p>
      </div>
      <div className="container mx-auto mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {DATA.map(({ title, desc, price, options, marked }, key) => (
          <Card
            key={key}
            className={marked ? "bg-primary text-primary-foreground" : ""}
          >
            <CardHeader className="m-0 w-full p-6">
              <h3
                className={`text-lg font-semibold ${marked ? "" : "text-foreground"}`}
              >
                {title}
              </h3>
              <p
                className={`text-sm ${
                  marked ? "opacity-80" : "text-muted-foreground"
                }`}
              >
                {desc}
              </p>

              <div
                className={`mt-4 mb-6 flex gap-1 text-4xl font-bold ${
                  marked ? "" : "text-foreground"
                }`}
              >
                ${price}
                <span className="self-end text-lg font-semibold opacity-80">
                  /year
                </span>
              </div>
              <Button
                className="w-full"
                variant={marked ? "secondary" : "default"}
                size="sm"
              >
                Buy Now
              </Button>
            </CardHeader>
            <CardContent
              className={`border-t p-6 ${
                marked ? "border-primary-foreground/20" : "border-border"
              }`}
            >
              <ul className="flex flex-col gap-3">
                {options.map((option, key) => (
                  <li
                    key={key}
                    className={`flex items-center gap-3 ${
                      marked ? "" : "text-muted-foreground"
                    }`}
                  >
                    <Check
                      className={`h-4 w-4 stroke-2 ${
                        marked ? "" : "text-muted-foreground"
                      }`}
                    />
                    <span className="text-sm">{option}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
