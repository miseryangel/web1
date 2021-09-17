import { configureStore } from '@reduxjs/toolkit';
import  { arrayReducers }  from "../slices/Array";
import { logger } from 'redux-logger';

const {
  arrayReducer,
  queueReducer,
  linkedListReducer,
  stackReducer
} = arrayReducers;

export const store = configureStore({
  reducer: {
    array: arrayReducer,
    queue: queueReducer,
    linkedList: linkedListReducer,
    stack: stackReducer,
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

