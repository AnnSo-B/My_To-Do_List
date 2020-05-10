// npm imports
import React from 'react';
import { Navbar, ButtonGroup, Button } from 'react-bootstrap';

// local imports
import './style.css';
import CategoryMenu from '../CategoryMenu';

// component
const Header = () => (
  <header className="header">
    <Navbar bg="light" expand="lg" className="p-3">
      <Navbar.Brand className="site-name" href="/">Ma Todolist</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-lg-around">
        <ButtonGroup aria-label="Basic example" className="my-3">
          <Button variant="primary">Toutes</Button>
          <Button variant="light">Complètes</Button>
          <Button variant="light">Incomplètes</Button>
        </ButtonGroup>
        <CategoryMenu />
          <div className="navbar-archive-link my-3">
              <a href="#">Voir les archives</a>
          </div>
      </Navbar.Collapse>
    </Navbar>
  </header>
);

// Props validation

// export
export default Header;
