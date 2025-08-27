import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  FileText, 
  BarChart3, 
  TrendingUp, 
  Calendar,
  BookOpen,
  User
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function StudentPortal() {
  const { user, logout } = useAuth();

  // Mock data for student progress
  const progressData = [
    { week: 'Week 1', score: 75 },
    { week: 'Week 2', score: 82 },
    { week: 'Week 3', score: 78 },
    { week: 'Week 4', score: 88 },
    { week: 'Week 5', score: 92 },
    { week: 'Week 6', score: 95 }
  ];

  // Mock shared notes data
  const sharedNotes = [
    {
      id: 1,
      title: 'Algebra Basics - Chapter 3',
      subject: 'Mathematics',
      date: '2024-01-15',
      size: '2.4 MB'
    },
    {
      id: 2,
      title: 'Physics - Newton\'s Laws',
      subject: 'Physics', 
      date: '2024-01-12',
      size: '1.8 MB'
    },
    {
      id: 3,
      title: 'Chemistry - Atomic Structure',
      subject: 'Chemistry',
      date: '2024-01-10',
      size: '3.1 MB'
    },
    {
      id: 4,
      title: 'Geometry - Triangles & Angles',
      subject: 'Mathematics',
      date: '2024-01-08',
      size: '1.5 MB'
    }
  ];

  const getSubjectColor = (subject: string) => {
    switch (subject.toLowerCase()) {
      case 'mathematics':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'physics':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'chemistry':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const handleDownload = (noteId: number, title: string) => {
    // Mock download functionality
    console.log(`Downloading: ${title}`);
    // In real app, this would trigger the actual file download
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <header className="bg-card shadow-soft border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">TutorFlow</h1>
                <p className="text-sm text-muted-foreground">Student Portal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <Button variant="ghost" onClick={logout} className="text-muted-foreground">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Welcome back, {user?.name?.split(' ')[0]}!
            </h2>
            <p className="text-muted-foreground">
              Track your progress and access your class materials.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Progress Chart */}
            <div className="lg:col-span-2">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Weekly Progress
                  </CardTitle>
                  <CardDescription>
                    Your test scores over the past 6 weeks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={progressData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis 
                          dataKey="week" 
                          className="text-muted-foreground text-xs"
                        />
                        <YAxis 
                          domain={[0, 100]}
                          className="text-muted-foreground text-xs"
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            boxShadow: 'var(--shadow-soft)'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={3}
                          dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-center gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">95%</p>
                      <p className="text-sm text-muted-foreground">Latest Score</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 justify-center">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <p className="text-2xl font-bold text-success">+20%</p>
                      </div>
                      <p className="text-sm text-muted-foreground">Improvement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">12</p>
                        <p className="text-sm text-muted-foreground">Notes Received</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">8</p>
                        <p className="text-sm text-muted-foreground">Tests Completed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Shared Notes */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Shared Notes
              </CardTitle>
              <CardDescription>
                Class materials shared by your tutor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sharedNotes.map((note) => (
                  <div
                    key={note.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-muted/30 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">{note.title}</p>
                        <div className="flex items-center gap-3">
                          <Badge className={getSubjectColor(note.subject)}>
                            {note.subject}
                          </Badge>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{note.date}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{note.size}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(note.id, note.title)}
                      className="hover:bg-primary/5 hover:text-primary"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}