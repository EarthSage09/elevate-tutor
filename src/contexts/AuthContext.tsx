import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'tutor' | 'student';
  tutorId?: string; // For students, reference to their tutor
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
  joinWithCode: (code: string, name: string, email: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const mockUsers: User[] = [
  {
    id: 'tutor-1',
    name: 'Alex Johnson',
    email: 'alex@tutorflow.com',
    role: 'tutor'
  },
  {
    id: 'student-1', 
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    role: 'student',
    tutorId: 'tutor-1'
  },
  {
    id: 'student-2',
    name: 'Tom Wilson',
    email: 'tom@example.com', 
    role: 'student',
    tutorId: 'tutor-1'
  }
];

// Mock room codes
const mockRoomCodes: Record<string, string> = {
  'MATH101': 'tutor-1',
  'SCI202': 'tutor-1'
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth state
    const storedUser = localStorage.getItem('tutorflow-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Mock authentication delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('tutorflow-user', JSON.stringify(foundUser));
      setIsLoading(false);
      return { success: true };
    }
    
    setIsLoading(false);
    return { success: false, error: 'Invalid email or password' };
  };

  const joinWithCode = async (code: string, name: string, email: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Mock join delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const tutorId = mockRoomCodes[code.toUpperCase()];
    
    if (tutorId) {
      const newStudent: User = {
        id: `student-${Date.now()}`,
        name,
        email,
        role: 'student',
        tutorId
      };
      
      setUser(newStudent);
      localStorage.setItem('tutorflow-user', JSON.stringify(newStudent));
      setIsLoading(false);
      return { success: true };
    }
    
    setIsLoading(false);
    return { success: false, error: 'Invalid room code' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tutorflow-user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoading,
      joinWithCode
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}