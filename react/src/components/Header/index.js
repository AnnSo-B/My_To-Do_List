// npm imports
import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, ButtonGroup, Button } from 'react-bootstrap';

// local imports
import './style.css';
import CategoryMenu from '../../containers/CategoryMenu';

// component
const Header = ({
  statusFilter,
  categoryFilter,
  deletableCategory,
  fetchTaskList,
  fetchCategoryWithTasks,
  resetDeletableCategory,
  deleteCategory,
}) => (
  <header className="header">
    <Navbar bg="light" expand="lg" className="p-3">
      <Navbar.Brand className="site-name" href="/">Ma Todolist</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-lg-around">
        {/* Each button launches a task list extraction according to the associated status */}
        <ButtonGroup
          aria-label="Basic example"
          className="my-3"
          onClick={resetDeletableCategory}
        >
          <Button
            variant={statusFilter === 0 && categoryFilter === 0 ? 'primary' : 'light'}
            onClick={() => fetchTaskList({statusFilter: 0, categoryFilter: 0})}
          >
            Toutes
          </Button>
          <Button
            variant={statusFilter === 2 ? 'primary' : 'light'}
            onClick={() => fetchTaskList({statusFilter: 2, categoryFilter: 0})}
          >
            Complètes
          </Button>
          <Button
            variant={statusFilter === 1 ? 'primary' : 'light'}
            onClick={() => fetchTaskList({statusFilter: 1, categoryFilter: 0})}
          >
            Incomplètes
          </Button>
        </ButtonGroup>
        <div
          id="navbar__category-select"
          className="navbar-form-group my-3 selectCategoryMenu"
        >
          <CategoryMenu
            selectedCategory={categoryFilter}
            addTaskMenu={false}
            onCategoryChange={(event) => {
              fetchTaskList({statusFilter: 0, categoryFilter: event.target.value});
              fetchCategoryWithTasks({categoryFilter: event.target.value});
            }}
          />
          {
            deletableCategory
            && (
              <Button
                variant='danger'
                onClick={() => {
                  if (window.confirm('Voulez-vous supprimer cette catégorie ?')) {
                    deleteCategory(categoryFilter);
                  }
                }}
              >
                <span className="icon">
                  <i className='fa fa-trash'></i>
                </span>
              </Button>
            )
          }
        </div>
        <div className="navbar-archive-link my-3" onClick={resetDeletableCategory}>
          {
            // if the current filter is not the archived tasks, we want to display the link "Voir les archives" otherwise we want to display "Revenir à l'affichage..."
            // each link launches an extraction according to the associated status 
            statusFilter !== 3
              ? <button
                  type="button"
                  className="archive-button"
                  onClick={() => fetchTaskList({statusFilter: 3, categoryFilter: 0})}
                >
                    Voir les archives
                  </button>
              : <button
                  type="button"
                  className="archive-button"
                  onClick={() => fetchTaskList({statusFilter: 0, categoryFilter: 0})}
                >
                  Revenir à l'affichage des tâches non archivées
                </button>
          }
        </div>
      </Navbar.Collapse>
    </Navbar>
  </header>
);

// Props validation
Header.propTypes = {
  statusFilter: PropTypes.number.isRequired,
  categoryFilter: PropTypes.number.isRequired,
  deletableCategory: PropTypes.bool.isRequired,
  fetchTaskList: PropTypes.func.isRequired,
  fetchCategoryWithTasks: PropTypes.func.isRequired,
  resetDeletableCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
};

// export
export default Header;
