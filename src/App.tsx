import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { TutorSidebar } from "@/components/TutorSidebar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TutorDashboard from "./pages/TutorDashboard";
import StudentPortal from "./pages/StudentPortal";

const queryClient = new QueryClient();

// Protected route wrapper for tutors
function TutorLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user || user.role !== 'tutor') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex w-full bg-background">
      <TutorSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

// Protected route wrapper for students
function StudentLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user || user.role !== 'student') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

// Auth guard component
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-surface">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Index />;
  }

  // Redirect based on user role
  if (user.role === 'tutor') {
    return <Navigate to="/tutor" replace />;
  } else {
    return <Navigate to="/student" replace />;
  }
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthGuard><Index /></AuthGuard>} />
            
            {/* Tutor Routes */}
            <Route path="/tutor" element={
              <TutorLayout>
                <TutorDashboard />
              </TutorLayout>
            } />
            <Route path="/tutor/class-sync" element={
              <TutorLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Class Sync - Coming Soon</h1>
                  <p className="text-muted-foreground">Upload and share class notes with students.</p>
                </div>
              </TutorLayout>
            } />
            <Route path="/tutor/test-analysis" element={
              <TutorLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Test Analysis - Coming Soon</h1>
                  <p className="text-muted-foreground">AI-powered test sheet analysis.</p>
                </div>
              </TutorLayout>
            } />
            <Route path="/tutor/lagging-areas" element={
              <TutorLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Lagging Areas - Coming Soon</h1>
                  <p className="text-muted-foreground">Identify common problem areas across students.</p>
                </div>
              </TutorLayout>
            } />
            <Route path="/tutor/students" element={
              <TutorLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Student Management - Coming Soon</h1>
                  <p className="text-muted-foreground">Manage your student roster and generate room codes.</p>
                </div>
              </TutorLayout>
            } />
            <Route path="/tutor/settings" element={
              <TutorLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Settings - Coming Soon</h1>
                  <p className="text-muted-foreground">Update your account settings and preferences.</p>
                </div>
              </TutorLayout>
            } />

            {/* Student Routes */}
            <Route path="/student" element={
              <StudentLayout>
                <StudentPortal />
              </StudentLayout>
            } />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
