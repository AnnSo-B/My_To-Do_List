// npm imports
import React from 'react';
import PropTypes from 'prop-types';

// local imports
import Task from '../../containers/Task';

// component
const TaskList = ({ taskList }) => (
  <section id="taskList-container">
    {
      taskList.map((task) => (
        <Task key={task.id} {...task} />
      ))
    }
  </section>
);

// Props validation
TaskList.propTypes = {
  taskList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completion: PropTypes.number.isRequired,
      status: PropTypes.number.isRequired,
      category: PropTypes.shape({
        name: PropTypes.string.isRequired
      }
      ).isRequired,
    })
  ).isRequired,
};

// export
export default TaskList;
