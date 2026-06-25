"use client"

import * as React from "react"
import { ExternalLink, FileText } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Post {
  id: number
  title: string
  publishedAt: string
  status: "publish" | "draft"
  wordCount: number
  humanized: boolean
  url: string
}

const DEMO_POSTS: Post[] = [
  {
    id: 1,
    title: "10 Best Project Management Tools for Remote Teams in 2025",
    publishedAt: "May 1, 2025",
    status: "publish",
    wordCount: 2840,
    humanized: true,
    url: "#",
  },
  {
    id: 2,
    title: "How to Build a High-Performance Team Culture Remotely",
    publishedAt: "May 3, 2025",
    status: "publish",
    wordCount: 3120,
    humanized: true,
    url: "#",
  },
  {
    id: 3,
    title: "Agile vs. Scrum: Which Framework Is Right for Your Team?",
    publishedAt: "May 6, 2025",
    status: "draft",
    wordCount: 2650,
    humanized: false,
    url: "#",
  },
  {
    id: 4,
    title: "The Complete Guide to OKR Goal Setting for Startups",
    publishedAt: "May 8, 2025",
    status: "draft",
    wordCount: 2900,
    humanized: true,
    url: "#",
  },
  {
    id: 5,
    title: "7 Signs Your Team Needs a Better Collaboration Tool",
    publishedAt: "May 10, 2025",
    status: "publish",
    wordCount: 2200,
    humanized: true,
    url: "#",
  },
]

export default function BlogWriterPostsTable01() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold">Published Posts</h1>
          <p className="text-muted-foreground text-xs">from WordPress</p>
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <span>
            {DEMO_POSTS.filter((p) => p.status === "publish").length} published
          </span>
          <span>·</span>
          <span>
            {DEMO_POSTS.filter((p) => p.status === "draft").length} drafts
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {DEMO_POSTS.map((post) => (
          <Card key={post.id}>
            <CardContent className="flex items-center gap-4 px-4 py-3">
              <FileText className="text-muted-foreground h-4 w-4 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{post.title}</p>
                <div className="text-muted-foreground mt-0.5 flex items-center gap-2 text-xs">
                  <span>{post.publishedAt}</span>
                  <span>·</span>
                  <span>{post.wordCount.toLocaleString()} words</span>
                </div>
              </div>
              <div className="ml-2 flex shrink-0 items-center gap-2">
                {post.humanized && (
                  <Badge
                    variant="outline"
                    className="border-purple-200 bg-purple-50 text-xs text-purple-700"
                  >
                    Humanized
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    post.status === "publish"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-amber-200 bg-amber-50 text-amber-700"
                  }`}
                >
                  {post.status === "publish" ? "Published" : "Draft"}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-7 w-7 p-0"
                >
                  <a href={post.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
