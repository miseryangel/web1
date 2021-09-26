import { v4 as uuid } from 'uuid';

export interface Nodewise{
    val:number;
    left:any;
    right:any;
}
// generic tree node
class Node<T>{
    val: number;
    left: T|null;
    right: T|null;
    parent: T|null;
    parentSide:Symbol;
    constructor(data:number, parent: T|null, parentSide:Symbol){
        this.val = data;
        this.left = null;
        this.right = null;
        this.parent = parent;
        this.parentSide = parentSide;
    }
}

export class TreeNode extends Node<TreeNode>{
    setParent(parent:TreeNode){
        this.parent = parent;
    }
}

export interface AVLType{
    val: number;
    left: AVLType|null;
    right: AVLType|null;
    parent: AVLType|null;
    parentSide:Symbol;
    ld:number;
    rd:number;
}
// avl node recording height of two subtrees
export class AVLNode extends Node<AVLNode>{
    ld:number;
    rd:number;
    constructor(data:number,parent: AVLNode|null,ld:number,rd:number,parentSide:Symbol){
        super(data,parent,parentSide);
        this.ld = ld;
        this.rd = rd;
    }
}

// red black node with color attribute
export class RedBlackNode extends Node<RedBlackNode>{
    color:Symbol;
    constructor(data:number,parent: RedBlackNode|null,parentSide:Symbol,color:Symbol){
        super(data,parent,parentSide);
        this.color = color;
    }
}

export class SegmentNode extends Node<SegmentNode>{
    span:{low:number,up:number};
    lazy:{diff:number,l:number,r:number};
    constructor(data:number,parent: SegmentNode|null,parentSide:Symbol,span:{low:number,up:number}){
        super(data,parent,parentSide);
        this.span = span;
        this.lazy = {diff:0,l:0,r:0};
    }
}


// need to add parent pointer
export class TrieNode{
    key:String;
    children:(TrieNode|null)[];
    isLeaf:boolean;
    depth:number;
    isRoot:boolean;
    constructor(key:String,isLeaf:boolean,depth:number,isRoot:boolean){
        this.key = key;
        this.children = Array<TrieNode|null>(26).fill(null);
        this.isLeaf = isLeaf;
        this.depth = depth;
        this.isRoot = isRoot;
    }
}

export class BNode{
    keys:number[];
    children:BNode[];
    parent:BNode|null;
    isLeaf:boolean;
    id:String;
    constructor(){
        this.keys = [];
        this.children = [];
        this.parent = null;
        this.isLeaf = true;
        this.id = uuid();
    }
}