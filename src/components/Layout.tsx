import { ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  Home, 
  GraduationCap,
  BookOpen, 
  FileText, 
  Brain, 
  TrendingUp, 
  Users, 
  Wifi, 
  BarChart3, 
  MessageCircle, 
  Settings,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import logoIcon from "@/assets/logo-icon.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { to: "/", icon: Home, label: t('nav.home') },
    { to: "/grades", icon: GraduationCap, label: t('nav.grades') },
    { to: "/lessons", icon: BookOpen, label: t('nav.lessons') },
    { to: "/notes", icon: FileText, label: t('nav.notes') },
    { to: "/quizzes", icon: Brain, label: t('nav.quizzes') },
    { to: "/progress", icon: TrendingUp, label: t('nav.progress') },
    { to: "/teacher", icon: Users, label: t('nav.teacher') },
    { to: "/analytics", icon: BarChart3, label: t('nav.analytics') },
    { to: "/community", icon: MessageCircle, label: t('nav.community') },
    { to: "/settings", icon: Settings, label: t('nav.settings') },
  ];
  return (
    <div className="flex min-h-screen bg-gradient-hero">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border shadow-soft hidden md:block">
        <div className="sticky top-0 h-screen overflow-y-auto">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <img src={logoIcon} alt={t('app.name')} className="w-10 h-10 animate-float" />
              <div>
                <h1 className="text-xl font-bold bg-gradient-warm bg-clip-text text-transparent">
                  {t('app.name')}
                </h1>
                <p className="text-xs text-muted-foreground">{t('app.tagline')}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Connection Status */}
          <div className="p-4 m-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center gap-2 text-success">
              <Wifi className="w-4 h-4 animate-pulse-glow" />
              <span className="text-sm font-medium">Connected to FlowHivee LAN</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <header className="md:hidden bg-card border-b border-border px-4 py-3 sticky top-0 z-10 shadow-soft">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logoIcon} alt={t('app.name')} className="w-8 h-8" />
              <h1 className="text-lg font-bold bg-gradient-warm bg-clip-text text-transparent">
                {t('app.name')}
              </h1>
            </div>
            
            {/* Mobile Menu Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-card">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-3">
                    <img src={logoIcon} alt={t('app.name')} className="w-8 h-8" />
                    <span>{t('nav.menu')}</span>
                  </SheetTitle>
                </SheetHeader>
                
                <nav className="mt-6 space-y-1">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-soft"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  ))}
                </nav>
                
                {/* Connection Status */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center gap-2 text-success">
                    <Wifi className="w-4 h-4 animate-pulse-glow" />
                    <span className="text-sm font-medium">Connected to FlowHivee LAN</span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-medium z-10">
        <div className="grid grid-cols-5 py-2">
          {[navItems[0], navItems[1], navItems[2], navItems[4]].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-all",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs truncate">{item.label}</span>
            </NavLink>
          ))}
          
          {/* More Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-all text-muted-foreground">
                <Menu className="w-5 h-5" />
                <span className="text-xs">{t('nav.more')}</span>
              </button>
            </SheetTrigger>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}
