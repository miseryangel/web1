import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { randomArray } from './bricks/arrayGenerator';

const initialLength = 10, maxLength = 20;



export const arraySlice = createSlice({
    name: 'array',
    initialState: {
        arr:randomArray(initialLength),
        len:initialLength,
        idx:null as (null|number),
        val:null as (null|number)
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
        size: state =>{
            state.val = state.arr.length;
            setInterval(()=>state.val = null, 500);
        },
        isEmpty: state =>{
            if (state.arr.length === 0){
                alert("Array is empty !");
            }else{
                alert("Array is not empty !");
            }
        },
        add:{
            reducer(state,action:PayloadAction<number>){
                if (state.arr.length === maxLength){
                    alert("Array has reached its initial capacity!");
                    return;
                }
                state.arr.push(action.payload);
            },
            prepare(payload:number){
                return {payload};
            },

        },
        contains:{
            reducer(state,action:PayloadAction<number>){
                if (state.arr.includes(action.payload)){
                    alert("Array contains the element !");
                }else{
                    alert("Array doesn't contain the element !");
                }
            },
            prepare(payload:number){
                return {payload};
            },
        },
        indexOf:{
            reducer(state,action:PayloadAction<number>){
                let n = state.arr.length;
                for (let i = 0; i < n; i++){
                    if (state.arr[i] === action.payload) {
                        state.val = i;
                        setInterval(()=>state.val = null, 500);
                        return;
                    }
                }
                alert("The choosen element is not in Array");
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
                        setInterval(()=>state.val = null, 500);
                        return;
                    }
                }
                alert("The choosen element is not in Array");
            },
            prepare(payload:number){
                return {payload};
            },
        },
        get:{
            reducer(state,action:PayloadAction<number>){
                if (action.payload < 0 || action.payload >= state.arr.length){
                    alert("The index is out of boundary !");
                    return;
                }
                state.val = state.arr[action.payload];
                setInterval(()=>state.val = null, 500);
            },
            prepare(payload:number){
                return {payload};
            },
        },
        set:{
            reducer(state,action:PayloadAction<{index:number,element:number}>){
                let idx = action.payload.index, val = action.payload.element;
                if (idx < 0 || idx >= state.arr.length){
                    alert("The index is out of boundary !");
                    return;
                }
                state.arr[idx] = val;
            },
            prepare(payload:{index:number,element:number}){
                return {payload};
            },
        },
        remove:{
            reducer(state,action:PayloadAction<number>){
                if (action.payload < 0 || action.payload >= state.arr.length){
                    alert("The index is out of boundary !");
                    return;
                }
                state.arr.splice(action.payload,1);
            },
            prepare(payload:number){
                return {payload};
            },
        },
        clear:state =>{
            state.arr.splice(0,state.arr.length);
        },
        subList:{
            reducer(state,action:PayloadAction<{from:number,to:number}>){
                let from = action.payload.from, to = action.payload.to;
                if (from < 0 || from > to || to >= state.arr.length){
                    alert("Indices are invalid !");
                    return;
                }
                state.arr = state.arr.slice(from,to);
            },
            prepare(payload:{from:number,to:number}){
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
        sort:{
            reducer(state,action:PayloadAction<number>){
                if (action.payload === 1){
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
        idx:null as (null|number),
        val:null as (null|number)
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
        addFirst:{
            reducer(state,action:PayloadAction<number>){
                if (state.arr.length === maxLength){
                    alert("Deque has reached its initial capacity!");
                    return;
                }
                state.arr.unshift(action.payload);
            },
            prepare(payload:number){
                return {payload};
            },

        },
        addLast:{
            reducer(state,action:PayloadAction<number>){
                if (state.arr.length === maxLength){
                    alert("Linked list has reached its initial capacity!");
                    return;
                }
                state.arr.push(action.payload);
            },
            prepare(payload:number){
                return {payload};
            },

        },
        pollFirst: state=>{
            if (state.arr.length === 0){
                alert("Linked list is empty");
                return;
            }
            state.val = state.arr.splice(0,1)[0];
            setInterval(()=>state.val = null, 500);
        },
        pollLast: state=>{
            if (state.arr.length === 0){
                alert("Linked list is empty");
                return;
            }
            state.val = state.arr.splice(state.arr.length-1,1)[0];
            setInterval(()=>state.val = null, 500);
        },
        peekFirst: state=>{
            if (state.arr.length === 0){
                alert("Linked list is empty");
                return;
            }
            state.val = state.arr.splice(0,1)[0];
            setInterval(()=>state.val = null, 500);
        },
        peekLast: state=>{
            if (state.arr.length === 0){
                alert("Linked list is empty");
                return;
            }
            state.val = state.arr.splice(state.arr.length-1,1)[0];
            setInterval(()=>state.val = null, 500);
        },
        contains:{
            reducer(state,action:PayloadAction<number>){
                if (state.arr.includes(action.payload)){
                    alert("Linked list contains the element !");
                }else{
                    alert("Linked list doesn't contain the element !");
                }
            },
            prepare(payload:number){
                return {payload};
            },
        },
        indexOf:{
            reducer(state,action:PayloadAction<number>){
                let n = state.arr.length;
                for (let i = 0; i < n; i++){
                    if (state.arr[i] === action.payload) {
                        state.val = i;
                        setInterval(()=>state.val = null, 500);
                        return;
                    }
                }
                alert("The choosen element is not in Linked list");
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
                        setInterval(()=>state.val = null, 500);
                        return;
                    }
                }
                alert("The choosen element is not in Linked list");
            },
            prepare(payload:number){
                return {payload};
            },
        },
        get:{
            reducer(state,action:PayloadAction<number>){
                if (action.payload < 0 || action.payload >= state.arr.length){
                    alert("The index is out of boundary !");
                    return;
                }
                state.val = state.arr[action.payload];
                setInterval(()=>state.val = null, 500);
            },
            prepare(payload:number){
                return {payload};
            },
        },
        set:{
            reducer(state,action:PayloadAction<{index:number,element:number}>){
                let idx = action.payload.index, val = action.payload.element;
                if (idx < 0 || idx >= state.arr.length){
                    alert("The index is out of boundary !");
                    return;
                }
                state.arr[idx] = val;
            },
            prepare(payload:{index:number,element:number}){
                return {payload};
            },
        },
        remove:{
            reducer(state,action:PayloadAction<number>){
                if (action.payload < 0 || action.payload >= state.arr.length){
                    alert("The index is out of boundary !");
                    return;
                }
                state.arr.splice(action.payload,1);
            },
            prepare(payload:number){
                return {payload};
            },
        },
        clear:state =>{
            state.arr.splice(0,state.arr.length);
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
            if (state.arr.length === 0){
                alert("Queue is empty");
                return;
            }
            state.val = state.arr.splice(0,1)[0];
            setInterval(()=>state.val = null, 500);
        },
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
    size: arraySize,
    isEmpty: arrayIsEmpty,
    add: arrayAdd,
    contains: arrayContains,
    indexOf: arrayIndexOf,
    lastIndexOf: arrayLastIndexOf,
    get: arrayGet,
    set: arraySet,
    remove: arrayRemove,
    clear: arrayClear,
    subList: arraySubList,
    iterator: arrayIterator,
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
    peekFirst: linkedListPeekFirst,
    peekLast: linkedListPeekLast,
    contains: linkedListContains,
    indexOf: linkedListIndexOf,
    lastIndexOf: linkedListLastIndexOf,
    get: linkedListGet,
    set: linkedListSet,
    remove: linkedListRemove,
    clear: linkedListClear,
    iterator: linkedListIterator
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


