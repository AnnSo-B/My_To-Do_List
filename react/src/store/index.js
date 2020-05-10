// npm imports
import { createStore, compose, applyMiddleware } from 'redux';

// local imports
import rootReducer from 'src/reducers';
import tasksMiddleware from '../middleware/tasksMiddleware';

// enhancers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    tasksMiddleware,
  ),
);

// store
const store = createStore(
  rootReducer,
  // preloadedState,
  enhancers,
);

// export
export default store;
