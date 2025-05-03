import * as React from "react"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <Separator />
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Appearance</h2>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            <span>Dark mode</span>
          </label>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Storage</h2>
        <div>
          <p className="text-muted-foreground">Data is stored locally on your device.</p>
          <Button variant="destructive" className="mt-2">
            Clear all data
          </Button>
        </div>
      </div>
    </div>
  )
}
