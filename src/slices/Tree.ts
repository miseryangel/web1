import { LEFT, RIGHT, ROOT, RED, BLACK, Tree, AVLTree, RedBlackTree, SegmentTree, SplayTree, TrieTree } from './bricks/tree';
import { TreeNode, AVLNode, RedBlackNode, SegmentNode, TrieNode } from './bricks/node';
import { randomArray } from './bricks/arrayGenerator';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { castDraft } from 'immer';

 // reset tree action unimplemented and initialize function unimplemented
const bstSlice = createSlice({
    name:"binary search tree",
    initialState:{
        tree: new Tree<TreeNode>(),
        visited: new Set<number>(),
        curNode: null as TreeNode|null,
        val:0,
    },
    reducers:{
        // only used for height limit then reset curNode
        setNode:(state)=>{
            state.curNode = state.tree.root;
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
            if (state.curNode === null){
                alert("Invalid operation!");
            }else if (state.curNode.val > state.val){
                state.curNode = state.curNode.left;
            }else{
                state.curNode = state.curNode.right;
            }
        },
        addNode:(state) =>{
            // add value to the pool
            state.visited.add(state.val);
            if (state.curNode === null){
                state.tree.root = new TreeNode(state.val,null,ROOT);
            }else if (state.curNode.val > state.val){
                state.curNode.left = new TreeNode(state.val,null,LEFT);
                state.curNode.left.setParent(castDraft(state.curNode));
            }else{
                state.curNode.right = new TreeNode(state.val,null,RIGHT);
                state.curNode.right.setParent(castDraft(state.curNode));
            }
            // direct the pointer to root
            state.curNode = state.tree.root;
        },
        deleteNode:(state) =>{
            // remove value from the pool
            state.visited.delete(state.val);
            let cur = state.curNode;
            if (cur === null) return;
            // leaf node
            if (cur.left === null && cur.right === null){
                switch(cur.parentSide){
                    case LEFT:
                        cur.parent!.left = null;
                        break;
                    case RIGHT:
                        cur.parent!.right = null;
                        break;
                    case ROOT:
                        state.tree.root = null;
                        break;
                }
            // single child
            }else if (cur.left === null){
                cur.right!.parentSide = cur.parentSide;
                cur.right!.parent = cur.parent;
                switch(cur.parentSide){
                    case LEFT:
                        cur.parent!.left = cur.right;
                        break;
                    case RIGHT:
                        cur.parent!.right = cur.right;
                        break;
                    case ROOT:
                        state.tree.root = cur.right;
                        break;
                }
            // single child
            }else if (cur.right === null){
                cur.left!.parentSide = cur.parentSide;
                cur.left!.parent = cur.parent;
                switch(cur.parentSide){
                    case LEFT:
                        cur.parent!.left = cur.left;
                        break;
                    case RIGHT:
                        cur.parent!.right = cur.left;
                        break;
                    case ROOT:
                        state.tree.root = cur.left;
                        break;
                }
            // find swap cur either with predecessor or successor and then remove the leaf node
            }else{
                let predecessor:TreeNode = cur.left, successor:TreeNode = cur.right;
                let l = 0, r = 0;
                while (predecessor.right !== null){
                    predecessor = predecessor.right;
                    l++;
                }
                while (successor.left! !== null){
                    successor = successor.left;
                    r++;
                }
                if (l >= r){
                    cur.val = predecessor.val;
                    if (predecessor.parentSide === LEFT){
                        cur.left = predecessor.left;
                        if (cur.left !== null) cur.left.parent = cur;
                    }else{
                        predecessor.parent!.right = predecessor.left;
                        if (predecessor.left !== null){
                            predecessor.left.parent = predecessor.parent;
                            predecessor.left.parentSide = RIGHT;
                        }
                    }
                }else{
                    cur.val = successor.val;
                    if (successor.parentSide === RIGHT){
                        cur.right = successor.right;
                        if (cur.right !== null) cur.right.parent = cur;
                    }else{
                        successor.parent!.left = successor.right;
                        if (successor.right !== null){
                            successor.right.parent = successor.parent;
                            successor.right.parentSide = LEFT;
                        }
                    }
                }
            }
            state.curNode = state.tree.root;
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
        curNode: null as AVLNode|null,
        val:0,
    },
    reducers:{
        // only used for height limit then reset curNode
        setNode:(state)=>{
            state.curNode = state.tree.root;
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
            if (state.curNode === null){
                alert("Invalid operation!");
            }else if (state.curNode.val > state.val){
                state.curNode = state.curNode.left;
            }else{
                state.curNode = state.curNode.right;
            }
        },
        addNode:(state) =>{
            state.visited.add(state.val);
            if (state.curNode === null){
                state.tree.root = new AVLNode(state.val,null,0,0,ROOT);
            }else if (state.curNode.val > state.val){
                state.curNode.left = new AVLNode(state.val,state.curNode,0,0,LEFT);
            }else{
                state.curNode.right = new AVLNode(state.val,state.curNode,0,0,RIGHT);
            }
            state.tree.update(state.curNode);
            state.curNode = state.tree.root;
        },
        deleteNode:(state) =>{
            // remove value from the pool
            state.visited.delete(state.val);
            let cur = state.curNode;
            if (cur === null) return;
            // leaf node
            if (cur.left === null && cur.right === null){
                switch(cur.parentSide){
                    case LEFT:
                        cur.parent!.left = null;
                        break;
                    case RIGHT:
                        cur.parent!.right = null;
                        break;
                    case ROOT:
                        state.tree.root = null;
                        break;
                }
                cur = cur.parent;
            // single child
            }else if (cur.left === null){
                cur.right!.parentSide = cur.parentSide;
                cur.right!.parent = cur.parent;
                switch(cur.parentSide){
                    case LEFT:
                        cur.parent!.left = cur.right;
                        break;
                    case RIGHT:
                        cur.parent!.right = cur.right;
                        break;
                    case ROOT:
                        state.tree.root = cur.right;
                        break;
                }
                cur = cur.parent;
            // single child
            }else if (cur.right === null){
                cur.left!.parentSide = cur.parentSide;
                cur.left!.parent = cur.parent;
                switch(cur.parentSide){
                    case LEFT:
                        cur.parent!.left = cur.left;
                        break;
                    case RIGHT:
                        cur.parent!.right = cur.left;
                        break;
                    case ROOT:
                        state.tree.root = cur.left;
                        break;
                }
                cur = cur.parent;
            // find swap cur either with predecessor or successor and then remove the leaf node
            }else{
                let predecessor:AVLNode = cur.left, successor:AVLNode = cur.right;
                let l = 0, r = 0;
                while (predecessor.right !== null){
                    predecessor = predecessor.right;
                    l++;
                }
                while (successor.left! !== null){
                    successor = successor.left;
                    r++;
                }
                if (l >= r){
                    cur.val = predecessor.val;
                    if (predecessor.parentSide === LEFT){
                        cur.left = predecessor.left;
                        if (cur.left !== null) cur.left.parent = cur;
                    }else{
                        predecessor.parent!.right = predecessor.left;
                        if (predecessor.left !== null){
                            predecessor.left.parent = predecessor.parent;
                            predecessor.left.parentSide = RIGHT;
                        }
                        cur = predecessor.parent;
                    }
                }else{
                    cur.val = successor.val;
                    if (successor.parentSide === RIGHT){
                        cur.right = successor.right;
                        if (cur.right !== null) cur.right.parent = cur;
                    }else{
                        successor.parent!.left = successor.right;
                        if (successor.right !== null){
                            successor.right.parent = successor.parent;
                            successor.right.parentSide = LEFT;
                        }
                        cur = successor.parent;
                    }
                }
            }
            state.tree.update(cur);
            state.curNode = state.tree.root;
        },
    }
})



const redBlackSlice = createSlice({
    name:"red black tree",
    initialState:{
        tree: new RedBlackTree(),
        visited: new Set<number>(),
        curNode: null as RedBlackNode|null,
        val:0,
    },
    reducers:{
        setNode:(state)=>{
            state.curNode = state.tree.root;
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
            if (state.curNode === null){
                alert("Invalid operation!");
            }else if (state.curNode.val > state.val){
                state.curNode = state.curNode.left;
            }else{
                state.curNode = state.curNode.right;
            }
        },
        addNode:(state) =>{
            state.visited.add(state.val);
            const nxt = new RedBlackNode(state.val,state.curNode,ROOT,RED);
            if (state.curNode === null){
                state.tree.root = nxt;
                nxt.color = BLACK;
            }else if (state.curNode.val > state.val){
                state.curNode.left = nxt;
                nxt.parentSide = LEFT;
            }else{
                state.curNode.right = nxt;
                nxt.parentSide = RIGHT;
            }
            state.tree.insertRotate(nxt);
            state.curNode = state.tree.root;
        },
        // haven't updated
        deleteNode:(state) =>{
            let cur = state.curNode;
            if (cur === null) return;
            let curColor = cur.color;
            if (cur.left === null && cur.right === null){
                switch(cur.parentSide){
                    case LEFT:
                        cur.parent!.left = null;
                        break;
                    case RIGHT:
                        cur.parent!.right = null;
                        break;
                    case ROOT:
                        state.tree.root = null;
                        break;
                }
            }else if (cur.left === null){
                cur.right!.parentSide = cur.parentSide;
                cur.right!.parent = cur.parent;
                switch(cur.parentSide){
                    case LEFT:
                        cur.parent!.left = cur.right;
                        break;
                    case RIGHT:
                        cur.parent!.right = cur.right;
                        break;
                    case ROOT:
                        state.tree.root = cur.right;
                        break;
                }
            }else if (cur.right === null){
                cur.left!.parentSide = cur.parentSide;
                cur.left!.parent = cur.parent;
                switch(cur.parentSide){
                    case LEFT:
                        cur.parent!.left = cur.left;
                        break;
                    case RIGHT:
                        cur.parent!.right = cur.left;
                        break;
                    case ROOT:
                        state.tree.root = cur.left;
                        break;
                }
            }else{
                let predecessor:RedBlackNode = cur.left, successor:RedBlackNode = cur.right;
                let l = 0, r = 0;
                while (predecessor.right !== null){
                    predecessor = predecessor.right;
                    l++;
                }
                while (successor.left! !== null){
                    successor = successor.left;
                    r++;
                }
                curColor = l >= r ? predecessor.color:successor.color;
                if (l >= r){
                    cur.val = predecessor.val;
                    if (predecessor.parentSide === LEFT){
                        cur.left = predecessor.left;
                        if (cur.left !== null) cur.left.parent = cur;
                    }else{
                        predecessor.parent!.right = predecessor.left;
                        if (predecessor.left !== null){
                            predecessor.left.parent = predecessor.parent;
                            predecessor.left.parentSide = RIGHT;
                        }
                        cur = predecessor.parent;
                    }
                }else{
                    cur.val = successor.val;
                    if (successor.parentSide === RIGHT){
                        cur.right = successor.right;
                        if (cur.right !== null) cur.right.parent = cur;
                    }else{
                        successor.parent!.left = successor.right;
                        if (successor.right !== null){
                            successor.right.parent = successor.parent;
                            successor.right.parentSide = LEFT;
                        }
                        cur = successor.parent;
                    }
                }
            }
            // haven't updated
            if (curColor === BLACK) state.tree.update(cur);
            state.curNode = state.tree.root;
        },
    }
})


const initialLenOfSegmentTree = 10;
const segmentSlice = createSlice({
    name:"segment tree",
    initialState:{
        len: initialLenOfSegmentTree,
        tree: new SegmentTree(randomArray(initialLenOfSegmentTree),initialLenOfSegmentTree),
        curNode: null as SegmentNode|null,
        lazyArray: [] as SegmentNode[],
    },
    reducers:{
        changeScale:{
            reducer:(state,action:PayloadAction<number>)=>{
                state.len = action.payload;
                state.tree = new SegmentTree(randomArray(action.payload),action.payload);
                state.curNode = null;
            },
            prepare:(payload:number)=>{
                return {payload};
            }
        },
        update:(state) =>{
            state.tree.update(state.curNode);
        },
        changeVal:{
            reducer:(state,action:PayloadAction<{idx:number,val:number}>)=>{
                state.curNode = state.tree.changeVal(action.payload.idx,action.payload.val);
            },
            prepare:(payload:{idx:number,val:number})=>{
                return {payload};
            }
        },
        // wanna play cool stuff, downward to subtree and then propagate 
        rangeUpdate:{
            reducer:(state,action:PayloadAction<{diff:number,l:number,r:number}>)=>{
                if (state.curNode !== null){
                    state.curNode.lazy = action.payload;
                } 
            },
            prepare:(payload:{diff:number,l:number,r:number})=>{
                return {payload};
            }
        },
    }
});


const splaySlice = createSlice({
    name:"splay tree",
    initialState:{
        tree: new SplayTree(),
        visited: new Set<number>(),
        curNode: null as TreeNode|null,
        val:0,
    },
    reducers:{
        // only used for height limit then reset curNode
        setNode:(state)=>{
            state.curNode = state.tree.root;
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
            if (state.curNode === null){
                alert("Invalid operation!");
            }else if (state.curNode.val > state.val){
                state.curNode = state.curNode.left;
            }else{
                state.curNode = state.curNode.right;
            }
        },
        addNode:(state) =>{
            // add value to the pool
            state.visited.add(state.val);
            const newNode = new TreeNode(state.val,null,ROOT);
            if (state.curNode === null){
                state.tree.root = newNode;
            }else if (state.curNode.val > state.val){
                newNode.parentSide = LEFT;
                state.curNode.left = newNode;
            }else{
                newNode.parentSide = RIGHT;
                state.curNode.right = newNode;
            }
            state.tree.splay(newNode);
            // direct the pointer to root
            state.curNode = state.tree.root;
        },
        deleteNode:(state) =>{
            state.visited.delete(state.val);
            if (state.curNode !== null) state.tree.delete(state.curNode);
            state.curNode = state.tree.root;
        },
    }
})

const trieSlice = createSlice({
    name:"splay tree",
    initialState:{
        tree: new TrieTree(new TrieNode("root",false,0,true)),
        visited: new Set<number>(),
        curNode: null as TrieNode|null,
        val:"",
    },
    reducers:{
        // only used for height limit then reset curNode
        setNode:(state)=>{
            state.curNode = state.tree.root;
        },
        // select value
        changeVal:{
            reducer:(state,action:PayloadAction<string>)=>{
                state.val = action.payload;
            },
            prepare:(payload:string)=>{
                return {payload};
            }
        },
        // delegate value down the tree
        delegate:(state) =>{
            if (state.curNode === null){
                alert("Invalid operation!");
            }else if (state.curNode.children[state.val.charCodeAt(0) - 97] !== null){
                state.curNode = state.curNode!.children[state.val.charCodeAt(0) - 97];
            }
        },
        addNode:{
            reducer:(state,action:PayloadAction<boolean>)=>{
                state.val = action.payload;
            },
            prepare:(payload:boolean)=>{
                return {payload};
            }
        },
    },
})

export const{
    setNode,
    changeVal,
    delegate,
    addNode,
    deleteNode
}= bstSlice.actions;
export const{
    setNode:avlSetNode,
    changeVal:avlChangeVal,
    delegate:avlDelegate,
    addNode:avlAddNode,
    deleteNode:avlDeleteNode,
} = avlSlice.actions;

export const treeReducers ={
  bstReducer: bstSlice.reducer,
  avlReducer: avlSlice.reducer
}