"use client"

import * as React from "react"
import { Check, Loader2, RefreshCw } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const CMS_PLATFORMS = [
  {
    id: "wordpress",
    label: "WordPress",
    description: "Self-hosted REST API",
    connected: true,
  },
  {
    id: "wordpress_com",
    label: "WordPress.com",
    description: "Hosted platform",
    connected: false,
  },
  {
    id: "ghost",
    label: "Ghost",
    description: "Admin API + JWT",
    connected: false,
  },
  {
    id: "webflow",
    label: "Webflow",
    description: "CMS REST API",
    connected: false,
  },
  {
    id: "shopify",
    label: "Shopify",
    description: "GraphQL Admin API",
    connected: false,
  },
  { id: "notion", label: "Notion", description: "Pages API", connected: false },
  { id: "wix", label: "Wix", description: "Blog REST API", connected: false },
  {
    id: "webhook",
    label: "Custom Webhook",
    description: "Any platform via POST",
    connected: false,
  },
  {
    id: "none",
    label: "Draft only",
    description: "No publishing",
    connected: false,
  },
]

export default function BlogWriterCmsConnect01() {
  const [selected, setSelected] = React.useState("wordpress")
  const [cmsUrl, setCmsUrl] = React.useState("https://mysite.com")
  const [apiKey, setApiKey] = React.useState("")
  const [testing, setTesting] = React.useState(false)
  const [testResult, setTestResult] = React.useState<"ok" | "fail" | null>(null)

  const handleTest = () => {
    setTesting(true)
    setTestResult(null)
    setTimeout(() => {
      setTesting(false)
      setTestResult("ok")
    }, 1200)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <div>
        <h1 className="text-base font-semibold">CMS Connection</h1>
        <p className="text-muted-foreground text-sm">
          Where should the agent publish articles?
        </p>
      </div>

      {/* Platform grid */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {CMS_PLATFORMS.map((cms) => (
          <button
            key={cms.id}
            onClick={() => setSelected(cms.id)}
            className={`relative rounded-lg border p-3 text-left text-xs transition-colors ${
              selected === cms.id
                ? "border-orange-500 bg-orange-50"
                : "border-border hover:border-orange-300"
            }`}
          >
            {cms.connected && (
              <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500">
                <Check className="h-2.5 w-2.5 text-white" />
              </span>
            )}
            <p className="font-medium">{cms.label}</p>
            <p className="text-muted-foreground mt-0.5">{cms.description}</p>
          </button>
        ))}
      </div>

      {/* Credentials form */}
      {selected !== "none" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">
              {CMS_PLATFORMS.find((c) => c.id === selected)?.label}{" "}
              Configuration
              {CMS_PLATFORMS.find((c) => c.id === selected)?.connected && (
                <Badge
                  variant="outline"
                  className="ml-2 border-emerald-200 bg-emerald-50 text-xs text-emerald-700"
                >
                  Connected
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>Site URL</Label>
              <Input
                value={cmsUrl}
                onChange={(e) => setCmsUrl(e.target.value)}
                type="url"
              />
            </div>
            <div>
              <Label>
                {selected === "wordpress" || selected === "wordpress_com"
                  ? "Application Password"
                  : selected === "ghost"
                    ? "Admin API Key"
                    : "API Key"}
              </Label>
              <Input
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                type="password"
                placeholder="Paste your API key"
              />
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleTest}
                disabled={testing}
              >
                {testing ? (
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                )}
                Test connection
              </Button>
              {testResult === "ok" && (
                <span className="flex items-center gap-1 text-xs text-emerald-600">
                  <Check className="h-3.5 w-3.5" />
                  Connected successfully
                </span>
              )}
              {testResult === "fail" && (
                <span className="text-destructive text-xs">
                  Connection failed — check URL and key
                </span>
              )}
            </div>
            <Button className="w-full" size="sm">
              Save Connection
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
