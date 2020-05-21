// npm imports
import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, ButtonGroup, Button } from 'react-bootstrap';

// local imports
import './style.css';
import CategoryMenu from '../../containers/CategoryMenu';

// component
const Header = ({ statusFilter, fetchTaskList }) => (
  <header className="header">
    <Navbar bg="light" expand="lg" className="p-3">
      <Navbar.Brand className="site-name" href="/">Ma Todolist</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-lg-around">
        <ButtonGroup aria-label="Basic example" className="my-3">
          <Button
            variant={statusFilter === 0 ? 'primary' : 'light'}
            onClick={() => fetchTaskList(0)}
          >
            Toutes
          </Button>
          <Button
            variant={statusFilter === 2 ? 'primary' : 'light'}
            onClick={() => fetchTaskList(2)}
          >
            Complètes
          </Button>
          <Button
            variant={statusFilter === 1 ? 'primary' : 'light'}
            onClick={() => fetchTaskList(1)}
          >
            Incomplètes
          </Button>
        </ButtonGroup>
        <div
          id="navbar__category-select"
          className="navbar-form-group my-3 selectCategoryMenu"
        >
          <CategoryMenu />
        </div>
        <div className="navbar-archive-link my-3">
            <a href="#">Voir les archives</a>
        </div>
      </Navbar.Collapse>
    </Navbar>
  </header>
);

// Props validation
Header.propTypes = {
  statusFilter: PropTypes.number.isRequired,
  fetchTaskList: PropTypes.func.isRequired,
};

// export
export default Header;
