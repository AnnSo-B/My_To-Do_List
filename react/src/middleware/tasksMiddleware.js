// npm import
import axios from 'axios';

// local import
import {
  FETCH_TASK_LIST,
  fetchTaskListSuccess,
  fetchTaskListError,
  TASK_UPDATE,
  taskUpdateSuccess,
  taskUpdateError,
  TASK_DELETION,
  taskDeletionSuccess,
  taskDeletionError,
} from '../actions';
import { apiURL } from '../app.config';

// middleware de test
export default (store) => (next) => (action) => {
  let id = null;

  switch (action.type) {
    case FETCH_TASK_LIST: 
      axios.get(`${apiURL}tasks`)
      .then((response) => {
        // send data to the store via fetchTaskListSuccess action creator
        store.dispatch(fetchTaskListSuccess(response.data));
      })
      .catch(() => {
        store.dispatch(fetchTaskListError('Une erreur est survenue au chargement de la liste des tâches.'));
      });
      break;
    case TASK_UPDATE:
      id = parseInt(action.payload.taskId);
      axios.put(
        `${apiURL}tasks/${id}`,
        {
          completion: action.payload.completion,
          status: action.payload.status,
        }
      )
      .then((response) => {
        // send the task with its changes to update the state
        store.dispatch(taskUpdateSuccess(response.data));
      })
      .catch(() => {
          // send an error message if task can't be updated
          store.dispatch(taskUpdateError('Une erreur est survenue lors de la mise à jour de la tâche.'));
      });
      break;
    case TASK_DELETION: 
      id = parseInt(action.payload.taskId);
      axios.delete(
        `${apiURL}tasks/${id}`,
      )
      .then(() => {
        store.dispatch(taskDeletionSuccess(id));
      })
      .catch(() => {
        store.dispatch(taskDeletionError('Une erreur est survenue lors de la tentative de suppression de la tâche.'))
      });
      break;   
    default: 
      next(action);
  }

};
