import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { StateType } from '../../reducers/types';

function mapStateToProps(state: StateType) {
  return {
    switchValue: {
      autostart: state.settings.autostart,
      notification: state.settings.notification
    }
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
