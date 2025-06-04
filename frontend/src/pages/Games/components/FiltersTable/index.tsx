import React, { useState } from 'react';
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
} from './styles';
import { IoIosSearch } from 'react-icons/io';
import { useGetCategoryList } from '../../../../services/category/list';
import { useAuth } from '../../../../context/AuthContext';
import { useGames } from '../../../../context/GamesContext';

// interface IFiltersTableProps {}

export const FiltersTable = () => {
  const { user } = useAuth();
  const [isShowModalAddGame, setIsShowModalAddGame] = useState<boolean>(false);
  const { data: dataCategoryList } = useGetCategoryList(
    !!user?.id,
    1,
    10000000,
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

  return (
    <>
      <AddNewGameButton onClick={() => setIsShowModalAddGame(true)}>
        Add new game
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

          <SelectInput
            name="Select Category"
            value={categorySelected}
            onChange={e => setCategorySelected(e.target.value)}
          >
            <option value="" disabled selected>
              Select category
            </option>
            {dataCategoryList?.categories?.map(category => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </SelectInput>

          <ContainerRow>
            <CheckFavorite
              id="favorite"
              type="checkbox"
              onChange={() => setIsFavorite(oldState => !oldState)}
              checked={isFavorite}
            />
            <label htmlFor="favorite">Favorite</label>
          </ContainerRow>
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
