import { SettingsTabs } from "@/components/settings/settings-tabs"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { ApiSettings } from "@/components/settings/api-settings"
import { SecuritySettings } from "@/components/settings/security-settings"
import { Tabs, TabsContent } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Tabs defaultValue="profile">
        <SettingsTabs />
        <TabsContent value="profile">
          <ProfileSettings />
        </TabsContent>
        <TabsContent value="api">
          <ApiSettings />
        </TabsContent>
        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
