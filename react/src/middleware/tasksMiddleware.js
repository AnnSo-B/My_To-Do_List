// npm import
import axios from 'axios';

// local import
import { FETCH_TASK_LIST } from '../actions';
import { apiURL } from '../app.config';

// middleware de test
export default (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_TASK_LIST: 
      axios.get(`${apiURL}/tasks`)
      .then((response) => {
        console.log(response.data);
      })
      break;
    default: 
      next(action);
  }

};
