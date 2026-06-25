"use client"

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const DETAILS = [
  { icon: Mail, label: "Email", value: "studio@agency.com" },
  { icon: Phone, label: "Phone", value: "+1 (424) 535 3523" },
  { icon: MapPin, label: "Studio", value: "New York · Lisbon" },
]

export default function ContactAgencySplit() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <span className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
              Start a conversation
            </span>
            <h2 className="text-foreground mt-5 text-4xl font-medium tracking-tight [text-wrap:balance] md:text-5xl">
              Let&apos;s talk about the work.
            </h2>
            <p className="text-muted-foreground mt-5 max-w-md text-base leading-relaxed">
              Tell us where you&apos;re headed. We reply to every serious
              inquiry within two business days — usually the same one.
            </p>

            <div className="border-border mt-12 border-t">
              {DETAILS.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="border-border flex items-center gap-4 border-b py-5"
                >
                  <Icon className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground w-16 text-xs tracking-[0.15em] uppercase">
                    {label}
                  </span>
                  <span className="text-foreground text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <form action="#" className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cas-name">Name</Label>
                <Input id="cas-name" placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cas-company">Company</Label>
                <Input id="cas-company" placeholder="Acme Inc." />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cas-email">Email</Label>
              <Input id="cas-email" type="email" placeholder="jane@acme.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cas-message">Project details</Label>
              <Textarea
                id="cas-message"
                rows={5}
                placeholder="What are you building, and what does success look like?"
              />
            </div>
            <Button className="w-full rounded-none">
              Send inquiry
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
