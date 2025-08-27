import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  FileText, 
  BarChart3, 
  TrendingDown, 
  Settings,
  LogOut,
  GraduationCap,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  { title: "Dashboard", url: "/tutor", icon: BarChart3 },
  { title: "Class Sync", url: "/tutor/class-sync", icon: FileText },
  { title: "Test Analysis", url: "/tutor/test-analysis", icon: BookOpen },
  { title: "Lagging Areas", url: "/tutor/lagging-areas", icon: TrendingDown },
  { title: "Students", url: "/tutor/students", icon: Users },
  { title: "Settings", url: "/tutor/settings", icon: Settings },
];

export function TutorSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-50 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 lg:relative lg:z-auto",
        isCollapsed ? "-translate-x-full lg:translate-x-0 lg:w-16" : "w-64"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className={cn(
            "flex items-center gap-3 transition-opacity duration-200",
            isCollapsed && "lg:opacity-0"
          )}>
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-sidebar-foreground">TutorFlow</h1>
              <p className="text-xs text-sidebar-foreground/60">Tutor Dashboard</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent lg:hidden"
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-sidebar-border">
          <div className={cn(
            "flex items-center gap-3 transition-opacity duration-200",
            isCollapsed && "lg:opacity-0"
          )}>
            <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.name}
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.url);
              
              return (
                <button
                  key={item.title}
                  onClick={() => {
                    navigate(item.url);
                    setIsCollapsed(true);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group",
                    active 
                      ? "bg-sidebar-accent text-sidebar-primary font-medium shadow-soft" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  <Icon className={cn(
                    "w-5 h-5 transition-colors duration-200",
                    active ? "text-sidebar-primary" : "text-sidebar-foreground/70"
                  )} />
                  <span className={cn(
                    "transition-opacity duration-200",
                    isCollapsed && "lg:opacity-0"
                  )}>
                    {item.title}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200",
              "text-sidebar-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20"
            )}
          >
            <LogOut className="w-5 h-5" />
            <span className={cn(
              "transition-opacity duration-200",
              isCollapsed && "lg:opacity-0"
            )}>
              Logout
            </span>
          </button>
        </div>

        {/* Collapse Button (Desktop) */}
        <div className="hidden lg:block absolute -right-4 top-8">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-8 h-8 rounded-full shadow-medium"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  );
}