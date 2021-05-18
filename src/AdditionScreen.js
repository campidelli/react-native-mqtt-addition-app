import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddend, selectAugend, selectResult, setAddend, setAugend, requestAddition } from './additionSlice';

const AdditionScreen = () => {
  const dispatch = useDispatch();

  const augend = useSelector(selectAugend);
  const addend = useSelector(selectAddend);
  const result = useSelector(selectResult);

  const onPressCalculate = () => {
    dispatch(requestAddition(augend, addend));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Augend
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={text => dispatch(setAugend(text))}
        value={augend}
      />
      <Text style={styles.label}>
        Addend
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={text => dispatch(setAddend(text))}
        value={addend}
      />
      <Text style={styles.label}>
        Result
      </Text>
      <TextInput
        style={styles.input}
        editable={false}
        value={result}
      />
      <Button
        onPress={onPressCalculate}
        title='Calculate'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    paddingTop: 20,
  },
});

export default AdditionScreen;
