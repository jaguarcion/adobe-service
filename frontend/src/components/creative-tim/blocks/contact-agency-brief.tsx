"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const SCOPES = ["Brand", "Website", "Product", "Campaign"]
const BUDGETS = ["$25–50k", "$50–120k", "$120–250k", "$250k+"]

export default function ContactAgencyBrief() {
  const [scope, setScope] = React.useState<string[]>(["Website"])
  const [budget, setBudget] = React.useState("$50–120k")

  function toggleScope(s: string) {
    setScope((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    )
  }

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto max-w-3xl px-6">
        <div className="text-center">
          <span className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
            Project brief
          </span>
          <h2 className="text-foreground mt-5 text-4xl font-medium tracking-tight [text-wrap:balance] md:text-5xl">
            Tell us what you&apos;re building.
          </h2>
        </div>

        <form action="#" className="mt-14 flex flex-col gap-10">
          <div>
            <Label className="text-muted-foreground text-xs tracking-[0.15em] uppercase">
              Scope of work
            </Label>
            <div className="bg-border mt-4 flex flex-wrap gap-px">
              {SCOPES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleScope(s)}
                  className={`flex-1 px-4 py-3 text-sm transition-colors ${
                    scope.includes(s)
                      ? "bg-foreground text-background"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-muted-foreground text-xs tracking-[0.15em] uppercase">
              Budget range
            </Label>
            <div className="bg-border mt-4 flex flex-wrap gap-px">
              {BUDGETS.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBudget(b)}
                  className={`flex-1 px-4 py-3 text-sm transition-colors ${
                    budget === b
                      ? "bg-foreground text-background"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cab-name">Name</Label>
              <Input id="cab-name" placeholder="Jane Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cab-email">Email</Label>
              <Input id="cab-email" type="email" placeholder="jane@acme.com" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cab-detail">Anything else?</Label>
            <Textarea
              id="cab-detail"
              rows={4}
              placeholder="Timeline, goals, links to anything relevant."
            />
          </div>

          <Button className="w-full rounded-none">
            Submit brief
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    </section>
  )
}
