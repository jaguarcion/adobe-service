"use client"

import * as React from "react"
import {
  BarChart3,
  Bell,
  ChevronDown,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// ─── Layout style toggle ─────────────────────────────────────────────────────
// false → CALM: solid card-colored sidebar/header on a flat background.
//                 Linear / Notion / Vercel feel. Works with any theme.
// true  → IMMERSIVE: full-bleed primary-tinted gradient background with a
//                 frosted-glass sidebar/header (visionOS feel).
//                 Looks best with rich themes like abyss, harbor, blush.
const IMMERSIVE = false

// Derived classes — change IMMERSIVE above, not the strings below.
const SHELL_BG = IMMERSIVE
  ? "bg-gradient-to-br from-primary/25 via-background to-background"
  : "bg-background"
const PANEL = IMMERSIVE ? "bg-card/40 backdrop-blur-xl" : "bg-card"
const PANEL_BORDER = IMMERSIVE ? "border-border/40" : "border-border"
const SURFACE = IMMERSIVE
  ? "bg-card/60 backdrop-blur-md border-border/40"
  : "bg-card border-border"

const NAV_ITEMS = [
  { icon: Home, label: "Overview", active: true },
  { icon: BarChart3, label: "Analytics", badge: null },
  { icon: Users, label: "Users", badge: "128" },
  { icon: FileText, label: "Reports", badge: null },
  { icon: Settings, label: "Settings", badge: null },
]

function SidebarContent() {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5">
        <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
          <LayoutDashboard className="text-primary-foreground h-4 w-4" />
        </div>
        <span className="text-foreground text-base font-bold">Dashboard</span>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        <p className="text-muted-foreground mb-2 px-3 text-xs font-semibold tracking-wider uppercase">
          Main Menu
        </p>
        {NAV_ITEMS.map(({ icon: Icon, label, active, badge }) => (
          <button
            key={label}
            className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className="h-4 w-4" />
              {label}
            </div>
            {badge && (
              <Badge
                variant={active ? "secondary" : "outline"}
                className="text-xs"
              >
                {badge}
              </Badge>
            )}
          </button>
        ))}
      </nav>

      <Separator />

      {/* User profile */}
      <div className="px-3 py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:bg-muted flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&w=64&q=80" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-foreground text-xs font-semibold">
                  Jane Doe
                </p>
                <p className="text-muted-foreground text-xs">
                  jane@company.com
                </p>
              </div>
              <ChevronDown className="text-muted-foreground h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default function DashboardSidebar() {
  return (
    <div className={`${SHELL_BG} flex h-screen w-full overflow-hidden`}>
      {/* Desktop sidebar */}
      <aside
        className={`hidden w-60 shrink-0 border-r ${PANEL_BORDER} ${PANEL} lg:flex lg:flex-col`}
      >
        <SidebarContent />
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header
          className={`flex h-14 items-center justify-between border-b ${PANEL_BORDER} ${PANEL} px-6`}
        >
          {/* Mobile menu trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-60 p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>

          <div className="text-muted-foreground hidden items-center gap-1 text-sm lg:flex">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-foreground font-medium">Overview</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="bg-primary absolute top-2 right-2 h-2 w-2 rounded-full" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&w=64&q=80" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-foreground text-2xl font-bold">Overview</h1>
            <p className="text-muted-foreground text-sm">
              Welcome back, Jane. Here's what's happening today.
            </p>
          </div>

          {/* KPI cards placeholder */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total Users", value: "12,430", change: "+8.2%" },
              { label: "Revenue", value: "$84,200", change: "+12.5%" },
              { label: "Active Sessions", value: "3,210", change: "+3.1%" },
              { label: "Conversion Rate", value: "3.6%", change: "-0.4%" },
            ].map(({ label, value, change }) => (
              <div key={label} className={`rounded-lg border p-5 ${SURFACE}`}>
                <p className="text-muted-foreground text-sm">{label}</p>
                <p className="text-foreground mt-1 text-2xl font-bold">
                  {value}
                </p>
                <p
                  className={`mt-1 text-xs font-medium ${
                    change.startsWith("+") ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {change} vs last month
                </p>
              </div>
            ))}
          </div>

          {/* Chart placeholder */}
          <div className={`mt-6 rounded-lg border p-6 ${SURFACE}`}>
            <h2 className="text-foreground mb-4 text-base font-semibold">
              Revenue Over Time
            </h2>
            <div className="flex h-48 items-end gap-2">
              {[40, 65, 50, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                <div
                  key={i}
                  className="bg-primary/80 hover:bg-primary flex-1 rounded-t-sm transition-all"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="text-muted-foreground mt-2 flex justify-between text-xs">
              {[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
