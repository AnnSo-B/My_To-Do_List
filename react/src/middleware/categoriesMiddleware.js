// npm import
import axios from 'axios';

// local import
import {
  FETCH_CATEGORY_LIST,
  fetchCategoryListSuccess,
  fetchCategoryListError
} from '../actions';
import { apiURL } from '../app.config';

// middleware
export default (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_CATEGORY_LIST: 
      axios.get(`${apiURL}/categories`)
      .then((response) => {
        // send data to the store via fetchCategoryListSuccess action creator
        store.dispatch(fetchCategoryListSuccess(response.data));
      })
      .catch(() => {
        // send an error to display in case of failure
        store.dispatch(fetchCategoryListError('Une erreur est survenue au chargement de la liste des catégories.'));
      });
      break;
    default: 
      next(action);
  }

};
