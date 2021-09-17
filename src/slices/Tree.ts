import { LEFT, RIGHT, ROOT, RED, BLACK, Tree, AVLTree, RedBlackTree } from './bricks/tree';
import { TreeNode, AVLNode, RedBlackNode } from './bricks/node';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const bstSlice = createSlice({
    name:"binary search tree",
    initialState:{
        tree: new Tree<TreeNode>(),
        visited: new Set<number>(),
        curNode: null as TreeNode|null,
        val:0,
    },
    reducers:{
        reset:(state) =>{
            state.curNode = state.tree.root;
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
            if (state.curNode === null){
                state.tree.root = new TreeNode(state.val,null,ROOT);
            }else if (state.curNode.val > state.val){
                state.curNode.left = new TreeNode(state.val,state.curNode,LEFT);
            }else{
                state.curNode.right = new TreeNode(state.val,state.curNode,RIGHT);
            }
            state.visited.add(state.val);
        },
        deleteNode:(state) =>{
            let cur = state.curNode;
            if (cur === null) return;
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
                if (cur.left.right === null){
                    cur.left.parent = cur.parent;
                    cur.left.parentSide = cur.parentSide;
                    if (cur.parent !== null){
                        cur.parentSide === LEFT? cur.parent.left = cur.left:cur.parent.right = cur.left;
                    }else{
                        state.tree.root = cur.left;
                    }
                    return;
                }
                if (cur.right.left === null){
                    cur.right.parent = cur.parent;
                    cur.right.parentSide = cur.parentSide;
                    if (cur.parent !== null){
                        cur.parentSide === LEFT? cur.parent.left = cur.right:cur.parent.right = cur.right;
                    }else{
                        state.tree.root = cur.left;
                    }
                    return;
                }
                let predecessor:TreeNode|null = cur.left, successor:TreeNode|null = cur.right;
                let l = 0, r = 0;
                while (predecessor!.right !== null){
                    predecessor = predecessor!.right;
                    l++;
                }
                while (successor!.left! !== null){
                    successor = successor!.left;
                    r++;
                }
                if (l >= r){
                    cur.val = predecessor.val;
                    predecessor.parent!.right = null;
                }else{
                    cur.val = successor.val;
                    successor.parent!.left = null;
                }
            }
        },
    }
})


const avlSlice = createSlice({
    name:"avl tree",
    initialState:{
        tree: new AVLTree(),
        visited: new Set<number>(),
        curNode: null as AVLNode|null,
        val:0,
    },
    reducers:{
        changeVal:{
            reducer(state,action:PayloadAction<number>){
                state.val = action.payload;
            },
            prepare(payload:number){
                return {payload};
            }
        },
        reset:(state) =>{
            state.curNode = state.tree.root;
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
            if (state.curNode === null){
                state.tree.root = new AVLNode(state.val,null,0,0,ROOT);
            }else if (state.curNode.val > state.val){
                state.curNode.left = new AVLNode(state.val,state.curNode,0,0,LEFT);
            }else{
                state.curNode.right = new AVLNode(state.val,state.curNode,0,0,RIGHT);
            }
            state.visited.add(state.val);
            state.tree.update(state.curNode);
        },
        deleteNode:(state) =>{
            let cur = state.curNode;
            if (cur === null) return;
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
                if (cur.left.right === null){
                    cur.left.parent = cur.parent;
                    cur.left.parentSide = cur.parentSide;
                    if (cur.parent !== null){
                        cur.parentSide === LEFT? cur.parent.left = cur.left:cur.parent.right = cur.left;
                    }else{
                        state.tree.root = cur.left;
                    }
                    return;
                }
                if (cur.right.left === null){
                    cur.right.parent = cur.parent;
                    cur.right.parentSide = cur.parentSide;
                    if (cur.parent !== null){
                        cur.parentSide === LEFT? cur.parent.left = cur.right:cur.parent.right = cur.right;
                    }else{
                        state.tree.root = cur.left;
                    }
                    return;
                }
                let predecessor:TreeNode|null = cur.left, successor:TreeNode|null = cur.right;
                let l = 0, r = 0;
                while (predecessor!.right !== null){
                    predecessor = predecessor!.right;
                    l++;
                }
                while (successor!.left! !== null){
                    successor = successor!.left;
                    r++;
                }
                if (l >= r){
                    cur.val = predecessor.val;
                    predecessor.parent!.right = null;
                }else{
                    cur.val = successor.val;
                    successor.parent!.left = null;
                }
            }
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
        reset:(state) =>{
            state.curNode = state.tree.root;
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
            if (state.curNode === null){
                state.tree.root = new RedBlackNode(state.val,null,ROOT,BLACK);
            }else if (state.curNode.val > state.val){
                state.curNode.left = new RedBlackNode(state.val,state.curNode,LEFT,RED);
            }else{
                state.curNode.right = new RedBlackNode(state.val,state.curNode,RIGHT,RED);
            }
            if (state.curNode !== null) state.tree.insertRotate(state.curNode);
            state.visited.add(state.val);
        },
        deleteNode:(state) =>{
            let cur = state.curNode;
            if (cur === null) return;
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
                if (cur.left.right === null){
                    cur.left.parent = cur.parent;
                    cur.left.parentSide = cur.parentSide;
                    if (cur.parent !== null){
                        cur.parentSide === LEFT? cur.parent.left = cur.left:cur.parent.right = cur.left;
                    }else{
                        state.tree.root = cur.left;
                    }
                    return;
                }
                if (cur.right.left === null){
                    cur.right.parent = cur.parent;
                    cur.right.parentSide = cur.parentSide;
                    if (cur.parent !== null){
                        cur.parentSide === LEFT? cur.parent.left = cur.right:cur.parent.right = cur.right;
                    }else{
                        state.tree.root = cur.left;
                    }
                    return;
                }
                let predecessor:TreeNode|null = cur.left, successor:TreeNode|null = cur.right;
                let l = 0, r = 0;
                while (predecessor!.right !== null){
                    predecessor = predecessor!.right;
                    l++;
                }
                while (successor!.left! !== null){
                    successor = successor!.left;
                    r++;
                }
                if (l >= r){
                    cur.val = predecessor.val;
                    predecessor.parent!.right = null;
                }else{
                    cur.val = successor.val;
                    successor.parent!.left = null;
                }
            }
        },
    }
})
