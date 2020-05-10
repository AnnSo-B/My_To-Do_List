// npm imports
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// local imports
import Header from 'src/components/Header';
import AddTaskForm from 'src/components/AddTaskForm';
import TaskList from 'src/containers/TaskList';
import './styles.css';
import { useEffect } from 'react';

// component
const App = () => (
  <div className="app">
    <Header />
    <main>
      <AddTaskForm />
      <TaskList />
    </main>
  </div>
);

// export
export default App;
