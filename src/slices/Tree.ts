import { LEFT, RIGHT, ROOT, RED, BLACK } from './bricks/symbol';
import { BSTree, AVLTree, RedBlackTree, SegmentTree, SplayTree, TrieTree } from './bricks/tree';
import { TreeNode, AVLNode, RedBlackNode, SegmentNode, TrieNode } from './bricks/node';
import { randomArray } from './bricks/arrayGenerator';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enableMapSet } from 'immer';
// allow reducers to use set
enableMapSet();


 // reset tree action unimplemented and initialize function unimplemented
const bstSlice = createSlice({
    name:"binary search tree",
    initialState:{
        tree: new BSTree(),
        visited: new Set<number>(),
        val:0,
        found:false,
    },
    reducers:{
        // only used for height limit then reset curNode
        reset:(state)=>{
            state.tree.cur = state.tree.root;
            state.found = false;
        },
        // select value
        changeVal:{
            reducer:(state,action:PayloadAction<number>)=>{
                state.val = action.payload;
            },
            prepare:(payload:number)=>{
                return {payload};
            }
        },
        // delegate value down the tree
        delegate:(state) =>{
            const sign = state.tree.delegate(state.val);
            if (sign === 1) state.found = true;
        },
        addNode:(state) =>{
            // add value to the pool
            state.visited.add(state.val);
            state.tree.addNode(state.val);
        },
        deleteNode:(state) =>{
            // remove value from the pool
            state.visited.delete(state.val);
            state.tree.deleteNode();
        },
    }
})

 // reset tree action unimplemented and initialize function unimplemented
 // height limit is outsourced to react component
const avlSlice = createSlice({
    name:"avl tree",
    initialState:{
        tree: new AVLTree(),
        visited: new Set<number>(),
        found:false,
        val:0,
    },
    reducers:{
        // only used for height limit then reset curNode
        reset:(state)=>{
            state.tree.cur = state.tree.root;
            state.found = false;
        },
        changeVal:{
            reducer(state,action:PayloadAction<number>){
                state.val = action.payload;
            },
            prepare(payload:number){
                return {payload};
            }
        },
        delegate:(state) =>{
            const sign = state.tree.delegate(state.val);
            if (sign === 1) state.found = true;
        },
        addNode:(state) =>{
            state.visited.add(state.val);
            state.tree.addNode(state.val);
        },
        deleteNode:(state) =>{
            // remove value from the pool
            state.visited.delete(state.val);
            state.tree.deleteNode();
        },
    }
})

const redBlackSlice = createSlice({
    name:"red black tree",
    initialState:{
        tree: new RedBlackTree(),
        visited: new Set<number>(),
        found:false,
        val:0,
    },
    reducers:{
        reset:(state)=>{
            state.tree.cur = state.tree.root;
            state.found = false;
        },
        changeVal:{
            reducer(state,action:PayloadAction<number>){
                state.val = action.payload;
            },
            prepare(payload:number){
                return {payload};
            }
        },
        delegate:(state) =>{
            const sign = state.tree.delegate(state.val);
            if (sign === 1) state.found = true;
        },
        addNode:(state) =>{
            state.visited.add(state.val);
            state.tree.addNode(state.val);
        },
        // haven't updated
        deleteNode:(state) =>{
            state.tree.deleteNode(state.val);
        },
    }
})


const initialLenOfSegmentTree = 10;
// const segmentSlice = createSlice({
//     name:"segment tree",
//     initialState:{
//         len: initialLenOfSegmentTree,
//         tree: new SegmentTree(randomArray(initialLenOfSegmentTree),initialLenOfSegmentTree),
//         curNode: null as SegmentNode|null,
//         lazyArray: [] as SegmentNode[],
//     },
//     reducers:{
//         changeScale:{
//             reducer:(state,action:PayloadAction<number>)=>{
//                 state.len = action.payload;
//                 state.tree = new SegmentTree(randomArray(action.payload),action.payload);
//                 state.curNode = null;
//             },
//             prepare:(payload:number)=>{
//                 return {payload};
//             }
//         },
//         update:(state) =>{
//             state.tree.update(state.curNode);
//         },
//         changeVal:{
//             reducer:(state,action:PayloadAction<{idx:number,val:number}>)=>{
//                 state.curNode = state.tree.changeVal(action.payload.idx,action.payload.val);
//             },
//             prepare:(payload:{idx:number,val:number})=>{
//                 return {payload};
//             }
//         },
//         // wanna play cool stuff, downward to subtree and then propagate 
//         rangeUpdate:{
//             reducer:(state,action:PayloadAction<{diff:number,l:number,r:number}>)=>{
//                 if (state.curNode !== null){
//                     state.curNode.lazy = action.payload;
//                 } 
//             },
//             prepare:(payload:{diff:number,l:number,r:number})=>{
//                 return {payload};
//             }
//         },
//     }
// });


// const splaySlice = createSlice({
//     name:"splay tree",
//     initialState:{
//         tree: new SplayTree(),
//         visited: new Set<number>(),
//         curNode: null as TreeNode|null,
//         val:0,
//     },
//     reducers:{
//         // only used for height limit then reset curNode
//         setNode:(state)=>{
//             state.curNode = state.tree.root;
//         },
//         // select value
//         changeVal:{
//             reducer:(state,action:PayloadAction<number>)=>{
//                 state.val = action.payload;
//             },
//             prepare:(payload:number)=>{
//                 return {payload};
//             }
//         },
//         // delegate value down the tree
//         delegate:(state) =>{
//             if (state.curNode === null){
//                 alert("Invalid operation!");
//             }else if (state.curNode.val > state.val){
//                 state.curNode = state.curNode.left;
//             }else{
//                 state.curNode = state.curNode.right;
//             }
//         },
//         addNode:(state) =>{
//             // add value to the pool
//             state.visited.add(state.val);
//             const newNode = new TreeNode(state.val,null,ROOT);
//             if (state.curNode === null){
//                 state.tree.root = newNode;
//             }else if (state.curNode.val > state.val){
//                 newNode.parentSide = LEFT;
//                 state.curNode.left = newNode;
//             }else{
//                 newNode.parentSide = RIGHT;
//                 state.curNode.right = newNode;
//             }
//             state.tree.splay(newNode);
//             // direct the pointer to root
//             state.curNode = state.tree.root;
//         },
//         deleteNode:(state) =>{
//             state.visited.delete(state.val);
//             if (state.curNode !== null) state.tree.delete(state.curNode);
//             state.curNode = state.tree.root;
//         },
//     }
// })

// const trieSlice = createSlice({
//     name:"splay tree",
//     initialState:{
//         tree: new TrieTree(new TrieNode("root",false,0,true)),
//         visited: new Set<number>(),
//         curNode: null as TrieNode|null,
//         val:"",
//     },
//     reducers:{
//         // only used for height limit then reset curNode
//         setNode:(state)=>{
//             state.curNode = state.tree.root;
//         },
//         // select value
//         changeVal:{
//             reducer:(state,action:PayloadAction<string>)=>{
//                 state.val = action.payload;
//             },
//             prepare:(payload:string)=>{
//                 return {payload};
//             }
//         },
//         // delegate value down the tree
//         delegate:(state) =>{
//             if (state.curNode === null){
//                 alert("Invalid operation!");
//             }else if (state.curNode.children[state.val.charCodeAt(0) - 97] !== null){
//                 state.curNode = state.curNode!.children[state.val.charCodeAt(0) - 97];
//             }
//         },
//         addNode:{
//             reducer:(state,action:PayloadAction<boolean>)=>{
//                 state.val = action.payload;
//             },
//             prepare:(payload:boolean)=>{
//                 return {payload};
//             }
//         },
//     },
// })

export const{
    reset,
    changeVal,
    delegate,
    addNode,
    deleteNode
}= bstSlice.actions;
export const{
    reset:avlReset,
    changeVal:avlChangeVal,
    delegate:avlDelegate,
    addNode:avlAddNode,
    deleteNode:avlDeleteNode,
} = avlSlice.actions;

export const treeReducers ={
  bstReducer: bstSlice.reducer,
  avlReducer: avlSlice.reducer
}