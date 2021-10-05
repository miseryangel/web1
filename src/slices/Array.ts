import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { randomArray } from './bricks/arrayGenerator';

const initialLength = 10, maxLength = 20;

export const arraySlice = createSlice({
    name: 'array',
    initialState: {
        arr:randomArray(initialLength),
        len:initialLength,
        val:0,
    },
    reducers: {
        reset: state =>{
            state.arr = randomArray(state.len);
        },
        resize:{
            reducer(state,action:PayloadAction<number>){
                state.len = action.payload;
            },
            prepare(payload:number){
                return {payload};
            },
        },
        add:{
            reducer(state,action:PayloadAction<number>){
                state.arr.push(action.payload);
                state.len++;
            },
            prepare(payload:number){
                return {payload};
            },
        },
        set:{
            reducer(state,action:PayloadAction<{index:number,element:number}>){
                let idx = action.payload.index, val = action.payload.element;
                state.arr[idx] = val;
            },
            prepare(payload:{index:number,element:number}){
                return {payload};
            },
        },
        remove:{
            reducer(state,action:PayloadAction<number>){
                state.arr.splice(action.payload,1);
                state.len--;
            },
            prepare(payload:number){
                return {payload};
            },
        },
        clear:state =>{
            state.arr.splice(0,state.arr.length);
            state.len = 0;
        },
        subList:{
            reducer(state,action:PayloadAction<{from:number,to:number}>){
                let from = action.payload.from, to = action.payload.to;
                state.arr = state.arr.slice(from,to);
                state.len = to - from;
            },
            prepare(payload:{from:number,to:number}){
                return {payload};
            },
        },
        sort:{
            reducer(state,action:PayloadAction<number>){
                if (action.payload === 0){
                    state.arr.sort(function(a, b){return a - b});
                }else{
                    state.arr.sort(function(a, b){return b - a});
                }
            },
            prepare(payload:number){
                return {payload};
            },
        },
        fill:{
            reducer(state,action:PayloadAction<number>){
                state.arr.fill(action.payload);
            },
            prepare(payload:number){
                return {payload};
            },
        },
        transform:{
            reducer(state,action:PayloadAction<number[]>){
                state.arr = action.payload;
                state.len = action.payload.length;
            },
            prepare(payload:number[]){
                return {payload};
            },
        }
    }
})


export const linkedListSlice = createSlice({
    name: 'linkedList',
    initialState: {
        arr:randomArray(initialLength),
        len:initialLength,
    },
    reducers: {
        reset: state =>{
            state.arr = randomArray(state.len);
        },
        resize:{
            reducer(state,action:PayloadAction<number>){
                state.len = action.payload;
            },
            prepare(payload:number){
                return {payload};
            },
        },
        addFirst:{
            reducer(state,action:PayloadAction<number>){
                state.arr.unshift(action.payload);
                state.len++;
            },
            prepare(payload:number){
                return {payload};
            },

        },
        addLast:{
            reducer(state,action:PayloadAction<number>){
                state.arr.push(action.payload);
                state.len++;
            },
            prepare(payload:number){
                return {payload};
            },
        },
        pollFirst: state=>{
            state.arr.splice(0,1);
            state.len--;
        },
        pollLast: state=>{
            state.arr.splice(state.arr.length-1,1);
            state.len--;
        },
        set:{
            reducer(state,action:PayloadAction<{index:number,element:number}>){
                let idx = action.payload.index, val = action.payload.element;
                state.arr[idx] = val;
            },
            prepare(payload:{index:number,element:number}){
                return {payload};
            },
        },
        insert:{
            reducer(state,action:PayloadAction<{index:number,element:number}>){
                state.arr.splice(action.payload.index,0,action.payload.element);
                state.len++;
            },
            prepare(payload:{index:number,element:number}){
                return {payload};
            },
        },
        remove:{
            reducer(state,action:PayloadAction<number>){
                state.arr.splice(action.payload,1);
                state.len--;
            },
            prepare(payload:number){
                return {payload};
            },
        },
        sort:{
            reducer(state,action:PayloadAction<number>){
                if (action.payload === 0){
                    state.arr.sort(function(a, b){return a - b});
                }else{
                    state.arr.sort(function(a, b){return b - a});
                }
            },
            prepare(payload:number){
                return {payload};
            },
        },
        clear:state =>{
            state.arr.splice(0,state.arr.length);
            state.len = 0;
        },
        transform:{
            reducer(state,action:PayloadAction<number[]>){
                state.arr = action.payload;
                state.len = action.payload.length;
            },
            prepare(payload:number[]){
                return {payload};
            },
        }
    }
})


export const queueSlice = createSlice({
    name: 'queue',
    initialState: {
        arr:randomArray(initialLength),
        len:initialLength,
    },
    reducers: {
        reset: state =>{
            state.arr = randomArray(state.len);
        },
        resize:{
            reducer(state,action:PayloadAction<number>){
                state.len = action.payload;
            },
            prepare(payload:number){
                return {payload};
            },
        },
        add:{
            reducer(state,action:PayloadAction<number>){
                state.arr.push(action.payload);
                state.len++;
            },
            prepare(payload:number){
                return {payload};
            },
        },
        poll: state=>{
            state.arr.splice(0,1);
            state.len--;
        },
        transform:{
            reducer(state,action:PayloadAction<number[]>){
                state.arr = action.payload;
                state.len = action.payload.length;
            },
            prepare(payload:number[]){
                return {payload};
            },
        }
    },
})


export const stackSlice = createSlice({
    name: 'stack',
    initialState: {
        arr:randomArray(initialLength),
        len:initialLength,
    },
    reducers: {
        reset: state =>{
            state.arr = randomArray(state.len);
        },
        resize:{
            reducer(state,action:PayloadAction<number>){
                state.len = action.payload;
            },
            prepare(payload:number){
                return {payload};
            },
        },
        push:{
            reducer(state,action:PayloadAction<number>){
                state.arr.push(action.payload);
                state.len++;
            },
            prepare(payload:number){
                return {payload};
            },

        },
        pop: state=>{
            state.arr.splice(state.arr.length-1,1);
            state.len--;
        },
        transform:{
            reducer(state,action:PayloadAction<number[]>){
                state.arr = action.payload;
                state.len = action.payload.length;
            },
            prepare(payload:number[]){
                return {payload};
            },
        }
    },
})

export const {
    reset: arrayReset,
    resize: arrayResize,
    add: arrayAdd,
    set: arraySet,
    remove: arrayRemove,
    clear: arrayClear,
    subList: arraySubList,
    sort: arraySort,
    fill: arrayFill,
    transform:arrayTransform,
} = arraySlice.actions;

export const {
    reset: linkedListReset,
    resize: linkedListResize,
    addFirst: linkedListAddFirst,
    addLast: linkedListAddLast,
    pollFirst: linkedListPollFirst,
    pollLast: linkedListPollLast,
    set: linkedListSet,
    remove: linkedListRemove,
    clear: linkedListClear,
    sort:linkedListSort,
    insert: linkedListInsert,
    transform:linkedListTransform
} = linkedListSlice.actions;

export const {
    reset: queueReset,
    resize: queueResize,
    add: queueAdd,
    poll:queuePoll,
    transform:queueTransform
} = queueSlice.actions;

export const {
    reset: stackReset,
    resize: stackResize,
    pop:stackPop,
    push:stackPush,
    transform:stackTransform
} = stackSlice.actions;

export const arrayReducers ={
    arrayReducer: arraySlice.reducer,
    linkedListReducer: linkedListSlice.reducer,
    queueReducer: queueSlice.reducer,
    stackReducer: stackSlice.reducer,
}


