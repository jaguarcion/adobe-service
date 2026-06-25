"use client"

import * as React from "react"
import {
  BarChart2,
  Circle,
  ExternalLink,
  Globe,
  PenLine,
  Plus,
  Trash2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface BlogAgent {
  id: string
  botName: string
  status: "active" | "provisioning" | "inactive" | "error"
  domain: string
  niche: string
  cmsType: string
  postsPerMonth: number
  domainRating: number | null
}

const DEMO_AGENTS: BlogAgent[] = [
  {
    id: "1",
    botName: "TechBlog Writer",
    status: "active",
    domain: "techblog.example.com",
    niche: "SaaS & Productivity",
    cmsType: "WordPress",
    postsPerMonth: 30,
    domainRating: 42,
  },
  {
    id: "2",
    botName: "Ecom Content Bot",
    status: "provisioning",
    domain: "shop.example.com",
    niche: "E-commerce",
    cmsType: "Shopify",
    postsPerMonth: 20,
    domainRating: null,
  },
  {
    id: "3",
    botName: "Health Writer",
    status: "active",
    domain: "healthtips.example.com",
    niche: "Health & Fitness",
    cmsType: "Ghost",
    postsPerMonth: 30,
    domainRating: 28,
  },
]

function StatusDot({ status }: { status: BlogAgent["status"] }) {
  const color =
    status === "active"
      ? "text-emerald-500"
      : status === "provisioning"
        ? "text-amber-500"
        : status === "error"
          ? "text-red-500"
          : "text-slate-400"
  return <Circle className={`h-2 w-2 fill-current ${color}`} />
}

export default function BlogWriterAgentList01() {
  const [agents] = React.useState<BlogAgent[]>(DEMO_AGENTS)

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Blog Writer Agents</h1>
          <p className="text-muted-foreground text-sm">
            AI agents that research, write, and publish 30 SEO articles per
            month
          </p>
        </div>
        <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
          <Plus className="mr-1.5 h-4 w-4" />
          New Agent
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="px-4 py-3">
            <p className="text-muted-foreground text-xs">Agents</p>
            <p className="text-2xl font-bold">{agents.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="px-4 py-3">
            <p className="text-muted-foreground text-xs">Active</p>
            <p className="text-2xl font-bold">
              {agents.filter((a) => a.status === "active").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="px-4 py-3">
            <p className="text-muted-foreground text-xs">Posts/month</p>
            <p className="text-2xl font-bold">
              {agents
                .filter((a) => a.status === "active")
                .reduce((s, a) => s + a.postsPerMonth, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Agent grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {agents.map((agent) => (
          <Card key={agent.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StatusDot status={agent.status} />
                  <CardTitle className="text-sm font-semibold">
                    {agent.botName}
                  </CardTitle>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    agent.status === "active"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : agent.status === "provisioning"
                        ? "border-amber-200 bg-amber-50 text-amber-700"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                  }`}
                >
                  {agent.status === "provisioning" ? "Starting…" : agent.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <Globe className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{agent.domain}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="outline" className="text-xs">
                  {agent.niche}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-orange-200 bg-orange-50 text-xs text-orange-700"
                >
                  {agent.cmsType}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {agent.postsPerMonth} posts/mo
                </Badge>
                {agent.domainRating !== null && (
                  <Badge
                    variant="outline"
                    className="border-blue-200 bg-blue-50 text-xs text-blue-700"
                  >
                    DR {agent.domainRating}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Button
                  size="sm"
                  variant="default"
                  className="h-7 flex-1 text-xs"
                >
                  <BarChart2 className="mr-1 h-3.5 w-3.5" />
                  Overview
                </Button>
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:text-destructive h-7 text-xs"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Network CTA */}
      <Card className="border-orange-200 bg-orange-50/50">
        <CardContent className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="text-sm font-medium">Backlink Exchange Network</p>
            <p className="text-muted-foreground text-xs">
              Grow your domain authority by exchanging links with other sites
            </p>
          </div>
          <Button size="sm" variant="outline">
            View Network
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
