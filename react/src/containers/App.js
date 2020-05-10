// npm imports
import { connect } from 'react-redux';

// local imports
import App from '../components/App';

// state
const mapStateToProps = null;

// actions
const mapDispatchToProps = () => ({
  fetchTaskList: () => {
    console.log('fetchTaskList');
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(App);
