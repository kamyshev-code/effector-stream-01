import { Input, Button } from 'antd';
import { styled } from '@linaria/react';
import { useStore, useGate } from 'effector-react';

import {
  $search,
  searchButtonClicked,
  searchChanged,
  SearchFormGate,
} from './search';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 64px;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
`;

const Header = styled.h1``;

export function SearchForm() {
  useGate(SearchFormGate);
  const search = useStore($search);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchButtonClicked();
  };

  return (
    <Container>
      <Header>Поиск дешевых авиабилетов</Header>
      <Form onSubmit={handleSearch}>
        <Input
          type="search"
          value={search}
          onChange={(e) => searchChanged(e.target.value)}
        />
        <Button htmlType="submit">Искать!</Button>
      </Form>
    </Container>
  );
}
