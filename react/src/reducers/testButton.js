// npm imports

// local imports
import { TEST_MIDDLEWARE } from '../actions';

// state
const initialState = {
  propriety: 'initial propriety',
};

// reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case TEST_MIDDLEWARE:
      return {
        propriety: 'after action propriety',
      };
    default:
      return state;
  }
};
