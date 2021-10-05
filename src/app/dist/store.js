"use strict";
exports.__esModule = true;
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var Array_1 = require("../slices/Array");
var Tree_1 = require("../slices/Tree");
var Sorting_1 = require("../slices/dist/Sorting");
var redux_logger_1 = require("redux-logger");
var arrayReducer = Array_1.arrayReducers.arrayReducer, queueReducer = Array_1.arrayReducers.queueReducer, linkedListReducer = Array_1.arrayReducers.linkedListReducer, stackReducer = Array_1.arrayReducers.stackReducer;
var bstReducer = Tree_1.treeReducers.bstReducer, avlReducer = Tree_1.treeReducers.avlReducer;
var bubbleSortingReducer = Sorting_1.sortingReducers.bubbleSortingReducer, mergeSortingReducer = Sorting_1.sortingReducers.mergeSortingReducer;
exports.store = toolkit_1.configureStore({
    reducer: {
        array: arrayReducer,
        queue: queueReducer,
        linkedList: linkedListReducer,
        stack: stackReducer,
        bst: bstReducer,
        avl: avlReducer,
        bubbleSort: bubbleSortingReducer,
        mergeSort: mergeSortingReducer
    },
    middleware: function (getDefaultMiddleware) { return getDefaultMiddleware().concat(redux_logger_1.logger); }
});
