// npm imports
import { connect } from 'react-redux';

// local imports
import TaskTitleInput from '../components/TaskTitleInput';

// state
const mapStateToProps = (state) => ({
  value: state.taskList.currentTaskTitle,
});

// actions
const mapDispatchToProps = {};

// export
export default connect(mapStateToProps, mapDispatchToProps)(TaskTitleInput);
