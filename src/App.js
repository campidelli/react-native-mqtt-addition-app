import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { mqttConnect } from './mqtt';
import AdditionScreen from './AdditionScreen';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(mqttConnect());
  }, [dispatch]);

  return (
    <SafeAreaView>
      <AdditionScreen />
    </SafeAreaView>
  );
};

export default App;
