import path from 'path';
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.scss';

const appdataFolder = path.join(
  process.env.LOCALAPPDATA ||
    process.env.APPDATA ||
    process.env.HOME ||
    process.env.HOMEPATH ||
    process.env.USERPROFILE ||
    __dirname,
  'doki'
);

const store = configureStore({ appdataPath: appdataFolder });

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () =>
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  )
);
