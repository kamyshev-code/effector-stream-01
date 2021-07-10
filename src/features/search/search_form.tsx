import { Input, Button } from 'antd';
import { styled } from '@linaria/react';

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
  return (
    <Container>
      <Header>Поиск дешевых авиабилетов</Header>
      <Form>
        <Input type="search" />
        <Button>Искать!</Button>
      </Form>
    </Container>
  );
}
