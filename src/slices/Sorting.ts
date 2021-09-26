import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { randomArray } from './bricks/arrayGenerator';
import { mergeStack, stackGenerator, subSort } from './bricks/mergeHelper';

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

const mergeStart = randomArray(initialLength);
const stack = stackGenerator(initialLength);
export const mergeSortingSlice = createSlice({
    name: 'merge sort',
    initialState: {
        arr:mergeStart,
        tmp:mergeStart,
        stack:stack,
        len:initialLength,
        round:stack.length-1,
        idx: stack[stack.length-1][0],
        isOver:false,
    },
    reducers: {
        reset: state =>{
            state.arr = randomArray(state.len);
            state.tmp = state.arr;
            state.stack = stackGenerator(state.len);
            state.round = state.stack.length-1;
            state.idx = state.stack[state.stack.length-1][0];
            state.isOver = false;
        },
        resize:{
            reducer(state,action:PayloadAction<number>){
                state.len = action.payload;
            },
            prepare(payload:number){
                return {payload};
            },
        },
        forward:(state) =>{
            if (!state.isOver){
                if (state.idx === state.stack[state.round][0]){
                    state.tmp = subSort(state.tmp,state.stack[state.round][0],state.stack[state.round][1]);
                }
                if (state.idx === state.stack[state.round][1]){
                    state.round--;
                    if (state.round === -1){
                        state.isOver = true;
                        return;
                    }
                    state.idx = state.stack[state.round][0];
                }else{
                    state.arr[state.idx] = state.tmp[state.idx];
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