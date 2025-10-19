import { ReactNode } from "react";
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
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";
import logoIcon from "@/assets/logo-icon.png";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/grades", icon: GraduationCap, label: "Grades" },
  { to: "/lessons", icon: BookOpen, label: "Lessons" },
  { to: "/notes", icon: FileText, label: "Notes" },
  { to: "/quizzes", icon: Brain, label: "Quizzes" },
  { to: "/progress", icon: TrendingUp, label: "Progress" },
  { to: "/teacher", icon: Users, label: "Teacher" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/community", icon: MessageCircle, label: "Community" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-gradient-hero">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border shadow-soft hidden md:block">
        <div className="sticky top-0 h-screen overflow-y-auto">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <img src={logoIcon} alt="FlowHivee" className="w-10 h-10 animate-float" />
              <div>
                <h1 className="text-xl font-bold bg-gradient-warm bg-clip-text text-transparent">
                  FlowHivee
                </h1>
                <p className="text-xs text-muted-foreground">Learn Anywhere ✨</p>
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
          <div className="flex items-center gap-3">
            <img src={logoIcon} alt="FlowHivee" className="w-8 h-8" />
            <h1 className="text-lg font-bold bg-gradient-warm bg-clip-text text-transparent">
              FlowHivee
            </h1>
          </div>
        </header>

        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-medium z-10">
        <div className="grid grid-cols-6 py-2">
          {[navItems[0], navItems[1], navItems[4], navItems[5], navItems[8], navItems[9]].map((item) => (
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
              <span className="text-xs">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
