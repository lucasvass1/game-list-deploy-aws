import React, { useCallback, useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { getUser, removeUser, saveUser } from '../storage/storageUser.ts';
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '../storage/storageAuthToken.ts';
import { api } from '../services/api.ts';
import { useMutation } from '@tanstack/react-query';
import { login } from '../services/users/login/index.tsx';
import { toast } from 'react-toastify';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

type AuthContextType = {
  user: User;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isLoadingUserStorageData: boolean;
};

const AuthContext = createContext({} as AuthContextType);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);
  const { mutate: mutateUserLogin } = useMutation({
    mutationFn: login,
    onSuccess: data => {
      toast.success('Login successful!');
      storageUserAndTokenSave(data.user, data.token);
      setUser(data.user);
    },
    onError: error => {
      if (error.message) {
        toast.error(`auth: ${error.message}`);
        return;
      }
      toast.error('Bad Request');
    },
  });

  async function signOut() {
    setUser({} as User);
    removeUser();
    storageAuthTokenRemove();
    window.location.replace('/login');
  }

  async function storageUserAndTokenSave(userData: any, token: string) {
    try {
      setIsLoadingUserStorageData(true);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      saveUser(userData);
      storageAuthTokenSave({ token });
      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function userAndTokenUpdate(userData: any, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setUser(userData);
  }

  async function signIn(email: string, password: string) {
    mutateUserLogin({ email, password });
  }

  const loadUserData = useCallback(async () => {
    setIsLoadingUserStorageData(true);
    try {
      const userLogged = await getUser();
      const { token } = await storageAuthTokenGet();

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }, []);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  return (
    <AuthContext.Provider
      value={{ user, signOut, signIn, isLoadingUserStorageData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
