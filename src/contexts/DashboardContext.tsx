import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Donation {
  id: string;
  donor: string;
  amount: number;
  date: string;
  project: string;
  type: 'one-time' | 'recurring';
  status: 'completed' | 'pending' | 'failed';
}

export interface Project {
  id: string;
  name: string;
  budget: number;
  spent: number;
  progress: number;
  status: 'active' | 'completed' | 'on-hold';
  startDate: string;
  endDate: string;
  description: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  project: string;
  status: 'approved' | 'pending' | 'rejected';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  assignee: string;
  dueDate: string;
  project: string;
}

export interface NGORegistration {
  id: string;
  name: string;
  registrationNumber: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  focusArea: string;
  description: string;
  website: string;
  establishedYear: string;
  role: 'NGO';
  date: string;
}

interface DashboardContextType {
  donations: Donation[];
  projects: Project[];
  expenses: Expense[];
  tasks: Task[];
  ngoRegistrations: NGORegistration[];
  updateTask: (id: string, updates: Partial<Task>) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  addDonation: (donation: Omit<Donation, 'id' | 'project' | 'status'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  addNGORegistration: (ngo: Omit<NGORegistration, 'id' | 'role' | 'date'>) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const mockDonations: Donation[] = [
  {
    id: '1',
    donor: 'Tata Foundation',
    amount: 500000,
    date: '2025-01-15',
    project: 'Education for All',
    type: 'one-time',
    status: 'completed'
  },
  {
    id: '2',
    donor: 'Infosys Foundation',
    amount: 250000,
    date: '2025-01-10',
    project: 'Healthcare Initiative',
    type: 'recurring',
    status: 'completed'
  },
  {
    id: '3',
    donor: 'Azim Premji Foundation',
    amount: 750000,
    date: '2025-01-08',
    project: 'Rural Development',
    type: 'one-time',
    status: 'pending'
  }
];

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Education for All',
    budget: 2000000,
    spent: 1200000,
    progress: 65,
    status: 'active',
    startDate: '2024-06-01',
    endDate: '2025-05-31',
    description: 'Providing quality education to underprivileged children across rural India'
  },
  {
    id: '2',
    name: 'Healthcare Initiative',
    budget: 1500000,
    spent: 800000,
    progress: 45,
    status: 'active',
    startDate: '2024-08-01',
    endDate: '2025-07-31',
    description: 'Mobile healthcare units serving remote communities'
  },
  {
    id: '3',
    name: 'Rural Development',
    budget: 3000000,
    spent: 2100000,
    progress: 80,
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    description: 'Infrastructure development and livelihood programs'
  }
];

const mockExpenses: Expense[] = [
  {
    id: '1',
    description: 'Educational materials and supplies',
    amount: 45000,
    category: 'Program Materials',
    date: '2025-01-14',
    project: 'Education for All',
    status: 'approved'
  },
  {
    id: '2',
    description: 'Medical equipment purchase',
    amount: 120000,
    category: 'Equipment',
    date: '2025-01-12',
    project: 'Healthcare Initiative',
    status: 'pending'
  },
  {
    id: '3',
    description: 'Transportation costs',
    amount: 25000,
    category: 'Travel',
    date: '2025-01-10',
    project: 'Rural Development',
    status: 'approved'
  }
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Q1 Impact Report',
    description: 'Compile and analyze data from all active projects for quarterly report',
    priority: 'high',
    status: 'in-progress',
    assignee: 'Priya Sharma',
    dueDate: '2025-01-20',
    project: 'Education for All'
  },
  {
    id: '2',
    title: 'Donor Meeting Preparation',
    description: 'Prepare presentation materials for upcoming donor meeting',
    priority: 'medium',
    status: 'pending',
    assignee: 'Rajesh Kumar',
    dueDate: '2025-01-18',
    project: 'Healthcare Initiative'
  },
  {
    id: '3',
    title: 'Field Survey Completion',
    description: 'Complete beneficiary satisfaction survey in assigned villages',
    priority: 'medium',
    status: 'completed',
    assignee: 'Anita Patel',
    dueDate: '2025-01-15',
    project: 'Rural Development'
  }
];

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [donations, setDonations] = useState<Donation[]>(() => {
    const saved = localStorage.getItem('donations');
    return saved ? JSON.parse(saved) : mockDonations;
  });
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : mockProjects;
  });
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : mockExpenses;
  });
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : mockTasks;
  });
  const [ngoRegistrations, setNgoRegistrations] = useState<NGORegistration[]>(() => {
    const saved = localStorage.getItem('ngoRegistrations');
    return saved ? JSON.parse(saved) : [];
  });

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => {
      const updated = prev.map(task => 
        task.id === id ? { ...task, ...updates } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updated));
      return updated;
    });
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      project: 'General',
      status: 'pending'
    };
    setExpenses(prev => {
      const updated = [newExpense, ...prev];
      localStorage.setItem('expenses', JSON.stringify(updated));
      return updated;
    });
  };

  const addDonation = (donation: Omit<Donation, 'id' | 'project' | 'status'>) => {
    const newDonation: Donation = {
      ...donation,
      id: Date.now().toString(),
      project: 'General Fund',
      status: 'completed'
    };
    setDonations(prev => {
      const updated = [newDonation, ...prev];
      localStorage.setItem('donations', JSON.stringify(updated));
      return updated;
    });
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => {
      const updated = prev.map(project => 
        project.id === id ? { ...project, ...updates } : project
      );
      localStorage.setItem('projects', JSON.stringify(updated));
      return updated;
    });
  };

  const addNGORegistration = (ngo: Omit<NGORegistration, 'id' | 'role' | 'date'>) => {
    const newNGO: NGORegistration = {
      ...ngo,
      id: Date.now().toString(),
      role: 'NGO',
      date: new Date().toISOString().split('T')[0]
    };
    setNgoRegistrations(prev => {
      const updated = [newNGO, ...prev];
      localStorage.setItem('ngoRegistrations', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <DashboardContext.Provider value={{
      donations,
      projects,
      expenses,
      tasks,
      ngoRegistrations,
      updateTask,
      addExpense,
      addDonation,
      updateProject,
      addNGORegistration
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}