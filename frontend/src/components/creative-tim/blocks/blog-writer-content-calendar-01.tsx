"use client"

import * as React from "react"
import { Calendar, Clock, FileText } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface CalendarPost {
  id: number
  title: string
  keyword: string
  status: "planned" | "drafted" | "published"
  publishDate: string
  wordCount: number
}

const STATUS_CONFIG = {
  planned: {
    label: "Planned",
    color: "border-slate-200 bg-slate-50 text-slate-600",
  },
  drafted: {
    label: "Drafted",
    color: "border-amber-200 bg-amber-50 text-amber-700",
  },
  published: {
    label: "Published",
    color: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
}

const DEMO_POSTS: CalendarPost[] = [
  {
    id: 1,
    title: "10 Best Project Management Tools for Remote Teams in 2025",
    keyword: "project management tools",
    status: "published",
    publishDate: "May 1",
    wordCount: 2840,
  },
  {
    id: 2,
    title: "How to Build a High-Performance Team Culture Remotely",
    keyword: "remote team culture",
    status: "published",
    publishDate: "May 3",
    wordCount: 3120,
  },
  {
    id: 3,
    title: "Agile vs. Scrum: Which Framework Is Right for Your Team?",
    keyword: "agile vs scrum",
    status: "drafted",
    publishDate: "May 6",
    wordCount: 2650,
  },
  {
    id: 4,
    title: "The Complete Guide to OKR Goal Setting for Startups",
    keyword: "OKR goal setting",
    status: "drafted",
    publishDate: "May 8",
    wordCount: 2900,
  },
  {
    id: 5,
    title: "7 Signs Your Team Needs a Better Collaboration Tool",
    keyword: "team collaboration tool",
    status: "planned",
    publishDate: "May 10",
    wordCount: 0,
  },
  {
    id: 6,
    title: "How to Run Effective Async Stand-ups That Actually Work",
    keyword: "async standup",
    status: "planned",
    publishDate: "May 13",
    wordCount: 0,
  },
  {
    id: 7,
    title: "Employee Onboarding Checklist for Remote Companies",
    keyword: "remote onboarding checklist",
    status: "planned",
    publishDate: "May 15",
    wordCount: 0,
  },
  {
    id: 8,
    title: "Time Tracking Software: 8 Tools Teams Actually Use",
    keyword: "time tracking software",
    status: "planned",
    publishDate: "May 17",
    wordCount: 0,
  },
  {
    id: 9,
    title: "How to Measure Team Productivity Without Micromanaging",
    keyword: "team productivity metrics",
    status: "planned",
    publishDate: "May 20",
    wordCount: 0,
  },
]

export default function BlogWriterContentCalendar01() {
  const planned = DEMO_POSTS.filter((p) => p.status === "planned").length
  const drafted = DEMO_POSTS.filter((p) => p.status === "drafted").length
  const published = DEMO_POSTS.filter((p) => p.status === "published").length

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold">
            Content Calendar — May 2025
          </h1>
          <p className="text-muted-foreground text-xs">
            {DEMO_POSTS.length} articles planned
          </p>
        </div>
        <Badge variant="outline" className="text-xs">
          {published}/{DEMO_POSTS.length} published
        </Badge>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="px-4 py-3">
            <p className="text-muted-foreground text-xs">Planned</p>
            <p className="text-2xl font-bold">{planned}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="px-4 py-3">
            <p className="text-muted-foreground text-xs">Drafted</p>
            <p className="text-2xl font-bold">{drafted}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="px-4 py-3">
            <p className="text-muted-foreground text-xs">Published</p>
            <p className="text-2xl font-bold">{published}</p>
          </CardContent>
        </Card>
      </div>

      {/* Post cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {DEMO_POSTS.map((post) => {
          const cfg = STATUS_CONFIG[post.status]
          return (
            <Card key={post.id}>
              <CardContent className="space-y-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="line-clamp-2 text-sm leading-snug font-medium">
                    {post.title}
                  </p>
                  <Badge
                    variant="outline"
                    className={`shrink-0 text-xs ${cfg.color}`}
                  >
                    {cfg.label}
                  </Badge>
                </div>
                <p className="text-muted-foreground truncate text-xs">
                  {post.keyword}
                </p>
                <div className="text-muted-foreground flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.publishDate}
                  </span>
                  {post.wordCount > 0 && (
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {post.wordCount.toLocaleString()} words
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
