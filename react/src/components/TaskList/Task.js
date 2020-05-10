// npm imports
import React from 'react';
import { ProgressBar } from 'react-bootstrap';

// local imports
import TaskTitleInput from '../TaskTitleInput';
import StatusButton from './StatusButton';

// component
const Task = () => (
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
        <StatusButton />
        <StatusButton />
        <StatusButton />
      </div>
    </div>
    <ProgressBar now={25} />
  </article>
);

// Props validation

// export
export default Task;
