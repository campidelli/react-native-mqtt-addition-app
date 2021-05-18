import { configureStore } from '@reduxjs/toolkit';
import createMiddleware from './mqtt';
import additionReducer from './additionSlice';

const store = configureStore({
    reducer: {
        addition: additionReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(createMiddleware()),
});

export default store;
