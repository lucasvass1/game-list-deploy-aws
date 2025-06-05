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
      handleClearFilters();
    },
    onError: error => {
      console.log('error', error);
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
      handleClearFilters();
    },
    onError: error => {
      console.log('error', error);
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
      handleClearFilters();
    },
    onError: error => {
      console.log('error', error);
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
    onError: error => {
      console.log('error', error);
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
      });
    }
  }, [mutateLoadCategoriesList, page, user?.id]);

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
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoriesContext);
}
