import React from 'react';
import MapScreen from './src/screens/MapScreen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <MapScreen />
      </PersistGate>
    </Provider>
  );
};

export default App;
