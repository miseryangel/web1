import { configureStore } from '@reduxjs/toolkit';
import  { arrayReducers }  from '../slices/Array';
import { treeReducers } from '../slices/Tree';
import { logger } from 'redux-logger';

const {
  arrayReducer,
  queueReducer,
  linkedListReducer,
  stackReducer
} = arrayReducers;

const {
  bstReducer,
  avlReducer,
} = treeReducers;

export const store = configureStore({
  reducer: {
    array: arrayReducer,
    queue: queueReducer,
    linkedList: linkedListReducer,
    stack: stackReducer,
    bst: bstReducer,
    avl: avlReducer,
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

