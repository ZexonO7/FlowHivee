import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Sparkles, UserPlus, LogIn, QrCode, Users, Shield } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";
import { switchStudentAccount } from "@/lib/settings-storage";
import { useToast } from "@/hooks/use-toast";

interface StartScreenProps {
  onComplete: () => void;
}

export function StartScreen({ onComplete }: StartScreenProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [loginStudentId, setLoginStudentId] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const { toast } = useToast();

  // Check for QR code login on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qrStudentId = params.get('studentId');
    if (qrStudentId) {
      // Auto-login with QR code
      switchStudentAccount(qrStudentId.trim());
      toast({
        title: "QR Code Login! 🎉",
        description: "Welcome back! Your account has been loaded.",
      });
      // Clear the URL parameter
      window.history.replaceState({}, '', window.location.pathname);
      setIsAnimating(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  }, [onComplete, toast]);

  const handleNewStudent = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to continue",
        variant: "destructive",
      });
      return;
    }

    const newStudentId = studentId.trim() || `STU-2024-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    
    switchStudentAccount(newStudentId, name.trim());
    
    toast({
      title: "Account Created! 🎉",
      description: `Your Student ID is: ${newStudentId}. Save it to access your account on other devices!`,
      duration: 7000,
    });
    
    setIsAnimating(true);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  const handleExistingStudent = () => {
    if (!loginStudentId.trim()) {
      toast({
        title: "Student ID required",
        description: "Please enter your Student ID to continue",
        variant: "destructive",
      });
      return;
    }

    // Check if student data exists
    const studentData = localStorage.getItem(`${loginStudentId.trim()}_flowhivee_lessons`);
    
    switchStudentAccount(loginStudentId.trim());
    
    if (studentData) {
      toast({
        title: "Welcome back! 👋",
        description: "Your progress has been loaded",
      });
    } else {
      toast({
        title: "Account loaded",
        description: "This Student ID will now track your progress",
      });
    }
    
    setIsAnimating(true);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!teacherName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (teacherPassword === "FlowHive@123") {
      sessionStorage.setItem("teacher_authenticated", "true");
      sessionStorage.setItem("teacher_name", teacherName.trim());
      // Mark start screen as completed so the app doesn't send you back here
      localStorage.setItem("completed_start_screen", "true");
      toast({
        title: `Welcome to Teacher Portal, ${teacherName.trim()}! 👨‍🏫`,
        description: "You have successfully logged in",
      });
      setIsAnimating(true);
      setTimeout(() => {
        onComplete();
        window.location.href = "/teacher";
      }, 500);
    } else {
      toast({
        title: "Incorrect password",
        description: "Please try again",
        variant: "destructive",
      });
      setTeacherPassword("");
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-radial flex items-center justify-center p-6 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
      <Card className="w-full max-w-2xl shadow-glow border-0 bg-card/95 backdrop-blur">
        <CardContent className="p-8 md:p-12 space-y-8">
          {/* Logo */}
          <div className="flex justify-center animate-float">
            <div className="p-6 bg-primary/10 rounded-3xl">
              <img src={logoIcon} alt="FlowHive" className="w-24 h-24" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3 text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-warm bg-clip-text text-transparent animate-slide-up">
              Welcome to FlowHive
            </h1>
            <p className="text-lg text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Your Personal Learning Journey Starts Here 🚀
            </p>
          </div>

          {/* Login/Signup Tabs */}
          <Tabs defaultValue="new" className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="new">
                <UserPlus className="w-4 h-4 mr-2" />
                New Student
              </TabsTrigger>
              <TabsTrigger value="existing">
                <LogIn className="w-4 h-4 mr-2" />
                Existing Student
              </TabsTrigger>
              <TabsTrigger value="teacher">
                <Users className="w-4 h-4 mr-2" />
                Teacher
              </TabsTrigger>
            </TabsList>

            <TabsContent value="new" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Create Your Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={100}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Custom Student ID (Optional)</Label>
                    <Input
                      id="studentId"
                      placeholder="Leave blank to auto-generate"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      maxLength={50}
                    />
                    <p className="text-xs text-muted-foreground">
                      If left blank, we'll generate one for you (e.g., STU-2024-1234)
                    </p>
                  </div>

                  <Button
                    className="w-full"
                    variant="warm"
                    onClick={handleNewStudent}
                  >
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="existing" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Access Your Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loginStudentId">Student ID *</Label>
                    <Input
                      id="loginStudentId"
                      placeholder="Enter your Student ID"
                      value={loginStudentId}
                      onChange={(e) => setLoginStudentId(e.target.value)}
                      maxLength={50}
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter the Student ID you received when creating your account
                    </p>
                  </div>

                  <Button
                    className="w-full"
                    variant="warm"
                    onClick={handleExistingStudent}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Continue Learning
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or scan QR code
                      </span>
                    </div>
                  </div>

                  <div className="text-center p-6 bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/25">
                    <QrCode className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Scan a FlowHive QR code to instantly log in
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="teacher" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Teacher Portal Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTeacherLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="teacherName">Your Name *</Label>
                      <Input
                        id="teacherName"
                        placeholder="Enter your name"
                        value={teacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                        maxLength={100}
                        autoFocus
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="teacherPassword">Password *</Label>
                      <Input
                        id="teacherPassword"
                        type="password"
                        placeholder="Enter teacher password"
                        value={teacherPassword}
                        onChange={(e) => setTeacherPassword(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Access the teacher dashboard to monitor student progress
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      variant="warm"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Access Teacher Portal
                    </Button>
                  </form>

                  <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg mt-1">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Teacher Features</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Monitor all student progress</li>
                          <li>• Access detailed analytics</li>
                          <li>• Complete training modules</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-4 text-left animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg mt-1">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Personalized Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    Track progress and learn at your own pace
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/10">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-secondary/10 rounded-lg mt-1">
                  <Sparkles className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Cross-Device Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Use your Student ID to access your account anywhere
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
