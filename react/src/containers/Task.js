// npm imports
import { connect } from 'react-redux';

// local imports
import Task from '../components/TaskList/Task';

// state
const mapStateToProps = (state) => ({
  statusButtons: state.statusButton.buttons,
});

// actions
const mapDispatchToProps = {};

// export
export default connect(mapStateToProps, mapDispatchToProps)(Task);