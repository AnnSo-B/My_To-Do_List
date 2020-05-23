// npm imports
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

// local imports
import './style.css';

// component
const StatusButton = ({
  // come from Task component
  cssClass,
  variant,
  icon,
  onClickAction,
  // come from container
  validateTask,
  undoTask,
  archiveTask,
  desarchiveTask,
  deleteTask,
  editTask,
}) => {
  // depending on the button, we'll dispatch different action with different parameters
  let actionToDispatch = '';
  switch (onClickAction) {
    case 'validateTask':
      actionToDispatch = validateTask;
      break;
    case 'undoTask':
      actionToDispatch = undoTask;
      break;
    case 'archiveTask':
      actionToDispatch = archiveTask;
      break;
    case 'desarchiveTask':
      actionToDispatch = desarchiveTask;
      break;
    case 'deleteTask':
      actionToDispatch = deleteTask;
      break;
    case 'editTask':
      actionToDispatch = editTask;
      break;
  };

  return (
    <Button
      className={cssClass}
      variant={variant}
      onClick={
        // for all actions, we need to know which task the user is updating with its id
        (event) => actionToDispatch(event.currentTarget.closest('.task').id)
      }
    >
      <span className="icon">
        <i className={`fa ${icon}`}></i>
      </span>
    </Button>
  );
};

// Props validation
StatusButton.propTypes = {
  // come from Task component
  cssClass: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClickAction: PropTypes.string.isRequired,
  // come from container
  validateTask: PropTypes.func.isRequired,
  undoTask: PropTypes.func.isRequired,
  archiveTask: PropTypes.func.isRequired,
  desarchiveTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
}

// export
export default StatusButton;
