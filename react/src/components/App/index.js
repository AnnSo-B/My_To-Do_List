// npm imports
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

// local imports
import Header from 'src/containers/Header';
import AddTaskForm from 'src/containers/AddTaskForm';
import ErrorMessage from 'src/containers/ErrorMessage';
import TaskList from 'src/containers/TaskList';
import './styles.css';

// component
const App = ({
  taskListError,
  categoryListError,
  fetchTaskList,
  fetchCategoryList,
}) => {
  // when the App is launched, retrieve Tasks and Categories data from DB
  useEffect(fetchTaskList, []);
  useEffect(fetchCategoryList, []);

  return (
    <div
      className="app"
    >
      <Header />
      <main>
        <AddTaskForm />
        {
          // if there are errors during data extraction, they are displayed here
          (taskListError
            || categoryListError !== '')
            && <ErrorMessage />
        }
        <TaskList />
      </main>
    </div>
  );
};


// Props validation
App.propTypes = {
  taskListError: PropTypes.string.isRequired,
  categoryListError: PropTypes.string.isRequired,
  fetchTaskList: PropTypes.func.isRequired,
  fetchCategoryList: PropTypes.func.isRequired,
};

// export
export default App;
