import React, { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext.tsx';
import { useDebounce } from '../hooks/useDebounce.ts';
import {
  fetchCategoryCreate,
  CategoryCreateRequest,
} from '../services/category/create/index.ts';
import { fetchCategoryDelete } from '../services/category/delete/index.ts';
import {
  fetchCategoryUpdate,
  CategoryUpdateRequest,
} from '../services/category/update/index.ts';
import { fetchCategoryList } from '../services/category/list/index.ts';
import { CategoryListResponse } from '../services/category/list/index.ts';
import { IPropsErrosRequest } from '../interface/errors-request.ts';
import { PropsOrder } from './PlataformsContext.tsx';

export type PropsSortBy = 'title' | 'description' | 'createdAt' | 'updatedAt';

type CategoriesContextType = {
  dataCategories?: CategoryListResponse;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  categorySelected?: string;
  setCategorySelected: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleClearFilters: () => void;
  handleCreateCategory: ({ title, description }: CategoryCreateRequest) => void;
  handleUpdateCategory: ({
    id,
    title,
    description,
  }: CategoryUpdateRequest) => void;
  handleRemoveCategory: (id: string) => void;
  setSortBy: React.Dispatch<React.SetStateAction<PropsSortBy | undefined>>;
  setOrder: React.Dispatch<React.SetStateAction<PropsOrder | undefined>>;
};

const CategoriesContext = createContext({} as CategoriesContextType);

interface CategoriesProviderProps {
  children: React.ReactNode;
}

export function CategoriesProvider({ children }: CategoriesProviderProps) {
  const { user } = useAuth();
  const [dataCategories, setDataCategories] = useState<CategoryListResponse>();
  const [search, setSearch] = useState<string>('');
  const [categorySelected, setCategorySelected] = useState<string>();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<PropsSortBy>();
  const [order, setOrder] = useState<PropsOrder>();
  const debounceSearchInput = useDebounce(search, 2000);

  const handleClearFilters = () => {
    setSearch('');
    setPage(1);
    setCategorySelected('');
  };

  const { mutate: mutateAddCategory } = useMutation({
    mutationFn: fetchCategoryCreate,
    onSuccess: () => {
      toast.success('Category added successfully!');
      mutateLoadCategoriesList({
        page,
      });
      handleClearFilters();
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
  const { mutate: mutateUpdateCategory } = useMutation({
    mutationFn: fetchCategoryUpdate,
    onSuccess: () => {
      toast.success('Category updated successfully!');
      mutateLoadCategoriesList({
        page,
      });
      handleClearFilters();
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
  const { mutate: mutateDeleteCategory } = useMutation({
    mutationFn: fetchCategoryDelete,
    onSuccess: () => {
      toast.success('Category remove successfully!');
      mutateLoadCategoriesList({
        page,
      });
      handleClearFilters();
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

  const { mutate: mutateLoadCategoriesList } = useMutation({
    mutationFn: fetchCategoryList,

    onSuccess: data => {
      setDataCategories(data);
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

  useEffect(() => {
    if (user?.id) {
      mutateLoadCategoriesList({
        page,
        sortBy,
        order,
      });
    }
  }, [mutateLoadCategoriesList, page, user?.id, order, sortBy]);

  const handleCreateCategory = ({
    title,
    description,
  }: CategoryCreateRequest) => {
    mutateAddCategory({
      title,
      description,
    });
  };

  const handleRemoveCategory = (id: string) => {
    mutateDeleteCategory({
      id,
    });
  };
  const handleUpdateCategory = ({
    id,
    title,
    description,
  }: CategoryUpdateRequest) => {
    mutateUpdateCategory({
      id,
      title,
      description,
    });
  };

  return (
    <CategoriesContext.Provider
      value={{
        search,
        setSearch,
        page,
        setPage,
        handleClearFilters,
        categorySelected,
        setCategorySelected,
        handleCreateCategory,
        handleRemoveCategory,
        handleUpdateCategory,
        dataCategories,
        setOrder,
        setSortBy,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoriesContext);
}
