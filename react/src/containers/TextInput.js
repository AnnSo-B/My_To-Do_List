// npm imports
import { connect } from 'react-redux';

// local imports
import TextInput from '../components/TextInput';
import { changeTaskTitle, changeCategoryName } from '../actions';

// state
const mapStateToProps = null;

// actions
const mapDispatchToProps = (dispatch) => ({
  onInputChange: (inputName, inputValue) => {
    // if the input that is change is the task title, we have to change the task title
    if (inputName === 'title') {
      dispatch(changeTaskTitle(inputValue));
    }
    // if the input that is change is the category name, we have to change the category name
    else if (inputName === 'name') {
      dispatch(changeCategoryName(inputValue));
    }
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(TextInput);
