import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { ipcRenderer } from 'electron';
import Root from './containers/Root';
import { configureStore, history } from '../store/configureStore';
import { initialState } from '../initialState';
import './app.global.scss';
import setSettings from '../actions/settings';

const store = configureStore(initialState);

ipcRenderer.on('MToMW-setS', (_event, arg) => {
  store.dispatch(setSettings(arg));
});

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () =>
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  )
);
