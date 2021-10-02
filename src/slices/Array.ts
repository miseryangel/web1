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
        contains:{
            reducer(state,action:PayloadAction<number>){
                if (state.arr.includes(action.payload)){
                    state.val = 1;
                }else{
                    state.val = -1;
                }
            },
            prepare(payload:number){
                return {payload};
            },
        },
        indexOf:{
            reducer(state,action:PayloadAction<number>){
                state.val = state.arr.indexOf(action.payload);
            },
            prepare(payload:number){
                return {payload};
            },
        },
        lastIndexOf:{
            reducer(state,action:PayloadAction<number>){
                let n = state.arr.length;
                for (let i = n - 1; i >= 0; i--){
                    if (state.arr[i] === action.payload) {
                        state.val = i;
                        return;
                    }
                }
                state.val = -1;
            },
            prepare(payload:number){
                return {payload};
            },
        },
        get:{
            reducer(state,action:PayloadAction<number>){
                state.val = state.arr[action.payload];
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
        remove:(state) =>{
            state.arr.splice(state.val,1);
            state.len--;
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
    }
})


export const linkedListSlice = createSlice({
    name: 'linkedList',
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
        contains:{
            reducer(state,action:PayloadAction<number>){
                if (state.arr.includes(action.payload)){
                    state.val = 1;
                }else{
                    state.val = -1;
                }
            },
            prepare(payload:number){
                return {payload};
            },
        },
        indexOf:{
            reducer(state,action:PayloadAction<number>){
                state.val = state.arr.indexOf(action.payload);
            },
            prepare(payload:number){
                return {payload};
            },
        },
        lastIndexOf:{
            reducer(state,action:PayloadAction<number>){
                let n = state.arr.length;
                for (let i = n - 1; i >= 0; i--){
                    if (state.arr[i] === action.payload) {
                        state.val = i;
                        return;
                    }
                }
                state.val = -1;
            },
            prepare(payload:number){
                return {payload};
            },
        },
        get:{
            reducer(state,action:PayloadAction<number>){
                state.val = state.arr[action.payload];
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
        insert:{
            reducer(state,action:PayloadAction<{index:number,element:number}>){
                state.arr.splice(action.payload.index,0,action.payload.element);
                state.len++;
            },
            prepare(payload:{index:number,element:number}){
                return {payload};
            },
        },
        remove:(state) =>{
            state.arr.splice(state.val,1);
            state.len--;
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
    }
})


export const queueSlice = createSlice({
    name: 'queue',
    initialState: {
        arr:randomArray(initialLength),
        len:initialLength,
        val:null as (null|number),
        idx:null as (null|number)
    },
    reducers: {
        reset: state =>{
            state.arr = randomArray(initialLength);
            state.len = initialLength;
        },
        resize:{
            reducer(state,action:PayloadAction<number>){
                if (action.payload === 1){
                    state.len++;
                }else{
                    state.len--;
                }
                state.arr = randomArray(state.len);
            },
            prepare(payload:number){
                return {payload};
            },
        },
        add:{
            reducer(state,action:PayloadAction<number>){
                if (state.arr.length === maxLength){
                    alert("Queue has reached its initial capacity!");
                    return;
                }
                state.arr.push(action.payload);
            },
            prepare(payload:number){
                return {payload};
            },
        },
        poll: state=>{
            state.val = state.arr.splice(0,1)[0];
        },
        // need to draw setInterval to application page
        peek: state=>{
            if (state.arr.length === 0){
                alert("Queue is empty");
                return;
            }
            state.val = state.arr.splice(state.arr.length-1,1)[0];
            setInterval(()=>state.val = null, 500);
        },
        contains:{
            reducer(state,action:PayloadAction<number>){
                if (state.arr.includes(action.payload)){
                    alert("Queue contains the element !");
                }else{
                    alert("Queue doesn't contain the element !");
                }
            },
            prepare(payload:number){
                return {payload};
            },
        },
        iterator:{
            reducer(state,action:PayloadAction<number>){
                const n = state.arr.length;
                if (action.payload === 1){
                    for (let i = n - 1; i >= 0 ; i--){
                        setInterval(()=>state.idx = i, 100);
                    }
                }else{
                    for (let i = 0; i <= n ; i++){
                        setInterval(()=>state.idx = i, 100);
                    }
                }
                state.idx = null;
            },
            prepare(payload:number){
                return {payload};
            },
        },
    },
})


export const stackSlice = createSlice({
    name: 'stack',
    initialState: {
        arr:randomArray(initialLength),
        len:initialLength,
        val:null as (null|number),
        idx:null as (null|number)
    },
    reducers: {
        reset: state =>{
            state.arr = randomArray(initialLength);
            state.len = initialLength;
        },
        resize:{
            reducer(state,action:PayloadAction<number>){
                if (action.payload === 1){
                    state.len++;
                }else{
                    state.len--;
                }
                state.arr = randomArray(state.len);
            },
            prepare(payload:number){
                return {payload};
            },
        },
        empty:state =>{
            if (state.arr.length === 0){
                alert("Stack is empty!");
            }else{
                alert("Stack is not empty!");
            }
        },
        push:{
            reducer(state,action:PayloadAction<number>){
                if (state.arr.length === maxLength){
                    alert("Stack has reached its initial capacity!");
                    return;
                }
                state.arr.push(action.payload);
            },
            prepare(payload:number){
                return {payload};
            },

        },
        pop: state=>{
            if (state.arr.length === 0){
                alert("Stack is empty");
                return;
            }
            state.val = state.arr.splice(state.arr.length-1,1)[0];
            setInterval(()=>state.val = null, 500);
        },
        peek: state=>{
            if (state.arr.length === 0){
                alert("Stack is empty");
                return;
            }
            state.val = state.arr.splice(state.arr.length-1,1)[0];
            setInterval(()=>state.val = null, 500);
        },
        contains:{
            reducer(state,action:PayloadAction<number>){
                if (state.arr.includes(action.payload)){
                    alert("Stack contains the element !");
                }else{
                    alert("Stack doesn't contain the element !");
                }
            },
            prepare(payload:number){
                return {payload};
            },
        },
        iterator:{
            reducer(state,action:PayloadAction<number>){
                const n = state.arr.length;
                if (action.payload === 1){
                    for (let i = n - 1; i >= 0 ; i--){
                        setInterval(()=>state.idx = i, 100);
                    }
                }else{
                    for (let i = 0; i <= n ; i++){
                        setInterval(()=>state.idx = i, 100);
                    }
                }
                state.idx = null;
            },
            prepare(payload:number){
                return {payload};
            },
        },
    },
})

export const {
    reset: arrayReset,
    resize: arrayResize,
    add: arrayAdd,
    contains: arrayContains,
    indexOf: arrayIndexOf,
    lastIndexOf: arrayLastIndexOf,
    get: arrayGet,
    set: arraySet,
    remove: arrayRemove,
    clear: arrayClear,
    subList: arraySubList,
    sort: arraySort,
    fill: arrayFill,
} = arraySlice.actions;

export const {
    reset: linkedListReset,
    resize: linkedListResize,
    addFirst: linkedListAddFirst,
    addLast: linkedListAddLast,
    pollFirst: linkedListPollFirst,
    pollLast: linkedListPollLast,
    contains: linkedListContains,
    indexOf: linkedListIndexOf,
    lastIndexOf: linkedListLastIndexOf,
    get: linkedListGet,
    set: linkedListSet,
    remove: linkedListRemove,
    clear: linkedListClear,
    sort:linkedListSort,
    insert: linkedListInsert,
} = linkedListSlice.actions;

export const {
    reset: queueReset,
    resize: queueResize,
    add: queueAdd,
    poll:queuePoll,
    peek: queuePeek,
    contains: queueContains,
    iterator: queueIterator,
} = queueSlice.actions;

export const {
    reset: stackReset,
    resize: stackResize,
    empty: stackEmpty,
    pop:stackPop,
    peek:stackPeek,
    push:stackPush,
    contains: stackContains,
    iterator: stackIterator,
} = stackSlice.actions;

export const arrayReducers ={
    arrayReducer: arraySlice.reducer,
    linkedListReducer: linkedListSlice.reducer,
    queueReducer: queueSlice.reducer,
    stackReducer: stackSlice.reducer,
}


