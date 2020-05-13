// npm imports
import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';

// local imports
import TaskTitleInput from '../../containers/TaskTitleInput';
import StatusButton from '../../containers/StatusButton';

// component
const Task = ({ id, title, completion, status, category, statusButtons }) => {
  // define class according to status
  let statusClass = '';
  switch (status) {
    case 2:
      statusClass = 'task--done';
      break;
    case 3:
      statusClass = 'task--archive';
      break;
    case 4:
      statusClass = 'task--edit';
      break;
    default: 
      statusClass = 'task--todo'; // status 1
  };

  return (
    <article id={id} className={`task ${statusClass}`}>
      <div className="task__content">
        <div className="task__content__title">
          <TaskTitleInput />
          <p className="task__content__p">{title}</p>
        </div>
        <div className="task__content__category">
          <p className="task__content__category__p">{category.name}</p>
        </div>
        <div className="task__content__buttons">
          {
            statusButtons.map((button) => (
              <StatusButton key={button.id} {...button} />
            ))
          }
        </div>
      </div>
      <ProgressBar now={completion} />
    </article>
  )
};

// Props validation
Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completion: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  statusButtons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      cssClass: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// export
export default Task;
