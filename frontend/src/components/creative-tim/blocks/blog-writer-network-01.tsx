"use client"

import * as React from "react"
import { Check, Globe, Link2, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Participant {
  id: number
  websiteUrl: string
  niche: string
  domainRating: number
  exchangeStatus?: "pending" | "active" | null
}

const PARTICIPANTS: Participant[] = [
  {
    id: 1,
    websiteUrl: "techreviews.io",
    niche: "SaaS & Tech",
    domainRating: 44,
    exchangeStatus: "active",
  },
  {
    id: 2,
    websiteUrl: "marketingpro.co",
    niche: "Digital Marketing",
    domainRating: 38,
    exchangeStatus: "pending",
  },
  {
    id: 3,
    websiteUrl: "remotework.blog",
    niche: "Remote Work",
    domainRating: 32,
  },
  {
    id: 4,
    websiteUrl: "startupguide.com",
    niche: "Startups",
    domainRating: 29,
  },
  {
    id: 5,
    websiteUrl: "productivityhacks.io",
    niche: "Productivity",
    domainRating: 41,
  },
  { id: 6, websiteUrl: "b2binsights.co", niche: "B2B", domainRating: 35 },
]

export default function BlogWriterNetwork01() {
  const [optedIn, setOptedIn] = React.useState(true)

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold">Backlink Exchange Network</h1>
          <p className="text-muted-foreground text-xs">
            {PARTICIPANTS.length} active participants
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="px-4 py-3">
            <p className="text-muted-foreground text-xs">My Sites</p>
            <p className="text-2xl font-bold">1</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="px-4 py-3">
            <p className="text-muted-foreground text-xs">Pending</p>
            <p className="text-2xl font-bold">1</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="px-4 py-3">
            <p className="text-muted-foreground text-xs">Active</p>
            <p className="text-2xl font-bold">1</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending exchange */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold">Exchange Requests</h2>
        <Card className="border-orange-200 bg-orange-50/50">
          <CardContent className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-medium">
                New backlink exchange from marketingpro.co
              </p>
              <p className="text-muted-foreground text-xs">
                Inline link · DR 38 · Digital Marketing
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-destructive hover:text-destructive h-7 text-xs"
              >
                Decline
              </Button>
              <Button size="sm" className="h-7 text-xs">
                Accept
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Opt-in toggle */}
      <Card>
        <CardContent className="flex items-center justify-between px-4 py-4">
          <div>
            <p className="text-sm font-medium">Network participation</p>
            <p className="text-muted-foreground text-xs">
              techblog.example.com — SaaS & Productivity
            </p>
          </div>
          <button
            onClick={() => setOptedIn((v) => !v)}
            className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              optedIn
                ? "bg-emerald-100 text-emerald-700"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <div
              className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 ${optedIn ? "border-emerald-600 bg-emerald-600" : "border-muted-foreground"}`}
            >
              {optedIn && <Check className="h-2 w-2 text-white" />}
            </div>
            {optedIn ? "Opted in" : "Opted out"}
          </button>
        </CardContent>
      </Card>

      {/* Participants grid */}
      <div className="space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <Users className="h-4 w-4" />
          Network Participants
        </h2>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
          {PARTICIPANTS.map((p) => (
            <Card key={p.id}>
              <CardContent className="space-y-1 px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-xs font-medium">{p.websiteUrl}</p>
                  <div className="flex shrink-0 items-center gap-1.5">
                    {p.exchangeStatus === "active" && (
                      <Badge
                        variant="outline"
                        className="border-emerald-200 bg-emerald-50 text-xs text-emerald-700"
                      >
                        Active
                      </Badge>
                    )}
                    {p.exchangeStatus === "pending" && (
                      <Badge
                        variant="outline"
                        className="border-amber-200 bg-amber-50 text-xs text-amber-700"
                      >
                        Pending
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      DR {p.domainRating}
                    </Badge>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs">{p.niche}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
