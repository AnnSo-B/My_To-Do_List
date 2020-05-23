// npm imports
import { connect } from 'react-redux';

// local imports
import Task from '../components/TaskList/Task';
import { taskUpdate } from '../actions';

// state
const mapStateToProps = (state) => ({
  currentEditedTaskId: state.taskList.task.id,
  currentEditedTaskTitle: state.taskList.task.title,
  statusButtons: state.statusButton.buttons,
});

// actions
const mapDispatchToProps = (dispatch) => ({
  updateTaskTitle: () => {
    dispatch(taskUpdate());
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(Task);
