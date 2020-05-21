// npm imports
import { connect } from 'react-redux';

// local imports
import Header from '../components/Header';
import { fetchTaskList } from '../actions';

// state
const mapStateToProps = (state) => ({
  statusFilter: state.taskList.statusFilter,
});

// actions
const mapDispatchToProps = (dispatch) => ({
  fetchTaskList: (status) => {
    dispatch(fetchTaskList(status));
  }
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(Header);
