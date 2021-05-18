import { createAction, createSlice } from '@reduxjs/toolkit';
import { mqttPublish } from './mqtt';

export const respondAddition = createAction('RESPOND_ADDITION');

export const slice = createSlice({
  name: 'addition',
  initialState: {
    augend: '0',
    addend: '0',
    result: '0',
  },
  reducers: {
    setAugend(state, action) {
      state.augend = action.payload;
    },
    setAddend(state, action) {
      state.addend = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(respondAddition, (state, action) => {
      console.log('additionSlice payload: ' + action.payload);
      const result = JSON.parse(action.payload);
      state.augend = result.augend;
      state.addend = result.addend;
      state.result = result.result;
    })
  },
});

export const { setAugend, setAddend } = slice.actions;

export const requestAddition = (augend, addend) => async (dispatch) => {
  dispatch(mqttPublish({
    topic: 'addition/request',
    message: {
      augend,
      addend
    },
  }));
};


export const selectAugend = (state) => state.addition.augend;
export const selectAddend = (state) => state.addition.addend;
export const selectResult = (state) => state.addition.result;

export default slice.reducer;
