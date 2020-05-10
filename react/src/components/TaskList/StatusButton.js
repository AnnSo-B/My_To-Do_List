// npm imports
import React from 'react';
import { Button } from 'react-bootstrap';

// local imports
import './style.css';

// component
const StatusButton = () => (
  <Button variant="success">
    <span className="icon">
      <i className="fa fa-step-backward"></i>
    </span>
  </Button>
);

// Props validation

// export
export default StatusButton;
