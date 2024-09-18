import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export const MainMenu = () => {
  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <NavLink to='/'>
          <h1>Книга контактов</h1>
        </NavLink>
        <Nav className='me-auto'>
          <NavLink style={{ margin: '0 1rem' }} to='/groups'>
            Группы
          </NavLink>
          <NavLink to='/favorit'>Избранное</NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};
