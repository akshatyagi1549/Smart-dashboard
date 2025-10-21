import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'staff' | 'leadership' | 'employee';
  avatar?: string;
  profileImage?: string;
  department?: string;
  position?: string;
  phone?: string;
  address?: string;
  organization?: string;
  experience?: string;
  hasCompletedQuestions?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  getAllUsers: () => User[];
  isLoading: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'staff' | 'leadership' | 'employee';
  phone: string;
  address: string;
  organization?: string;
  experience?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getStoredUsers = (): User[] => {
  const stored = localStorage.getItem('ngo_users');
  return stored ? JSON.parse(stored) : [];
};

const storeUsers = (users: User[]) => {
  localStorage.setItem('ngo_users', JSON.stringify(users));
};

const getStoredUser = (): User | null => {
  const stored = localStorage.getItem('ngo_current_user');
  return stored ? JSON.parse(stored) : null;
};

const storeCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem('ngo_current_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('ngo_current_user');
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initializeDemoUsers = () => {
    const users = getStoredUsers();
    if (users.length === 0) {
      const demoUsers: User[] = [
        {
          id: '1',
          name: 'NGO India Staff',
          email: 'staff@ngoindia.org',
          role: 'staff',
          department: 'Program Management',
          position: 'Director',
          phone: '+91 98765 43210',
          address: 'Mumbai, Maharashtra',
          organization: 'NGO India',
          experience: '8 years in social work',
          hasCompletedQuestions: false,
        },
        {
          id: '2',
          name: 'NGO India Leadership',
          email: 'leadership@ngoindia.org',
          role: 'leadership',
          department: 'Executive',
          position: 'Executive Director',
          phone: '+91 98765 43211',
          address: 'Delhi, NCR',
          organization: 'NGO India',
          experience: '12 years in NGO management',
          hasCompletedQuestions: false,
        },
        {
          id: '3',
          name: 'NGO India Employee',
          email: 'employee@ngoindia.org',
          role: 'employee',
          department: 'Field Operations',
          position: 'Employee',
          phone: '+91 98765 43212',
          address: 'Ahmedabad, Gujarat',
          organization: 'NGO India',
          experience: '3 years in field work',
          hasCompletedQuestions: false,
        },
      ];
      storeUsers(demoUsers);
    }
  };

  useEffect(() => {
    initializeDemoUsers();
    const savedUser = getStoredUser();
    if (savedUser) setUser(savedUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();

      if (!result.success) {
        console.error(result.message);
        setIsLoading(false);
        return false;
      }

      const loggedInUser: User = {
        id: Date.now().toString(),
        name: result.name || result.ngoName,
        email: result.email,
        role: result.role || 'staff',
        organization: result.organization || '',
        hasCompletedQuestions: false,
      };

      setUser(loggedInUser);
      storeCurrentUser(loggedInUser);

      const users = getStoredUsers();
      storeUsers([...users, loggedInUser]);

      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          role: userData.role,
          phone: userData.phone,
          address: userData.address,
          organization: userData.role !== 'staff' ? userData.organization : '',
          experience: userData.experience || ''
        }),
      });
      const result = await response.json();

      if (!result.success) {
        console.error(result.message);
        setIsLoading(false);
        return false;
      }

      const savedUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        phone: userData.phone,
        address: userData.address,
        organization: userData.organization || '',
        experience: userData.experience,
        department: userData.role === 'staff' ? 'Program Management' :
                    userData.role === 'leadership' ? 'Executive' : 'Field Operations',
        position: userData.role === 'staff' ? 'Director' :
                  userData.role === 'leadership' ? 'Executive Director' : 'Employee',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
        hasCompletedQuestions: false,
      };

      const users = getStoredUsers();
      storeUsers([...users, savedUser]);

      setUser(savedUser);
      storeCurrentUser(savedUser);

      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    storeCurrentUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    storeCurrentUser(updatedUser);

    const users = getStoredUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = updatedUser;
      storeUsers(users);
    }
  };

  const getAllUsers = (): User[] => {
    return getStoredUsers();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, getAllUsers, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
