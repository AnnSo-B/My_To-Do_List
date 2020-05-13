// npm imports
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';


// local imports
import App from 'src/containers/App';
import store from 'src/store';


// render
const rootComponent = (
  <Provider store={store}>
    <App />
  </Provider>
);
const target = document.getElementById('root');
render(rootComponent, target);
