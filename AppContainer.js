import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import App from './src/App';

const AppContainer = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppContainer;
