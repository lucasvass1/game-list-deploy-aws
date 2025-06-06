import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  fetchPlataformList,
  PlataformListResponse,
} from '../services/plataform/list';
import { fetchPlataformDelete } from '../services/plataform/delete';
import { useAuth } from './AuthContext';
import { useMutation } from '@tanstack/react-query';
import {
  fetchPlataformCreate,
  PlataformCreateRequest,
} from '../services/plataform/create';
import {
  fetchPlataformUpdate,
  PlataformUpdateRequest,
} from '../services/plataform/update';
import { IPropsErrosRequest } from '../interface/errors-request';

export type PropsSortBy =
  | 'title'
  | 'company'
  | 'acquisitionYear'
  | 'createdAt'
  | 'updatedAt';

export type PropsOrder = 'desc' | 'asc';

interface PlataformsContextType {
  dataPlataforms?: PlataformListResponse;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  handleRemovePlataform: (id: string) => void;
  isLoading: boolean;
  handleUpdatePlatform: ({
    acquisitionYear,
    company,
    id,
    imageUrl,
    title,
  }: PlataformUpdateRequest) => void;
  handleCreatePlatform: ({
    acquisitionYear,
    company,
    imageUrl,
    title,
  }: PlataformCreateRequest) => void;
  setSortBy: React.Dispatch<React.SetStateAction<PropsSortBy | undefined>>;
  setOrder: React.Dispatch<React.SetStateAction<PropsOrder | undefined>>;
}

const PlataformsContext = createContext({} as PlataformsContextType);

interface PlataformsProviderProps {
  children: React.ReactNode;
}

export function PlataformsProvider({ children }: PlataformsProviderProps) {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [data, setData] = useState<PlataformListResponse>();
  const [isLoading] = useState(false);
  const [sortBy, setSortBy] = useState<PropsSortBy>();
  const [order, setOrder] = useState<PropsOrder>();

  const handleClearFilters = () => {
    setPage(1);
  };

  const { mutate: mutateLoadPlatformList } = useMutation({
    mutationFn: fetchPlataformList,
    onSuccess: data => {
      setData(data);
    },
    onError: (error: IPropsErrosRequest) => {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
        return;
      }
      if (error.message) {
        toast.error(error.message);
        return;
      }
      toast.error('Bad Request');
    },
  });

  const { mutate: mutateAddPlataform } = useMutation({
    mutationFn: fetchPlataformCreate,
    onSuccess: () => {
      toast.success('Platform added successfuly!');
      handleClearFilters();
      mutateLoadPlatformList({
        page,
        sortBy,
        order,
      });
    },
    onError: (error: IPropsErrosRequest) => {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
        return;
      }
      if (error.message) {
        toast.error(error.message);
        return;
      }
      toast.error('Bad Request');
    },
  });

  const { mutate: mutateDeletePlatform } = useMutation({
    mutationFn: fetchPlataformDelete,
    onSuccess: () => {
      handleClearFilters();
      mutateLoadPlatformList({
        page,
        sortBy,
        order,
      });
    },
    onError: (error: IPropsErrosRequest) => {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
        return;
      }
      if (error.message) {
        toast.error(error.message);
        return;
      }
      toast.error('Bad Request');
    },
  });
  const { mutate: mutateUpdatePlatform } = useMutation({
    mutationFn: fetchPlataformUpdate,
    onSuccess: () => {
      handleClearFilters();
      mutateLoadPlatformList({
        page,
        sortBy,
        order,
      });
    },
    onError: (error: IPropsErrosRequest) => {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
        return;
      }
      if (error.message) {
        toast.error(error.message);
        return;
      }
      toast.error('Bad Request');
    },
  });

  const handleRemovePlataform = async (id: string) => {
    mutateDeletePlatform({ id });
  };

  const handleUpdatePlatform = ({
    id,
    title,
    company,
    imageUrl,
    acquisitionYear,
  }: PlataformUpdateRequest) => {
    mutateUpdatePlatform({
      id,
      title,
      company,
      imageUrl,
      acquisitionYear,
    });
  };
  const handleCreatePlatform = ({
    title,
    company,
    imageUrl,
    acquisitionYear,
  }: PlataformCreateRequest) => {
    mutateAddPlataform({
      title,
      company,
      imageUrl,
      acquisitionYear,
    });
  };

  useEffect(() => {
    if (user?.id) {
      mutateLoadPlatformList({
        page,
        sortBy,
        order,
      });
    }
  }, [user?.id, page, mutateLoadPlatformList, sortBy, order]);

  return (
    <PlataformsContext.Provider
      value={{
        dataPlataforms: data,
        page,
        setPage,
        handleRemovePlataform,
        handleUpdatePlatform,
        handleCreatePlatform,
        isLoading,
        setSortBy,
        setOrder,
      }}
    >
      {children}
    </PlataformsContext.Provider>
  );
}

export function usePlataforms() {
  return useContext(PlataformsContext);
}
