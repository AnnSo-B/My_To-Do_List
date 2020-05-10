// npm imports
import { connect } from 'react-redux';

// local imports
import StatusButton from '../components/TaskList/StatusButton';

// state
const mapStateToProps = null;

// actions
const mapDispatchToProps = (dispatch) => ({
  validateTask: () => {
    console.log('validateTask');
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(StatusButton);
