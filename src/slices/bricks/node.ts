
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