import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { randomArray } from './bricks/arrayGenerator';

const initialLength = 100, maxLength = 200;

export const bubbleSortingSlice = createSlice({
    name: 'bubble sort',
    initialState: {
        arr:randomArray(initialLength),
        len:initialLength,
        round:0,
        idx: 0,
        isOver:false,
    },
    reducers: {
        reset: state =>{
            state.arr = randomArray(initialLength);
            state.len = initialLength;
            state.round = 0;
            state.idx = 0;
            state.isOver = false;
        },
        resize:{
            reducer(state,action:PayloadAction<number>){
                if (action.payload === 1){
                    state.len++;
                }else{
                    state.len--;
                }
                state.arr = randomArray(state.len);
                state.round = 0;
                state.idx = 0;
                state.isOver = false;
            },
            prepare(payload:number){
                return {payload};
            },
        },
        forward:(state) =>{
            if (!state.isOver){
                if (state.round === state.len - 1){
                    state.isOver = true;
                    return;
                }
                if (state.idx === state.len - state.round - 1){
                    state.idx = 0;
                    state.round++;
                }else{
                    if (state.arr[state.idx] > state.arr[state.idx + 1]){
                        const tmp = state.arr[state.idx];
                        state.arr[state.idx] = state.arr[state.idx + 1];
                        state.arr[state.idx + 1] = tmp;
                    }
                    state.idx++;
                }
            }
        }
            
    },
})

export const mergeSortingSlice = createSlice({
    name: 'merge sort',
    initialState: {
        arr:randomArray(initialLength),
        len:initialLength,
        round:0,
        idx: 0,
        isOver:false,
    },
    reducers: {
        reset: state =>{
            state.arr = randomArray(initialLength);
            state.len = initialLength;
            state.round = 0;
            state.idx = 0;
            state.isOver = false;
        },
        resize:{
            reducer(state,action:PayloadAction<number>){
                if (action.payload === 1){
                    state.len++;
                }else{
                    state.len--;
                }
                state.arr = randomArray(state.len);
                state.round = 0;
                state.idx = 0;
                state.isOver = false;
            },
            prepare(payload:number){
                return {payload};
            },
        },
        forward:(state) =>{
            if (!state.isOver){
                if (state.round === state.len - 1){
                    state.isOver = true;
                    return;
                }
                if (state.idx === state.len - state.round - 1){
                    state.idx = 0;
                    state.round++;
                }else{
                    if (state.arr[state.idx] > state.arr[state.idx + 1]){
                        const tmp = state.arr[state.idx];
                        state.arr[state.idx] = state.arr[state.idx + 1];
                        state.arr[state.idx + 1] = tmp;
                    }
                    state.idx++;
                }
            }
        }
    },
})

export const {
    reset,
    resize,
    forward
} = bubbleSortingSlice.actions;

export const sortingReducers ={
    bubbleSortingReducer: bubbleSortingSlice.reducer,
}