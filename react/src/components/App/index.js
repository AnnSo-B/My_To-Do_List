// npm imports
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

// local imports
import Header from 'src/components/Header';
import AddTaskForm from 'src/components/AddTaskForm';
import TaskList from 'src/containers/TaskList';
import './styles.css';

// component
const App = ({ fetchTaskList }) => {
  useEffect(fetchTaskList, []);

  return (
    <div className="app">
      <Header />
      <main>
        <AddTaskForm />
        <TaskList />
      </main>
    </div>
  );
};


// Props validation
App.propTypes = {
  fetchTaskList: PropTypes.func.isRequired,
};

// export
export default App;
