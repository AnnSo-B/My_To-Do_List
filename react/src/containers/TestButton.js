// npm imports
import { connect } from 'react-redux';

// local imports
import Test from '../components/TestButton';
import { testMiddleware } from '../actions';

// state
const mapStateToProps = null;

// actions
const mapDispatchToProps = (dispatch) => ({
  testMiddleware: () => {
    console.log('je suis le dispatcher dans le container Test');
    dispatch(testMiddleware());
  },
});

// export
export default connect(mapStateToProps, mapDispatchToProps)(Test);
