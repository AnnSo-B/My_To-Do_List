// npm imports
import { connect } from 'react-redux';

// local imports
import TaskTitleInput from '../components/TaskTitleInput';
import { changeTaskTitle } from '../actions';

// state
const mapStateToProps = null;

// actions
const mapDispatchToProps = (dispatch) => ({
  onInputChange: (title) => {
    console.log(title);
    dispatch(changeTaskTitle(title));
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(TaskTitleInput);
