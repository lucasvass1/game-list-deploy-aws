import React, { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  fetchGamesList,
  GamesListObjectResponse,
} from '../services/games/list/index.ts';
import { useAuth } from './AuthContext.tsx';
import { useDebounce } from '../hooks/useDebounce.ts';
import { fetchGameToggleFavorite } from '../services/games/toggleFavorite/index.ts';
import {
  fetchGameCreate,
  GameCreateRequest,
} from '../services/games/create/index.ts';
import { fetchGameDelete } from '../services/games/delete/index.ts';
import {
  fetchGameUpdate,
  GameUpdateRequest,
} from '../services/games/update/index.ts';
import { PropsOrder } from './PlataformsContext.tsx';
import { IPropsErrosRequest } from '../interface/errors-request.ts';

export type PropsSortBy =
  | 'title'
  | 'description'
  | 'category'
  | 'createdAt'
  | 'updatedAt';

type GamesContextType = {
  dataGems?: GamesListObjectResponse;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  categorySelected?: string;
  setCategorySelected: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleClearFilters: () => void;
  isFavorite?: boolean;
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  handleToggleFavorite: (id: string) => void;
  handleCreateGame: ({
    description,
    status,
    title,
    categoryId,
    endDate,
    imageUrl,
    isFavorite,
    plataformId,
  }: GameCreateRequest) => void;
  handleUpdateGame: ({
    id,
    description,
    status,
    title,
    categoryId,
    endDate,
    imageUrl,
    isFavorite,
    plataformId,
  }: GameUpdateRequest) => void;
  handleRemoveGame: (id: string) => void;
  setSortBy: React.Dispatch<React.SetStateAction<PropsSortBy | undefined>>;
  setOrder: React.Dispatch<React.SetStateAction<PropsOrder | undefined>>;
};

const GamesContext = createContext({} as GamesContextType);

interface GamesProviderProps {
  children: React.ReactNode;
}

export function GamesProvider({ children }: GamesProviderProps) {
  const { user } = useAuth();
  const [dataGems, setDataGems] = useState<GamesListObjectResponse>();
  const [search, setSearch] = useState<string>('');
  const [categorySelected, setCategorySelected] = useState<string>();
  const [page, setPage] = useState(1);
  const [isFavorite, setIsFavorite] = useState<undefined | boolean>(undefined);
  const debounceSearchInput = useDebounce(search, 2000);
  const [sortBy, setSortBy] = useState<PropsSortBy>();
  const [order, setOrder] = useState<PropsOrder>();

  const handleClearFilters = () => {
    setSearch('');
    setPage(1);
    setCategorySelected('');
  };

  const { mutate: mutateToggleFavorite } = useMutation({
    mutationFn: fetchGameToggleFavorite,
  });
  const { mutate: mutateAddGame } = useMutation({
    mutationFn: fetchGameCreate,
    onSuccess: () => {
      toast.success('Game added successfully!');
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
  const { mutate: mutateUpdateGame } = useMutation({
    mutationFn: fetchGameUpdate,
    onSuccess: () => {
      toast.success('Game added successfully!');
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
  const { mutate: mutateDeleteGame } = useMutation({
    mutationFn: fetchGameDelete,
    onSuccess: () => {
      toast.success('Game remove successfully!');
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

  const { mutate: mutateLoadGamesList } = useMutation({
    mutationFn: fetchGamesList,
    onSuccess: data => {
      setDataGems(data);
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

  const handleToggleFavorite = (id: string) => {
    setDataGems(prev => {
      if (!prev) return prev;

      const updatedGames = prev.games.map(game => {
        if (game.id === id) {
          return {
            ...game,
            isFavorite: !game.isFavorite,
          };
        }
        return game;
      });

      return {
        ...prev,
        games: updatedGames,
      };
    });

    mutateToggleFavorite({
      id,
    });
  };

  const handleCreateGame = ({
    title,
    description,
    categoryId,
    plataformId,
    imageUrl,
    endDate,
    status,
    isFavorite,
  }: GameCreateRequest) => {
    mutateAddGame({
      title,
      description,
      categoryId,
      plataformId,
      imageUrl,
      endDate,
      status,
      isFavorite,
    });
  };

  const handleRemoveGame = (id: string) => {
    mutateDeleteGame({
      id,
    });
  };
  const handleUpdateGame = ({
    id,
    title,
    description,
    categoryId,
    plataformId,
    imageUrl,
    endDate,
    status,
    isFavorite,
  }: GameUpdateRequest) => {
    mutateUpdateGame({
      id,
      categoryId,
      description,
      endDate,
      imageUrl,
      isFavorite,
      plataformId,
      status,
      title,
    });
  };

  useEffect(() => {
    if (user?.id) {
      const body: {
        search?: string;
        category?: string;
        favorite?: boolean;
        sortBy?: PropsSortBy;
        order?: PropsOrder;
      } = {};
      if (debounceSearchInput?.length) body.search = debounceSearchInput;
      if (categorySelected?.length) body.category = categorySelected;
      if (isFavorite) body.favorite = true;
      if (sortBy) body.sortBy = sortBy;
      if (order) body.order = order;
      mutateLoadGamesList(body);
    }
  }, [
    user,
    debounceSearchInput,
    mutateLoadGamesList,
    categorySelected,
    isFavorite,
    sortBy,
    order,
  ]);

  return (
    <GamesContext.Provider
      value={{
        dataGems,
        search,
        setSearch,
        page,
        setPage,
        handleClearFilters,
        categorySelected,
        setCategorySelected,
        setIsFavorite,
        isFavorite,
        handleToggleFavorite,
        handleCreateGame,
        handleRemoveGame,
        handleUpdateGame,
        setSortBy,
        setOrder,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
}

export function useGames() {
  return useContext(GamesContext);
}
