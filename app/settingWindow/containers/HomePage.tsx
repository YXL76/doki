import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { StateType } from '../../reducers/types';
import setTabIndex from '../../actions/tabIndex';
import setSwitchValue from '../../actions/switchValue';
import setRadioValue from '../../actions/radioValue';
import setSliderValue from '../../actions/sliderValue';

function mapStateToProps(state: StateType) {
  return {
    appdataPath: state.appdataPath,
    tabIndex: state.tabIndex,
    switchValue: state.switchValue,
    radioValue: state.radioValue,
    sliderValue: state.sliderValue
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      setTabIndex,
      setSwitchValue,
      setRadioValue,
      setSliderValue
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
