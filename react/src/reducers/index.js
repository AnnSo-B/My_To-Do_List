import { combineReducers } from 'redux';
import statusButton from './statusButton';
import taskList from './taskList';

export default combineReducers({
  statusButton,
  taskList,
});
