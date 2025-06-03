import React from 'react';
import {
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

interface IFiltersTableProps {}

export const FiltersTable = ({}: IFiltersTableProps) => {
  return (
    <Container>
      <ContainerRow>
        <Title>Filters</Title>
        <SearchInput placeholder="Search" />

        <SelectInput name="Select Category">
          <option value="" disabled>
            Select category
          </option>
          <option value="all">All</option>
          <option value="action">Action</option>
        </SelectInput>

        <ContainerRow>
          <CheckFavorite id="favorite" />
          <label htmlFor="favorite">Favorite</label>
        </ContainerRow>
      </ContainerRow>

      <ContainerButtons>
        <ClearButton>Clear</ClearButton>
        <SearchButton>
          Search <IoIosSearch size={16} />
        </SearchButton>
      </ContainerButtons>
    </Container>
  );
};
