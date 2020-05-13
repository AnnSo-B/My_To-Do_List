// npm imports
import { connect } from 'react-redux';

// local imports
import Task from '../components/TaskList/Task';
import { taskUpdate } from '../actions';

// state
const mapStateToProps = (state) => ({
  currentEditedTaskTitle: state.taskList.taskToEdit.title,
  statusButtons: state.statusButton.buttons,
});

// actions
const mapDispatchToProps = (dispatch) => ({
  updateTaskTitle: (taskId, title) => {
    dispatch(taskUpdate({taskId, title}));
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(Task);
