// npm imports
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

// local imports
import Header from 'src/components/Header';
import AddTaskForm from 'src/containers/AddTaskForm';
import ErrorMessage from 'src/containers/ErrorMessage';
import TaskList from 'src/containers/TaskList';
import './styles.css';

// component
const App = ({ taskListError, categoryListError, fetchTaskList, fetchCategoryList }) => {
  useEffect(fetchTaskList, []);
  useEffect(fetchCategoryList, []);

  return (
    <div className="app">
      <Header />
      <main>
        {
          (taskListError
            || categoryListError !== '')
            && <ErrorMessage />
        }
        <AddTaskForm />
        <TaskList />
      </main>
    </div>
  );
};


// Props validation
App.propTypes = {
  error: PropTypes.string,
  fetchTaskList: PropTypes.func.isRequired,
  fetchCategoryList: PropTypes.func.isRequired,
};

// export
export default App;
