import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { StateType } from '../../reducers/types';

function mapStateToProps(state: StateType) {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
