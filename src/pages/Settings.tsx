import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings as SettingsIcon, User, Wifi, Bell, Shield } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6 animate-slide-up pb-20 md:pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">⚙️ Settings</h1>
        <p className="text-muted-foreground">
          Customize your FlowHivee experience
        </p>
      </div>

      {/* Profile Settings */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Profile Settings
          </CardTitle>
          <CardDescription>Manage your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline" size="sm">
                Change Avatar
              </Button>
              <p className="text-sm text-muted-foreground">
                JPG, PNG or GIF (MAX. 800x800px)
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue="John Doe" />
            </div>

            <div className="space-y-2">
              <Label>Student ID</Label>
              <Input defaultValue="STU-2024-0042" disabled />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email (Optional)</Label>
            <Input type="email" placeholder="your.email@example.com" />
          </div>

          <Button variant="warm">Save Profile</Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Notifications
          </CardTitle>
          <CardDescription>Control what updates you receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">New Lessons</p>
              <p className="text-sm text-muted-foreground">
                Get notified when new lessons are available
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Quiz Reminders</p>
              <p className="text-sm text-muted-foreground">
                Receive reminders for upcoming quizzes
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Achievement Badges</p>
              <p className="text-sm text-muted-foreground">
                Celebrate when you earn new badges
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Community Updates</p>
              <p className="text-sm text-muted-foreground">
                Stay updated on community discussions
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Server Settings */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="w-5 h-5 text-primary" />
            Server Information
          </CardTitle>
          <CardDescription>FlowHivee local server details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center gap-2 text-success mb-2">
              <Wifi className="w-4 h-4 animate-pulse-glow" />
              <span className="font-medium">Connected to FlowHivee LAN</span>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Server IP: 192.168.1.100</p>
              <p>Network: FlowHivee_Local</p>
              <p>Connected Devices: 48</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>QR Code for Quick Connect</Label>
            <div className="p-8 bg-muted rounded-lg flex items-center justify-center">
              <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center border-2 border-border">
                <p className="text-center text-sm text-muted-foreground">
                  QR Code<br />Would Display Here
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Scan this QR code to connect to FlowHivee
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Privacy & Security
          </CardTitle>
          <CardDescription>Control your data and privacy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Show Progress to Others</p>
              <p className="text-sm text-muted-foreground">
                Let other students see your achievements
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Anonymous in Community</p>
              <p className="text-sm text-muted-foreground">
                Hide your real name in discussions
              </p>
            </div>
            <Switch />
          </div>

          <div className="pt-4 border-t">
            <Button variant="destructive">Clear All Data</Button>
            <p className="text-sm text-muted-foreground mt-2">
              Remove all your personal data from this device
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
