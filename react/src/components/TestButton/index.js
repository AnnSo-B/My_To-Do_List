// npm imports
import React from 'react';
import PropTypes from 'prop-types';

// local imports
import './style.css';

// component
const Test = ({ testMiddleware }) => (
  <button className="test-button" type="button" onClick={testMiddleware}>
    Test du middleware
  </button>
);

// Props validation
Test.propTypes = {
  testMiddleware: PropTypes.func.isRequired,
};

// export
export default Test;
