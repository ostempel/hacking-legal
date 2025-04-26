"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Shield, Key, Smartphone, AlertTriangle } from "lucide-react"

export function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Change your password regularly to increase security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <div className="relative">
              <Input id="current-password" type={showCurrentPassword ? "text" : "password"} />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 text-xs"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? "Hide" : "Show"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <div className="relative">
              <Input id="new-password" type={showNewPassword ? "text" : "password"} />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 text-xs"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? "Hide" : "Show"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Password must be at least 12 characters long and include uppercase and lowercase letters, numbers, and
              special characters.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <div className="relative">
              <Input id="confirm-password" type={showConfirmPassword ? "text" : "password"} />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 text-xs"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </Button>
            </div>
          </div>

          <Button>Change Password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Increase your account security with two-factor authentication</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="2fa">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Requires an additional security code when logging in</p>
            </div>
            <Switch id="2fa" defaultChecked />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-md">
              <div className="flex items-center gap-4">
                <Smartphone className="h-8 w-8 text-green-500" />
                <div>
                  <h3 className="font-medium">Authenticator App</h3>
                  <p className="text-sm text-muted-foreground">
                    Use an authenticator app like Google Authenticator or Microsoft Authenticator
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Active
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-md">
              <div className="flex items-center gap-4">
                <Key className="h-8 w-8 text-blue-500" />
                <div>
                  <h3 className="font-medium">Security Key</h3>
                  <p className="text-sm text-muted-foreground">Use a physical security key like YubiKey</p>
                </div>
              </div>
              <Button variant="outline">Set Up</Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-md">
              <div className="flex items-center gap-4">
                <Shield className="h-8 w-8 text-purple-500" />
                <div>
                  <h3 className="font-medium">Backup Codes</h3>
                  <p className="text-sm text-muted-foreground">Generate backup codes for emergencies</p>
                </div>
              </div>
              <Button variant="outline">Generate</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Access Log</CardTitle>
          <CardDescription>Review recent logins and activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 rounded-md border">
              <div className="mt-1">
                <Shield className="h-5 w-5 text-green-500" />
              </div>
              <div className="space-y-1">
                <h4 className="font-medium">Successful Login</h4>
                <p className="text-sm text-muted-foreground">
                  From 192.168.1.1 (Berlin, Germany) with Chrome on Windows
                </p>
                <p className="text-xs text-muted-foreground">Today, 10:23 AM</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-md border">
              <div className="mt-1">
                <Shield className="h-5 w-5 text-green-500" />
              </div>
              <div className="space-y-1">
                <h4 className="font-medium">Successful Login</h4>
                <p className="text-sm text-muted-foreground">
                  From 192.168.1.1 (Berlin, Germany) with Chrome on Windows
                </p>
                <p className="text-xs text-muted-foreground">Yesterday, 3:47 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-md border">
              <div className="mt-1">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              <div className="space-y-1">
                <h4 className="font-medium">Failed Login</h4>
                <p className="text-sm text-muted-foreground">From 203.0.113.1 (Unknown) with Safari on macOS</p>
                <p className="text-xs text-muted-foreground">3 days ago, 10:15 PM</p>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            View Full Log
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Privacy and Security</CardTitle>
          <CardDescription>Manage your privacy and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="session-timeout">Automatic Logout</Label>
              <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
            </div>
            <Switch id="session-timeout" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="ip-restriction">IP Restriction</Label>
              <p className="text-sm text-muted-foreground">Allow access only from specific IP addresses</p>
            </div>
            <Switch id="ip-restriction" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="audit-logging">Audit Logging</Label>
              <p className="text-sm text-muted-foreground">Detailed logging of all activities</p>
            </div>
            <Switch id="audit-logging" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="data-encryption">Data Encryption</Label>
              <p className="text-sm text-muted-foreground">End-to-end encryption for sensitive data</p>
            </div>
            <Switch id="data-encryption" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
