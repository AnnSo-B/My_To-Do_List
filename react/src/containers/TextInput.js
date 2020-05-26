// npm imports
import { connect } from 'react-redux';

// local imports
import TextInput from '../components/TextInput';
import { changeTaskTitle } from '../actions';

// state
const mapStateToProps = null;

// actions
const mapDispatchToProps = (dispatch) => ({
  onInputChange: (title) => {
    dispatch(changeTaskTitle(title));
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(TextInput);
