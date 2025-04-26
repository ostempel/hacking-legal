"use client"

import { Gavel, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface UserModeToggleProps {
  value: "legal" | "business"
  onChange: (value: "legal" | "business") => void
}

export function UserModeToggle({ value, onChange }: UserModeToggleProps) {
  return (
    <TooltipProvider>
      <div className="flex items-center justify-between rounded-md border p-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={value === "legal" ? "default" : "ghost"}
              size="sm"
              className="w-full"
              onClick={() => onChange("legal")}
            >
              <Gavel className="h-4 w-4 mr-2" />
              <span>Legal</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Detailed legal analysis mode</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={value === "business" ? "default" : "ghost"}
              size="sm"
              className="w-full"
              onClick={() => onChange("business")}
            >
              <Briefcase className="h-4 w-4 mr-2" />
              <span>Business</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Simplified business view</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
