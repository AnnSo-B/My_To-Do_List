// npm imports
import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';

// local imports
import TextInput from '../../containers/TextInput';
import StatusButton from '../../containers/StatusButton';

// component
const Task = ({
  // come from TaskList component
  id,
  title,
  completion,
  status,
  category,
  // come from container
  currentEditedTaskId,
  currentEditedTaskTitle,
  statusButtons,
  updateTaskTitle,
}) => {
  // define css class according to status
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
          <form onSubmit={
            // when the form is submitted, we want to prevent the page from refreshing and update the task in the DB
            (event) => {
              event.preventDefault();
              updateTaskTitle();
            }
          }>
            <TextInput
              name="title"
              // when the input is from the task that the user is modifying, we want it to be focused on and take the value of the user's typing
              focusedInput={currentEditedTaskId === id ? true : false}
              value={currentEditedTaskId === id ? currentEditedTaskTitle : title}
              // and then we want to update this task accordingly when the focus is no longer on it
              onInputBlur={() => updateTaskTitle()}
            />
          </form>
          <p className="task__content__p">{title}</p>
        </div>
        <div className="task__content__category">
          <p className="task__content__category__p">{category.name}</p>
        </div>
        <div className="task__content__buttons">
          {
            // for each button that exists in statusButton we'll display a StatusButton component and pass cssClass and icon props to it
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
  // come from TaskList component
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completion: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  // come from container
  currentEditedTaskId: PropTypes.number,
  currentEditedTaskTitle: PropTypes.string.isRequired,
  statusButtons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      cssClass: PropTypes.string,
      variant: PropTypes.string,
      icon: PropTypes.string,
      onClickAction: PropTypes.string,
    })
  ).isRequired,
  updateTaskTitle: PropTypes.func.isRequired,
};

// export
export default Task;
