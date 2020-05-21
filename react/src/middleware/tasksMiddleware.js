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
  NEW_TASK_SUBMISSION,
  newTaskSubmissionSuccess,
  newTaskSubmissionError,
} from '../actions';
import { apiURL } from '../app.config';

// middleware de test
export default (store) => (next) => (action) => {
  let id = null;

  switch (action.type) {
    case FETCH_TASK_LIST: 
      // by default, we fetch all the tasks
      let requestGoesTo = `${apiURL}tasks`;
      let status = 0;

      // if we have a status, we only fetch the tasks according to this status
      if (action.payload !== 0 && action.payload !== '') {
        requestGoesTo = `${apiURL}tasks/status/${action.payload}`;
        status = action.payload;
      }

      axios.get(requestGoesTo)
      .then((response) => {
        // send data to the store via fetchTaskListSuccess action creator
        store.dispatch(fetchTaskListSuccess({taskList: response.data, status}));
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
          title: action.payload.title,
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
    case NEW_TASK_SUBMISSION: 
      axios.post(
        `${apiURL}tasks`,
        {
          title: store.getState().taskList.task.title,
          categoryId: store.getState().taskList.task.categoryId,
        }
      )
      .then((response) => {
        store.dispatch(newTaskSubmissionSuccess(response.data));
      })
      .catch(() => {
        store.dispatch(newTaskSubmissionError('Une erreur est survenue lors de la tentative d\'ajout de la tâche.'))
      });
      break;
    default: 
      next(action);
  }

};
