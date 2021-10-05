"use strict";
var _a, _b;
exports.__esModule = true;
exports.sortingReducers = exports.mergeForward = exports.mergeResize = exports.mergeReset = exports.bubbleForward = exports.bubbleResize = exports.bubbleReset = exports.mergeSortingSlice = exports.bubbleSortingSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var arrayGenerator_1 = require("./bricks/arrayGenerator");
var mergeHelper_1 = require("./bricks/mergeHelper");
var initialLength = 100, maxLength = 200;
exports.bubbleSortingSlice = toolkit_1.createSlice({
    name: 'bubble sort',
    initialState: {
        arr: arrayGenerator_1.randomArray(initialLength),
        len: initialLength,
        round: 0,
        idx: 0,
        isOver: false
    },
    reducers: {
        reset: function (state) {
            state.arr = arrayGenerator_1.randomArray(state.len);
            state.round = 0;
            state.idx = 0;
            state.isOver = false;
        },
        resize: {
            reducer: function (state, action) {
                state.len = action.payload;
            },
            prepare: function (payload) {
                return { payload: payload };
            }
        },
        forward: function (state) {
            if (!state.isOver) {
                if (state.round === state.len - 1) {
                    state.isOver = true;
                    return;
                }
                if (state.idx === state.len - state.round - 1) {
                    state.idx = 0;
                    state.round++;
                }
                else {
                    if (state.arr[state.idx] > state.arr[state.idx + 1]) {
                        var tmp = state.arr[state.idx];
                        state.arr[state.idx] = state.arr[state.idx + 1];
                        state.arr[state.idx + 1] = tmp;
                    }
                    state.idx++;
                }
            }
        }
    }
});
var mergeStart = arrayGenerator_1.randomArray(initialLength);
var stack = mergeHelper_1.stackGenerator(initialLength);
exports.mergeSortingSlice = toolkit_1.createSlice({
    name: 'merge sort',
    initialState: {
        arr: mergeStart,
        tmp: mergeStart,
        stack: stack,
        len: initialLength,
        round: stack.length - 1,
        idx: stack[stack.length - 1][0],
        isOver: false
    },
    reducers: {
        reset: function (state) {
            state.arr = arrayGenerator_1.randomArray(state.len);
            state.tmp = state.arr;
            state.stack = mergeHelper_1.stackGenerator(state.len);
            state.round = state.stack.length - 1;
            state.idx = state.stack[state.stack.length - 1][0];
            state.isOver = false;
        },
        resize: {
            reducer: function (state, action) {
                state.len = action.payload;
            },
            prepare: function (payload) {
                return { payload: payload };
            }
        },
        forward: function (state) {
            if (!state.isOver) {
                if (state.idx === state.stack[state.round][0]) {
                    state.tmp = mergeHelper_1.subSort(state.tmp, state.stack[state.round][0], state.stack[state.round][1]);
                }
                if (state.idx === state.stack[state.round][1]) {
                    state.round--;
                    if (state.round === -1) {
                        state.isOver = true;
                        return;
                    }
                    state.idx = state.stack[state.round][0];
                }
                else {
                    state.arr[state.idx] = state.tmp[state.idx];
                }
            }
        }
    }
});
exports.bubbleReset = (_a = exports.bubbleSortingSlice.actions, _a.reset), exports.bubbleResize = _a.resize, exports.bubbleForward = _a.forward;
exports.mergeReset = (_b = exports.mergeSortingSlice.actions, _b.reset), exports.mergeResize = _b.resize, exports.mergeForward = _b.forward;
exports.sortingReducers = {
    bubbleSortingReducer: exports.bubbleSortingSlice.reducer,
    mergeSortingReducer: exports.mergeSortingSlice.reducer
};
