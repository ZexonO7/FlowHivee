import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Wifi, Bell, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { 
  getUserSettings, 
  updateUserName, 
  updateUserEmail,
  updateNotificationSettings,
  updatePrivacySettings,
  clearAllData,
  type UserSettings
} from "@/lib/settings-storage";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [settings, setSettings] = useState<UserSettings>(getUserSettings());
  const [name, setName] = useState(settings.name);
  const [email, setEmail] = useState(settings.email);
  const { toast } = useToast();

  useEffect(() => {
    const currentSettings = getUserSettings();
    setSettings(currentSettings);
    setName(currentSettings.name);
    setEmail(currentSettings.email);
  }, []);

  const handleSaveProfile = () => {
    if (!name.trim()) {
      toast({
        title: "Invalid name",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }

    updateUserName(name);
    updateUserEmail(email);
    setSettings(getUserSettings());
    
    toast({
      title: "Profile updated! ✅",
      description: "Your changes have been saved",
    });
  };

  const handleNotificationToggle = (key: keyof UserSettings['notifications']) => {
    const newValue = !settings.notifications[key];
    updateNotificationSettings(key, newValue);
    setSettings(getUserSettings());
  };

  const handlePrivacyToggle = (key: keyof UserSettings['privacy']) => {
    const newValue = !settings.privacy[key];
    updatePrivacySettings(key, newValue);
    setSettings(getUserSettings());
  };

  const handleClearData = () => {
    clearAllData();
  };
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
                {settings.initials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Avatar automatically generated from your name
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label>Student ID</Label>
              <Input value={settings.studentId} disabled />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email (Optional)</Label>
            <Input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com" 
            />
          </div>

          <Button variant="warm" onClick={handleSaveProfile}>Save Profile</Button>
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
            <Switch 
              checked={settings.notifications.newLessons}
              onCheckedChange={() => handleNotificationToggle('newLessons')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Quiz Reminders</p>
              <p className="text-sm text-muted-foreground">
                Receive reminders for upcoming quizzes
              </p>
            </div>
            <Switch 
              checked={settings.notifications.quizReminders}
              onCheckedChange={() => handleNotificationToggle('quizReminders')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Achievement Badges</p>
              <p className="text-sm text-muted-foreground">
                Celebrate when you earn new badges
              </p>
            </div>
            <Switch 
              checked={settings.notifications.achievementBadges}
              onCheckedChange={() => handleNotificationToggle('achievementBadges')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Community Updates</p>
              <p className="text-sm text-muted-foreground">
                Stay updated on community discussions
              </p>
            </div>
            <Switch 
              checked={settings.notifications.communityUpdates}
              onCheckedChange={() => handleNotificationToggle('communityUpdates')}
            />
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
            <Switch 
              checked={settings.privacy.showProgress}
              onCheckedChange={() => handlePrivacyToggle('showProgress')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Anonymous in Community</p>
              <p className="text-sm text-muted-foreground">
                Hide your real name in discussions
              </p>
            </div>
            <Switch 
              checked={settings.privacy.anonymousInCommunity}
              onCheckedChange={() => handlePrivacyToggle('anonymousInCommunity')}
            />
          </div>

          <div className="pt-4 border-t">
            <Button variant="destructive" onClick={handleClearData}>
              Clear All Data
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Remove all your personal data from this device
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
