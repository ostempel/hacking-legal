"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

export function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    // Simulate saving
    setIsEditing(false)
    toast({
      title: "Profile updated.",
      description: "Your profile has been updated successfully.",
    })
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between space-x-2">
        <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
        <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Cancel" : "Edit Profile"}</Button>
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue="Pedro Duarte" disabled={!isEditing} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" defaultValue="pedro@example.com" disabled={!isEditing} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="framework">Framework</Label>
        <Select defaultValue="next.js" disabled={!isEditing}>
          <SelectTrigger id="framework">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="next.js">Next.js</SelectItem>
            <SelectItem value="sveltekit">SvelteKit</SelectItem>
            <SelectItem value="nuxt.js">Nuxt.js</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="default-view">Standardansicht</Label>
        <Select defaultValue="legal" disabled={!isEditing}>
          <SelectTrigger id="default-view">
            <SelectValue placeholder="Standardansicht auswählen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="legal">Juristen-Modus</SelectItem>
            <SelectItem value="business">Mitarbeiter-Modus</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notifications">Benachrichtigungen</Label>
        <Switch id="notifications" disabled={!isEditing} />
      </div>
      {isEditing && <Button onClick={handleSave}>Save changes</Button>}
    </div>
  )
}
