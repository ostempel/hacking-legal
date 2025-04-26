"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Key, Wrench } from "lucide-react"

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
        value="api"
        onClick={() => handleTabChange("api")}
        className="flex items-center gap-2"
        data-state={tab === "api" ? "active" : "inactive"}
      >
        <Wrench className="h-4 w-4" />
        <span>API & Integrationen</span>
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
    </TabsList>
  )
}
