import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { stateType } from '../reducers/types';

function mapStateToProps(state: stateType) {
  return {
    appdataPath: state.appdataPath
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
