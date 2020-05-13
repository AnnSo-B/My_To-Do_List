// npm import
import axios from 'axios';

// local import
import {
  FETCH_TASK_LIST,
  fetchTaskListSuccess,
  fetchTaskListError,
  TASK_UPDATE,
  taskUpdateSuccess,
} from '../actions';
import { apiURL } from '../app.config';

// middleware de test
export default (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_TASK_LIST: 
      axios.get(`${apiURL}tasks`)
      .then((response) => {
        // send data to the store via fetchTaskListSuccess action creator
        store.dispatch(fetchTaskListSuccess(response.data));
      })
      .catch(() => {
        store.dispatch(fetchTaskListError('Une erreur est survenue au chargement de la liste des tâches'));
      });
      break;
    case TASK_UPDATE: {
      console.log('middleware', action.payload);
      const id = parseInt(action.payload.taskId);
      axios.put(
        `${apiURL}tasks/${id}`,
        {
          completion: action.payload.completion,
          status: action.payload.status,
        }
      )
      .then(function (response) {
        // send the task with its changes to update the state
        store.dispatch(taskUpdateSuccess(response.data));
      })

    }
    default: 
      next(action);
  }

};
