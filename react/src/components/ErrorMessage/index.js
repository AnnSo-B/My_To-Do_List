// npm imports
import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

// local imports

// component
const ErrorMessage = ({ error }) => (
  <Alert key={1} variant="danger">
    {error}
  </Alert>
);

// Props validation
ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
};

// export
export default ErrorMessage;
