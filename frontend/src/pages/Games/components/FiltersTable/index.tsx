import React, { useEffect, useState } from 'react';
import {
  AddNewGameButton,
  CheckFavorite,
  ClearButton,
  Container,
  ContainerButtons,
  ContainerRow,
  SearchButton,
  SearchInput,
  SelectInput,
  Title,
  CategoryFavoriteWrapper,
} from './styles';
import { IoIosSearch } from 'react-icons/io';
import { useGetCategoryList } from '../../../../services/category/list';
import { useAuth } from '../../../../context/AuthContext';
import { useGames } from '../../../../context/GamesContext';
import Modal from '../../../../components/Modal/Modal.tsx';
import { StatusGames } from '../../../../services/games/create/index.ts';
import { useLocation } from 'react-router-dom';

export const FiltersTable = () => {
  const { user } = useAuth();
  const location = useLocation();
  const create = location.search === '?create=true';
  const [isShowModalAddGame, setIsShowModalAddGame] = useState<boolean>(false);

  const { data: dataCategoryList } = useGetCategoryList(
    !!user?.id,
    1,
    10000000
  );

  const {
    setSearch,
    search,
    handleClearFilters,
    categorySelected,
    setCategorySelected,
    setIsFavorite,
    isFavorite,
    handleCreateGame,
  } = useGames();

  useEffect(() => {
    if (create) setIsShowModalAddGame(true);
  }, [create, location.pathname]);

  return (
    <>
      <Modal
        isOpen={isShowModalAddGame}
        onClose={() => setIsShowModalAddGame(false)}
        title="New Game"
        buttonTitle="CREATE"
        onSave={(formData) =>
          handleCreateGame({
            description: formData?.description,
            status: formData?.status as StatusGames,
            title: formData?.title,
            categoryId: formData?.category,
            endDate: formData?.finishDate,
            imageUrl: formData?.imageUrl,
            isFavorite: formData?.favorite,
            plataformId: formData?.platform,
          })
        }
        isFavorite={true}
        isDates={true}
        isCategoryRow={true}
        isStatus={true}
        isUrl={true}
        isGameTitle={true}
        isDescription={true}
      />

      <AddNewGameButton onClick={() => setIsShowModalAddGame(true)}>
        New Game
      </AddNewGameButton>

      <Container>
        <ContainerRow>
          <Title>Filters</Title>

          <SearchInput
            placeholder="Search"
            type="text"
            name="search"
            id="search"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />

          
          <CategoryFavoriteWrapper>
            <SelectInput
              name="Select Category"
              value={categorySelected}
              onChange={(e) => setCategorySelected(e.target.value)}
            >
              <option value="" disabled selected>
                Select category
              </option>
              {dataCategoryList?.categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </SelectInput>

            <ContainerRow>
              <CheckFavorite
                id="favorite"
                type="checkbox"
                onChange={() => setIsFavorite((oldState) => !oldState)}
                checked={isFavorite}
              />
              <label htmlFor="favorite">Favorite</label>
            </ContainerRow>
          </CategoryFavoriteWrapper>
        </ContainerRow>

        <ContainerButtons>
          <ClearButton onClick={handleClearFilters}>Clear</ClearButton>
          <SearchButton>
            Search <IoIosSearch size={16} />
          </SearchButton>
        </ContainerButtons>
      </Container>
    </>
  );
};
