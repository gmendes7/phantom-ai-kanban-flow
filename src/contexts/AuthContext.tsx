import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  provider?: 'local' | 'google';
}

// Define registered users storage
interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  provider: 'local' | 'google';
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  loginWithGoogle: async () => {},
  register: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  logout: () => {},
});

// Helper functions for user storage
const getStoredUsers = (): RegisteredUser[] => {
  const stored = localStorage.getItem('registeredUsers');
  return stored ? JSON.parse(stored) : [];
};

const saveUser = (user: RegisteredUser) => {
  const users = getStoredUsers();
  const existingIndex = users.findIndex(u => u.email === user.email);
  
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem('registeredUsers', JSON.stringify(users));
};

const findUserByEmail = (email: string): RegisteredUser | null => {
  const users = getStoredUsers();
  return users.find(user => user.email === email) || null;
};

// Create provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check stored users first
      const storedUser = findUserByEmail(email);
      if (storedUser && storedUser.password === password) {
        const userForAuth = { 
          id: storedUser.id, 
          name: storedUser.name, 
          email: storedUser.email,
          provider: storedUser.provider 
        };
        const mockToken = `token-${storedUser.id}`;
        
        setUser(userForAuth);
        setToken(mockToken);
        
        localStorage.setItem('user', JSON.stringify(userForAuth));
        localStorage.setItem('token', mockToken);
        
        toast.success('Login realizado com sucesso!');
        return;
      }
      
      // Fallback to demo credentials
      if (email === 'user@example.com' && password === 'password') {
        const mockUser = { id: '1', name: 'Demo User', email, provider: 'local' as const };
        const mockToken = 'fake-jwt-token';
        
        setUser(mockUser);
        setToken(mockToken);
        
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('token', mockToken);
        
        toast.success('Login realizado com sucesso!');
        return;
      }
      
      throw new Error('Credenciais inválidas');
    } catch (error) {
      toast.error('Falha no login. Verifique suas credenciais.');
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      // Simulate Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock Google user data
      const googleUser = {
        id: `google-${Date.now()}`,
        name: 'Usuário Google',
        email: 'usuario@gmail.com',
        provider: 'google' as const
      };
      
      const mockToken = `google-token-${googleUser.id}`;
      
      // Save Google user to stored users
      const registeredUser: RegisteredUser = {
        ...googleUser,
        password: '', // Google users don't have passwords
      };
      saveUser(registeredUser);
      
      setUser(googleUser);
      setToken(mockToken);
      
      localStorage.setItem('user', JSON.stringify(googleUser));
      localStorage.setItem('token', mockToken);
      
      toast.success('Login com Google realizado com sucesso!');
    } catch (error) {
      toast.error('Falha no login com Google. Tente novamente.');
      throw error;
    }
  };
  
  const register = async (name: string, email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = findUserByEmail(email);
      if (existingUser) {
        throw new Error('Usuário já existe com este email');
      }
      
      // Create new user
      const newUser: RegisteredUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        password,
        provider: 'local'
      };
      
      // Save user to storage
      saveUser(newUser);
      
      // Auto login after registration
      const userForAuth = { 
        id: newUser.id, 
        name: newUser.name, 
        email: newUser.email,
        provider: newUser.provider 
      };
      const mockToken = `token-${newUser.id}`;
      
      setUser(userForAuth);
      setToken(mockToken);
      
      localStorage.setItem('user', JSON.stringify(userForAuth));
      localStorage.setItem('token', mockToken);
      
      toast.success('Cadastro realizado com sucesso!');
    } catch (error) {
      if (error instanceof Error && error.message === 'Usuário já existe com este email') {
        toast.error('Já existe uma conta com este email.');
      } else {
        toast.error('Falha no cadastro. Tente novamente.');
      }
      throw error;
    }
  };
  
  const forgotPassword = async (email: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would send a reset password email
      toast.success('Password reset instructions sent to your email.');
    } catch (error) {
      toast.error('Failed to send reset instructions. Please try again.');
      throw error;
    }
  };
  
  const resetPassword = async (token: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would verify the token and update the password
      toast.success('Password has been reset successfully.');
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
      throw error;
    }
  };
  
  const logout = () => {
    // Clear user from state
    setUser(null);
    setToken(null);
    
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    toast.info('Você foi desconectado.');
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        loginWithGoogle,
        register,
        forgotPassword,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
