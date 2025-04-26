"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Key, LogOut } from "lucide-react"

export function SettingsTabs() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tab = searchParams.get("tab") || "profile"

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("tab", value)
    router.push(`?${params.toString()}`)
  }

  return (
    <TabsList className="grid w-full grid-cols-3">
      <TabsTrigger
        value="profile"
        onClick={() => handleTabChange("profile")}
        className="flex items-center gap-2"
        data-state={tab === "profile" ? "active" : "inactive"}
      >
        <User className="h-4 w-4" />
        <span>Profil</span>
      </TabsTrigger>
      <TabsTrigger
        value="security"
        onClick={() => handleTabChange("security")}
        className="flex items-center gap-2"
        data-state={tab === "security" ? "active" : "inactive"}
      >
        <Key className="h-4 w-4" />
        <span>Sicherheit</span>
      </TabsTrigger>
      <TabsTrigger
        value="logout"
        onClick={() => handleTabChange("logout")}
        className="flex items-center gap-2"
        data-state={tab === "logout" ? "active" : "inactive"}
      >
        <LogOut className="h-4 w-4" />
        <span>Abmelden</span>
      </TabsTrigger>
    </TabsList>
  )
}
