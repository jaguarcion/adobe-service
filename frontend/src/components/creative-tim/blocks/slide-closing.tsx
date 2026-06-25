"use client"

import { Globe, Mail, Twitter } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function SlideClosing() {
  return (
    <div className="bg-card relative flex h-[900px] w-full flex-col overflow-hidden">
      {/* Background accent */}
      <div className="from-primary/8 pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent to-transparent" />
      <div className="bg-primary/10 pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-16 pt-12">
        <span className="text-foreground text-lg font-bold">Company</span>
        <Badge variant="secondary">08 / 08</Badge>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-16 text-center">
        <p className="text-primary mb-4 text-sm font-semibold tracking-widest uppercase">
          Thank You
        </p>
        <h1 className="text-foreground mb-6 text-6xl leading-tight font-bold tracking-tight">
          Questions?
        </h1>
        <p className="text-muted-foreground mb-12 max-w-lg text-xl [text-wrap:balance]">
          We'd love to hear your feedback and continue the conversation.
        </p>
        <div className="flex items-center gap-4">
          <Button size="lg">Schedule a Follow-up</Button>
          <Button size="lg" variant="outline">
            Download Slides
          </Button>
        </div>
      </div>

      {/* Contact row */}
      <div className="border-border relative z-10 border-t px-16 py-8">
        <div className="flex items-center justify-center gap-10">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Globe className="text-primary h-4 w-4" />
            <span>company.com</span>
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Mail className="text-primary h-4 w-4" />
            <span>hello@company.com</span>
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Twitter className="text-primary h-4 w-4" />
            <span>@company</span>
          </div>
        </div>
      </div>
    </div>
  )
}
