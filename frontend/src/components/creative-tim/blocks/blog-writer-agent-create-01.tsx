"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight, Check, Globe, PenLine } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const STEPS = [
  { id: 1, label: "Website" },
  { id: 2, label: "Brand Voice" },
  { id: 3, label: "CMS" },
  { id: 4, label: "SEO" },
  { id: 5, label: "Content" },
  { id: 6, label: "Model" },
  { id: 7, label: "Network" },
]

const CMS_OPTIONS = [
  { id: "wordpress", label: "WordPress", description: "Self-hosted REST API" },
  { id: "ghost", label: "Ghost", description: "Admin API + JWT" },
  { id: "webflow", label: "Webflow", description: "CMS REST API" },
  { id: "none", label: "Draft only", description: "No publishing" },
]

const TONE_OPTIONS = [
  { id: "professional", label: "Professional" },
  { id: "casual", label: "Casual" },
  { id: "technical", label: "Technical" },
  { id: "storytelling", label: "Storytelling" },
]

export default function BlogWriterAgentCreate01() {
  const [step, setStep] = React.useState(1)
  const [tone, setTone] = React.useState("professional")
  const [cmsType, setCmsType] = React.useState("wordpress")
  const [backlinkOptedIn, setBacklinkOptedIn] = React.useState(false)

  return (
    <div className="mx-auto max-w-xl space-y-6 p-6">
      {/* Step indicator */}
      <div className="flex items-center gap-1">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.id}>
            <div className="flex items-center gap-1">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  s.id < step
                    ? "bg-orange-500 text-white"
                    : s.id === step
                      ? "bg-orange-500 text-white"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {s.id < step ? <Check className="h-3 w-3" /> : s.id}
              </div>
              <span
                className={`hidden text-xs sm:block ${s.id === step ? "font-medium" : "text-muted-foreground"}`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && <div className="bg-border h-px w-3" />}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-semibold">Website Info</h2>
            <p className="text-muted-foreground text-sm">
              Tell us about the site this agent will write for.
            </p>
          </div>
          <div className="space-y-3">
            <div>
              <Label>Business / Site Name</Label>
              <Input placeholder="Acme Corp" defaultValue="TechBlog" />
            </div>
            <div>
              <Label>Website URL</Label>
              <Input
                placeholder="https://yoursite.com"
                defaultValue="https://techblog.example.com"
                type="url"
              />
            </div>
            <div>
              <Label>Niche / Industry</Label>
              <Input
                placeholder="SaaS, E-commerce, Health & Fitness…"
                defaultValue="SaaS & Productivity"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-semibold">Brand Voice</h2>
            <p className="text-muted-foreground text-sm">
              Define how the agent should write.
            </p>
          </div>
          <div className="space-y-3">
            <div>
              <Label>Tone</Label>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {TONE_OPTIONS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                      tone === t.id
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-border text-muted-foreground hover:border-orange-300"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Target Audience</Label>
              <Input
                placeholder="Small business owners, marketers…"
                defaultValue="SaaS founders and product managers"
              />
            </div>
            <div>
              <Label>Writing Rules (optional)</Label>
              <Textarea
                placeholder="Avoid jargon. Always cite statistics…"
                rows={3}
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-semibold">CMS Connection</h2>
            <p className="text-muted-foreground text-sm">
              Where should the agent publish articles?
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {CMS_OPTIONS.map((cms) => (
              <button
                key={cms.id}
                onClick={() => setCmsType(cms.id)}
                className={`rounded-lg border p-3 text-left text-xs transition-colors ${
                  cmsType === cms.id
                    ? "border-orange-500 bg-orange-50"
                    : "border-border hover:border-orange-300"
                }`}
              >
                <p className="font-medium">{cms.label}</p>
                <p className="text-muted-foreground">{cms.description}</p>
              </button>
            ))}
          </div>
          {cmsType !== "none" && (
            <div className="space-y-3">
              <div>
                <Label>CMS URL</Label>
                <Input placeholder="https://yourblog.com" type="url" />
              </div>
              <div>
                <Label>API Key</Label>
                <Input placeholder="Paste your CMS API key" type="password" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Steps 4-6 abbreviated */}
      {step >= 4 && step <= 6 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-semibold">{STEPS[step - 1].label}</h2>
            <p className="text-muted-foreground text-sm">
              Configure {STEPS[step - 1].label.toLowerCase()} settings.
            </p>
          </div>
          <Card className="border-dashed">
            <CardContent className="text-muted-foreground flex items-center justify-center py-12 text-sm">
              Step {step} — {STEPS[step - 1].label} configuration
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 7 */}
      {step === 7 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-semibold">
              Backlink Exchange Network
            </h2>
            <p className="text-muted-foreground text-sm">
              Grow your domain authority by exchanging contextual backlinks.
            </p>
          </div>
          <button
            onClick={() => setBacklinkOptedIn((v) => !v)}
            className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-colors ${
              backlinkOptedIn
                ? "border-orange-500 bg-orange-50"
                : "border-border hover:border-orange-300"
            }`}
          >
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${backlinkOptedIn ? "border-orange-500 bg-orange-500" : "border-muted-foreground"}`}
            >
              {backlinkOptedIn && <Check className="h-3 w-3 text-white" />}
            </div>
            <div>
              <p className="text-sm font-medium">
                Join the Backlink Exchange Network
              </p>
              <p className="text-muted-foreground text-xs">
                Contextual backlinks with vetted sites. Leave anytime.
              </p>
            </div>
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          {step === 1 ? "Cancel" : "Back"}
        </Button>
        {step < 7 ? (
          <Button size="sm" onClick={() => setStep((s) => s + 1)}>
            Next
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        ) : (
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
            <PenLine className="mr-1.5 h-4 w-4" />
            Deploy Agent
          </Button>
        )}
      </div>
    </div>
  )
}
