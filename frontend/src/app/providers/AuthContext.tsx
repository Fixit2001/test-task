import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import Cookies from 'js-cookie';

interface IUser {
  email: string;
  name: string;
  phone: string;
}

interface IAuthContext {
  user: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    phone: string,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const token = data.token;

      Cookies.set('jwt', token, { expires: 7 });
      getCurrentUser(token);
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    phone: string,
  ) => {
    try {
      const response = await fetch(
        'http://localhost:4000/api/v1/users/create-user',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, name, phone }),
        },
      );

      if (!response.ok) {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    Cookies.remove('jwt');
    setUser(null);
  };

  const getCurrentUser = async (token: string) => {
    try {
      const response = await fetch(
        'http://localhost:4000/api/v1/users/current-user',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      setUser(data ?? null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = Cookies.get('jwt');

    if (token) {
      getCurrentUser(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
