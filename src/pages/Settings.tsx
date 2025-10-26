import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Wifi, Bell, Shield, Languages, QrCode, KeyRound } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import QRCode from "react-qr-code";
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
  const navigate = useNavigate();
  const [settings, setSettings] = useState<UserSettings>(getUserSettings());
  const [name, setName] = useState(settings.name);
  const [email, setEmail] = useState(settings.email);
  const { toast } = useToast();
  const { language, setLanguage, t } = useLanguage();

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
        <h1 className="text-3xl font-bold mb-2">{t('settings.title')}</h1>
        <p className="text-muted-foreground">
          {t('settings.subtitle')}
        </p>
      </div>

      {/* Profile Settings */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            {t('settings.profile')}
          </CardTitle>
          <CardDescription>{t('settings.profileDesc')}</CardDescription>
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
              <Label>{t('settings.fullName')}</Label>
              <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label>{t('settings.studentId')}</Label>
              <div className="flex gap-2">
                <Input value={settings.studentId} readOnly className="bg-muted" />
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(settings.studentId);
                    toast({
                      title: "Copied!",
                      description: "Student ID copied to clipboard",
                    });
                  }}
                >
                  Copy
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="warm">
                      <QrCode className="w-4 h-4 mr-2" />
                      QR Code
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Quick Connect QR Code</DialogTitle>
                      <DialogDescription>
                        Scan this QR code on another device to instantly access your account
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center gap-6 py-6">
                      <div className="bg-white p-6 rounded-xl shadow-lg" data-qr-code>
                        <QRCode
                          value={`${window.location.origin}/?studentId=${settings.studentId}`}
                          size={256}
                          level="H"
                          fgColor="#8B4513"
                          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        />
                      </div>
                      <div className="text-center space-y-2">
                        <p className="font-semibold text-lg">{settings.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Student ID: {settings.studentId}
                        </p>
                      </div>
                      <p className="text-xs text-center text-muted-foreground px-4">
                        Anyone can scan this QR code to log into your account. Keep it private!
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <p className="text-xs text-muted-foreground">
                Use this ID to access your account on other devices or share your QR code
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t('settings.email')}</Label>
            <Input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com" 
            />
          </div>

          <Button variant="warm" onClick={handleSaveProfile}>{t('settings.saveProfile')}</Button>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-primary" />
            {t('settings.language')}
          </CardTitle>
          <CardDescription>{t('settings.languageDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-4">
              <p className="font-medium">{t('settings.english')}</p>
              <Switch 
                checked={language === 'hi'}
                onCheckedChange={(checked) => setLanguage(checked ? 'hi' : 'en')}
              />
              <p className="font-medium">{t('settings.hindi')}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {language === 'en' ? 'Currently displaying in English' : 'वर्तमान में हिंदी में प्रदर्शित'}
          </p>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            {t('settings.notifications')}
          </CardTitle>
          <CardDescription>{t('settings.notificationsDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('settings.newLessons')}</p>
              <p className="text-sm text-muted-foreground">
                {t('settings.newLessonsDesc')}
              </p>
            </div>
            <Switch 
              checked={settings.notifications.newLessons}
              onCheckedChange={() => handleNotificationToggle('newLessons')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('settings.quizReminders')}</p>
              <p className="text-sm text-muted-foreground">
                {t('settings.quizRemindersDesc')}
              </p>
            </div>
            <Switch 
              checked={settings.notifications.quizReminders}
              onCheckedChange={() => handleNotificationToggle('quizReminders')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('settings.achievementBadges')}</p>
              <p className="text-sm text-muted-foreground">
                {t('settings.achievementBadgesDesc')}
              </p>
            </div>
            <Switch 
              checked={settings.notifications.achievementBadges}
              onCheckedChange={() => handleNotificationToggle('achievementBadges')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('settings.communityUpdates')}</p>
              <p className="text-sm text-muted-foreground">
                {t('settings.communityUpdatesDesc')}
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
            {t('settings.server')}
          </CardTitle>
          <CardDescription>{t('settings.serverDesc')}</CardDescription>
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
              <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center border-2 border-border p-2">
                <img 
                  src={new URL('@/assets/flowhive-qr-code.png', import.meta.url).href} 
                  alt="FlowHivee Quick Connect QR Code"
                  className="w-full h-full object-contain"
                />
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
            {t('settings.privacy')}
          </CardTitle>
          <CardDescription>{t('settings.privacyDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('settings.showProgress')}</p>
              <p className="text-sm text-muted-foreground">
                {t('settings.showProgressDesc')}
              </p>
            </div>
            <Switch 
              checked={settings.privacy.showProgress}
              onCheckedChange={() => handlePrivacyToggle('showProgress')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('settings.anonymousCommunity')}</p>
              <p className="text-sm text-muted-foreground">
                {t('settings.anonymousCommunityDesc')}
              </p>
            </div>
            <Switch 
              checked={settings.privacy.anonymousInCommunity}
              onCheckedChange={() => handlePrivacyToggle('anonymousInCommunity')}
            />
          </div>

          <div className="pt-4 border-t">
            <Button variant="destructive" onClick={handleClearData}>
              {t('settings.clearData')}
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              {t('settings.clearDataDesc')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Discrete Admin Access Link */}
      <div className="text-center pt-4">
        <button
          onClick={() => navigate('/admin')}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
        >
          <KeyRound className="w-3 h-3" />
          System Administration
        </button>
      </div>
    </div>
  );
}
