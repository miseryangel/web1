import { configureStore } from '@reduxjs/toolkit';
import  { arrayReducers }  from '../slices/Array';
import { treeReducers } from '../slices/Tree';
import { sortingReducers } from '../slices/dist/Sorting';
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

const {
  bubbleSortingReducer,
  mergeSortingReducer,
} = sortingReducers;

export const store = configureStore({
  reducer: {
    array: arrayReducer,
    queue: queueReducer,
    linkedList: linkedListReducer,
    stack: stackReducer,
    bst: bstReducer,
    avl: avlReducer,
    bubbleSort: bubbleSortingReducer,
    mergeSort: mergeSortingReducer,
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

