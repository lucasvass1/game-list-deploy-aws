import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useGetPlataformList } from '../services/plataform/list';
import { fetchPlataformDelete } from '../services/plataform/delete';
import { useAuth } from './AuthContext';

interface PlataformsContextType {
  dataPlataforms?: any;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  handleRemovePlataform: (id: string) => void;
  isLoading: boolean;
}

const PlataformsContext = createContext({} as PlataformsContextType);

interface PlataformsProviderProps {
  children: React.ReactNode;
}

export function PlataformsProvider({ children }: PlataformsProviderProps) {
  const { user } = useAuth();
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useGetPlataformList(!!user?.id, page, 10);

  const handleRemovePlataform = async (id: string) => {
    try {
      await fetchPlataformDelete({ id });
      toast.success('Plataforma removida com sucesso!');
      refetch();
    } catch (error: any) {
      console.error('Erro ao deletar plataforma:', error);
      toast.error(error.message || 'Erro ao deletar plataforma');
    }
  };

  return (
    <PlataformsContext.Provider
      value={{
        dataPlataforms: data,
        page,
        setPage,
        handleRemovePlataform,
        isLoading,
      }}
    >
      {children}
    </PlataformsContext.Provider>
  );
}

export function usePlataforms() {
  return useContext(PlataformsContext);
}
