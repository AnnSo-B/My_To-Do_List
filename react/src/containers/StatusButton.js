// npm imports
import { connect } from 'react-redux';

// local imports
import StatusButton from '../components/TaskList/StatusButton';
import { taskUpdate } from '../actions';

// state
const mapStateToProps = null;

// actions
const mapDispatchToProps = (dispatch) => ({
  validateTask: (taskId) => {
    dispatch(taskUpdate({taskId, completion: 100, status: 2}));
  },
  undoTask: (taskId) => {
    console.log('undoTask id', taskId);

  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(StatusButton);
