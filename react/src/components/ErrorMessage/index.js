// npm imports
import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

// local imports

// component
const ErrorMessage = ({ taskListError, categoryListError }) => (
  <>
    {
      taskListError
        && (
          <Alert
            key={taskListError}
            variant="danger"
            className="my-3"
          >
            {taskListError}
          </Alert>
        )
    }
    {
      categoryListError
        && (
          <Alert
            key={categoryListError}
            variant="danger"
            className="my-3"
          >
            {categoryListError}
          </Alert>
        )
    }
  </>
);

// Props validation
ErrorMessage.propTypes = {
  taskListError: PropTypes.string,
  categoryListError: PropTypes.string,
};

// export
export default ErrorMessage;
