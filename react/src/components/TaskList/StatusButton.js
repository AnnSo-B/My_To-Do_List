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
  validateTask
}) => {
  let actionToDispatch = '';
  switch (onClickAction) {
    case 'validateTask':
      actionToDispatch = validateTask;
  };

  return (
    <Button
      className={cssClass}
      variant={variant}
      onClick={() => actionToDispatch()}
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
}

// export
export default StatusButton;
