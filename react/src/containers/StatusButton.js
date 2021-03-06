// npm imports
import { connect } from 'react-redux';

// local imports
import StatusButton from '../components/TaskList/StatusButton';
import { taskUpdate, taskDeletion, taskEdit } from '../actions';

// state
const mapStateToProps = null;

// actions
const mapDispatchToProps = (dispatch) => ({
  // depending on the action, the task is updated according to the indicated parameters
  validateTask: (action, taskId) => {
    dispatch(taskUpdate({action, taskId, completion: 100, status: 2}));
  },
  undoTask: (action, taskId) => {
    dispatch(taskUpdate({action, taskId, completion: 0, status: 1}));
  },
  archiveTask: (action, taskId) => {
    dispatch(taskUpdate({action, taskId, status: 3}));
  },
  desarchiveTask: (action, taskId) => {
    dispatch(taskUpdate({action, taskId, status: 2}));
  },
  // to delete or edit a task, we only need its id
  deleteTask: (action, taskId) => {
    dispatch(taskDeletion({action, taskId}));
  },
  // to edit a task, we also need the changes that have been made to it but they have been saved in the state proprety "task"
  editTask: (action, taskId) => {
    dispatch(taskEdit({action, taskId}));
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(StatusButton);
