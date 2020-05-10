// npm import
import axios from 'axios';

// local import
import { FETCH_TASK_LIST, fetchTaskListSuccess } from '../actions';
import { apiURL } from '../app.config';

// middleware de test
export default (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_TASK_LIST: 
      axios.get(`${apiURL}/tasks`)
      .then((response) => {
        // send data to the store via fetchTaskListSuccess action creator
        store.dispatch(fetchTaskListSuccess(response.data))
      })
      .catch((error) => {
        console.log(error);
      });
      break;
    default: 
      next(action);
  }

};
