// npm imports
import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';

// local imports
import TaskTitleInput from '../TaskTitleInput';
import StatusButton from './StatusButton';

// component
const Task = ({ statusButtons }) => (
  <article className="task task--todo">
    <div className="task__content">
      <div className="task__content__title">
        <TaskTitleInput value="Acheter les billets d'avion" />
        <p className="task__content__p">Acheter les billets d'avion</p>
      </div>
      <div className="task__content__category">
        <p className="task__content__category__p">Vacances</p>
      </div>
      <div className="task__content__buttons">
        {
          statusButtons.map((button) => (
            <StatusButton key={button.id} {...button} />
          ))
        }
      </div>
    </div>
    <ProgressBar now={25} />
  </article>
);

// Props validation
Task.propTypes = {
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
