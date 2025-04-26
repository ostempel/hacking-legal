import type React from "react"
import { ModeCheck } from "@/components/mode-check"

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ModeCheck>{children}</ModeCheck>
}
