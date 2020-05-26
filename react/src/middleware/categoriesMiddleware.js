// npm import
import axios from 'axios';

// local import
import {
  FETCH_CATEGORY_LIST,
  fetchCategoryList,
  fetchCategoryListSuccess,
  fetchCategoryListError,
  SUBMIT_NEW_CATEGORY,
  submitNewCategoryError,
  changeNewTaskCategory,
} from '../actions';
import { apiURL } from '../app.config';

// middleware
export default (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_CATEGORY_LIST: 
      axios.get(`${apiURL}/categories`)
        .then((response) => {
          // send data to the store via fetchCategoryListSuccess action creator
          store.dispatch(fetchCategoryListSuccess({
            categoryList: response.data,
            newCategoryId: action.payload.newCategoryId ? action.payload.newCategoryId : 0,
          }));
        })
        .catch(() => {
          // send an error to display in case of failure
          store.dispatch(fetchCategoryListError('Une erreur est survenue au chargement de la liste des catégories.'));
        });
      break;
    case SUBMIT_NEW_CATEGORY:
      axios.post(
        `${apiURL}categories`,
          {
            name: store.getState().categoryList.category.name,
          }
        )
        .then((response) => {
          store.dispatch(fetchCategoryList({newCategoryId: parseInt(response.data.id)}));
        })
        .catch(() => {
          store.dispatch(submitNewCategoryError('Une erreur est survenue lors de la création de cette catégorie. Merci de réessayer ultérieurement.'))
        })
      break;
    default: 
      next(action);
  }

};
