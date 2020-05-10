// npm imports

// local imports
import { FETCH_TASK_LIST_SUCCESS } from '../actions';

// state
const initialState = {
  taskList: [
    {
      "id": 0,
      "title": "",
      "completion": 0,
      "status": 1,
      "created_at": "",
      "updated_at": "",
      "category_id": 0,
      "category": {
        "id": 0,
        "name": "",
        "status": 1,
        "created_at": "",
        "updated_at": null
      }
    },
  ]
};

// reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_TASK_LIST_SUCCESS: 
      return {
        ...state,
        taskList: action.payload,
      }
    default: 
      return state;
  }
};
