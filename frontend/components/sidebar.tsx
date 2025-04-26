"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Search,
  Scale,
  Lightbulb,
  FileText,
  Users,
  Calendar,
  Settings,
  HelpCircle,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const sidebarContent = (
    <>
      <div className="flex h-14 items-center px-4 border-b lg:h-auto">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Scale className="h-6 w-6" />
          <span className={cn("hidden lg:inline-block")}>Legal AI Assistant</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto lg:hidden">
          <X className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="flex-1 py-2">
        <nav className="grid gap-1 px-2">
          <Link
            href="/dashboard"
            onClick={() => isMobile && setIsOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === "/dashboard" ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/research"
            onClick={() => isMobile && setIsOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname?.startsWith("/dashboard/research") ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <Search className="h-5 w-5" />
            Legal Research
          </Link>
          <Link
            href="/dashboard/evidence"
            onClick={() => isMobile && setIsOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname?.startsWith("/dashboard/evidence") ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <Scale className="h-5 w-5" />
            Evidence Analysis
          </Link>
          <Link
            href="/dashboard/strategy"
            onClick={() => isMobile && setIsOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname?.startsWith("/dashboard/strategy") ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <Lightbulb className="h-5 w-5" />
            Case Strategy
          </Link>

          <div className="my-2 border-t"></div>

          <Link
            href="/dashboard/cases"
            onClick={() => isMobile && setIsOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname?.startsWith("/dashboard/cases") ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <FileText className="h-5 w-5" />
            Cases
          </Link>
          <Link
            href="/dashboard/clients"
            onClick={() => isMobile && setIsOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname?.startsWith("/dashboard/clients") ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <Users className="h-5 w-5" />
            Clients
          </Link>
          <Link
            href="/dashboard/calendar"
            onClick={() => isMobile && setIsOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname?.startsWith("/dashboard/calendar") ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <Calendar className="h-5 w-5" />
            Calendar
          </Link>

          <div className="my-2 border-t"></div>

          <Link
            href="/dashboard/settings"
            onClick={() => isMobile && setIsOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname?.startsWith("/dashboard/settings") ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <Link
            href="/dashboard/help"
            onClick={() => isMobile && setIsOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname?.startsWith("/dashboard/help") ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <HelpCircle className="h-5 w-5" />
            Help & Support
          </Link>
        </nav>
      </ScrollArea>
    </>
  )

  return (
    <>
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg lg:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {isMobile ? (
        <div
          className={cn(
            "fixed inset-0 z-50 bg-background transition-transform duration-300 ease-in-out lg:hidden",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-full w-3/4 max-w-xs flex-col">{sidebarContent}</div>
          <div
            className={cn(
              "absolute inset-0 bg-black/50 transition-opacity duration-300 ease-in-out",
              isOpen ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            onClick={() => setIsOpen(false)}
          />
        </div>
      ) : (
        <div className={cn("hidden border-r bg-background lg:block lg:w-64", className)}>
          <div className="flex h-full flex-col">{sidebarContent}</div>
        </div>
      )}
    </>
  )
}
