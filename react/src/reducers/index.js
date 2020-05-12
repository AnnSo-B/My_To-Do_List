import { combineReducers } from 'redux';
import statusButton from './statusButton';
import taskList from './taskList';
import categoryList from './categoryList';

export default combineReducers({
  statusButton,
  taskList,
  categoryList,
});
