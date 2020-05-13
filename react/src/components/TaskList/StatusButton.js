// npm imports
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

// local imports
import './style.css';

// component
const StatusButton = ({
  cssClass,
  variant,
  icon,
  onClickAction,
  validateTask,
  undoTask,
  archiveTask,
  desarchiveTask,
}) => {
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
  };

  return (
    <Button
      className={cssClass}
      variant={variant}
      onClick={
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
  cssClass: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClickAction: PropTypes.string.isRequired,
  validateTask: PropTypes.string.isRequired,
  undoTask: PropTypes.string.isRequired,
  archiveTask: PropTypes.string.isRequired,
  desarchiveTask: PropTypes.string.isRequired,
}

// export
export default StatusButton;
