// npm imports
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

// local imports
import './style.css';

// component
const Test = ({ testMiddleware }) => (
  <Button className="test-button" type="button" onClick={testMiddleware}>
    Test du middleware
  </Button>
);

// Props validation
Test.propTypes = {
  testMiddleware: PropTypes.func.isRequired,
};

// export
export default Test;
