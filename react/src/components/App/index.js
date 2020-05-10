// npm imports
import React from 'react';

// local imports
import TestButton from 'src/containers/TestButton';
import reactLogo from './react-logo.svg';
import './styles.css';

// component
const App = () => (
  <div className="app">
    <h1 className="app__title">React Template</h1>
    <img src={reactLogo} alt="react logo" />
    <TestButton />
  </div>
);

// export
export default App;
