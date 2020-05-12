// npm imports
import { connect } from 'react-redux';

// local imports
import StatusButton from '../components/TaskList/StatusButton';
import { fetchTaskUpdate } from '../actions';

// state
const mapStateToProps = null;

// actions
const mapDispatchToProps = (dispatch) => ({
  validateTask: (taskId) => {
    console.log('validateTask id', taskId);
    dispatch(fetchTaskUpdate({taskId}));
    // TODO --> changer le status de la tâche en  BDD et l'afficher après modif dans le DOM
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(StatusButton);
