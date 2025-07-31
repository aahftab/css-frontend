import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toogle";

export function Settings() {
  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Customize your application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Theme Mode</span>
            <ModeToggle />
          </div>
          <p>This page contains settings for your application. You can add more settings as needed.</p>
        </CardContent>
      </Card>
    </div>
  );
}
