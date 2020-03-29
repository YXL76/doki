import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { StateType } from '../../reducers/types';
import setTabIndex from '../../actions/tabIndex';
import setSettings from '../../actions/settings';

function mapStateToProps(state: StateType) {
  return {
    tabIndex: state.tabIndex,
    settings: state.settings,
    switchValue: {
      autostart: state.settings.autostart,
      notification: state.settings.notification
    },
    radioValue: {
      panelPosition: state.settings.panelPosition,
      panelLevel: state.settings.panelLevel,
      callShortcut: state.settings.callShortcut
    },
    sliderValue: {
      iconSize: state.settings.iconSize,
      iconOpacity: state.settings.iconOpacity,
      iconZoom: state.settings.iconZoom,
      iconSpacing: state.settings.iconSpacing,
      panelOpacity: state.settings.panelOpacity
    }
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      setTabIndex,
      setSettings
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
