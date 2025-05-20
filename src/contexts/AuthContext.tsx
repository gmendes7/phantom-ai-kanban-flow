
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
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
  register: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  logout: () => {},
});

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

  // For demo purposes, we'll use localStorage to simulate JWT
  // In a real app, you'd verify the token with your API
  
  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      // In a real app, you would make an actual API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials (mock validation)
      if (email === 'user@example.com' && password === 'password') {
        const mockUser = { id: '1', name: 'Demo User', email };
        const mockToken = 'fake-jwt-token';
        
        // Store in state
        setUser(mockUser);
        setToken(mockToken);
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('token', mockToken);
        
        toast.success('Logged in successfully!');
        return;
      }
      
      throw new Error('Invalid credentials');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      throw error;
    }
  };
  
  const register = async (name: string, email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would send registration data to your API
      const mockUser = { id: '1', name, email };
      const mockToken = 'fake-jwt-token';
      
      // Store in state
      setUser(mockUser);
      setToken(mockToken);
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', mockToken);
      
      toast.success('Registration successful!');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
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
    
    toast.info('You have been logged out.');
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
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
