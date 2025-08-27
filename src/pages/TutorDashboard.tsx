import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  BarChart3, 
  TrendingUp, 
  Calendar,
  Clock,
  BookOpen,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TutorDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Active Students',
      value: '12',
      change: '+2 this month',
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Notes Shared',
      value: '24',
      change: '+8 this week',
      icon: FileText,
      color: 'text-accent'
    },
    {
      title: 'Tests Analyzed',
      value: '45',
      change: '+12 this week',
      icon: BarChart3,
      color: 'text-success'
    },
    {
      title: 'Avg Score',
      value: '87%',
      change: '+5% improvement',
      icon: TrendingUp,
      color: 'text-warning'
    }
  ];

  const recentActivity = [
    {
      type: 'note',
      title: 'Algebra Basics - Chapter 3',
      time: '2 hours ago',
      students: 8
    },
    {
      type: 'analysis',
      title: 'Math Quiz - Sarah Chen',
      time: '4 hours ago',
      score: 92
    },
    {
      type: 'note',
      title: 'Physics - Newton\'s Laws',
      time: '1 day ago',
      students: 6
    },
    {
      type: 'analysis',
      title: 'Science Test - Tom Wilson',
      time: '2 days ago',
      score: 78
    }
  ];

  const quickActions = [
    {
      title: 'Share New Notes',
      description: 'Upload and share class materials',
      icon: FileText,
      action: () => navigate('/tutor/class-sync'),
      color: 'bg-gradient-primary'
    },
    {
      title: 'Analyze Test',
      description: 'AI-powered test analysis',
      icon: BookOpen,
      action: () => navigate('/tutor/test-analysis'),
      color: 'bg-gradient-accent'
    },
    {
      title: 'Check Lagging Areas',
      description: 'Identify common problem areas',
      icon: AlertCircle,
      action: () => navigate('/tutor/lagging-areas'),
      color: 'bg-gradient-subtle border border-border'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your students.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="shadow-soft hover:shadow-medium transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.change}</p>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted/30 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Get started with common tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.title}
                    onClick={action.action}
                    className="w-full p-4 rounded-lg border border-border hover:shadow-soft transition-all duration-200 text-left group"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${action.color} group-hover:scale-110 transition-transform duration-200`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {action.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Your latest uploads and analyses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${
                    item.type === 'note' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
                  }`}>
                    {item.type === 'note' ? (
                      <FileText className="w-4 h-4" />
                    ) : (
                      <BarChart3 className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">{item.time}</p>
                      {item.students && (
                        <Badge variant="secondary" className="text-xs">
                          {item.students} students
                        </Badge>
                      )}
                      {item.score && (
                        <Badge 
                          variant={item.score >= 90 ? "default" : item.score >= 75 ? "secondary" : "destructive"}
                          className="text-xs"
                        >
                          {item.score}%
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t border-border">
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => navigate('/tutor/students')}
                >
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}