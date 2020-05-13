// npm imports
import { createStore, compose, applyMiddleware } from 'redux';

// local imports
import rootReducer from 'src/reducers';
import tasksMiddleware from '../middleware/tasksMiddleware';
import categoriesMiddleware from '../middleware/categoriesMiddleware';

// enhancers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    tasksMiddleware,
    categoriesMiddleware,
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
