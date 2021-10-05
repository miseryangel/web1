import { Nodewise, TreeNode, AVLNode, RedBlackNode, SegmentNode, TrieNode, BNode } from './node';
import { LEFT, RIGHT, ROOT, RED, BLACK } from './symbol';

export class Tree<T extends Nodewise>{
    root:T|null;
    constructor(){
        this.root = null;
    }
    addHelper(node:null|T,val:number):T|null{
        if (node === null) return null;
        if (node.val > val){
            if (node.left === null){
                return node;
            }
            return this.addHelper(node.left,val);
        }else{
            if (node.right === null){
                return node;
            }
            return this.addHelper(node.right,val);
        }
    }
    dfs(val:number,node:T|null):T|null{
        if (node === null) return null;
        if (node.val > val){
            return this.dfs(val,node.left);
        }else if (node.val === val){
            return node;
        }else{
            return this.dfs(val,node.right);
        }
    }
}

export class BSTree extends Tree<TreeNode>{
    addNode(val:number){
        const curNode = this.addHelper(this.root,val);
        if (curNode === null){
            this.root = new TreeNode(val,null,ROOT);
        }else if (curNode.val > val){
            curNode.left = new TreeNode(val,curNode,LEFT);
        }else{
            curNode.right = new TreeNode(val,curNode,RIGHT);
        }
    }

    deleteNode(val:number){
        let cur = this.dfs(val,this.root);
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
                    this.root = null;
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
                    this.root = cur.right;
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
                    this.root = cur.left;
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
    }
}

export class AVLTree extends Tree<AVLNode>{

    addNode(val:number){
        const curNode = this.addHelper(this.root,val);
        if (curNode === null){
            this.root = new AVLNode(val,null,0,0,ROOT);
        }else if (curNode.val > val){
            curNode.left = new AVLNode(val,curNode,0,0,LEFT);
        }else{
            curNode.right = new AVLNode(val,curNode,0,0,RIGHT);
        }
        this.update(curNode);
    }

    deleteNode(val:number){
        let cur = this.dfs(val,this.root);
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
                    this.root = null;
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
                    this.root = cur.right;
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
                    this.root = cur.left;
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
        this.update(cur);
    }

    private update(node:AVLNode|null){
        if (node === null) return;
        node.ld = node.left === null?0:1+Math.max(node.left.ld,node.left.rd);
        node.rd = node.right === null?0:1+Math.max(node.right.ld,node.right.rd);
        if (node.ld > node.rd + 1){
            if (node.left!.ld > node.left!.rd){
                this.rotation(node,node.left!,node.left!.left!,0);
            }else{
                this.rotation(node,node.left!,node.left!.right!,1);
            }
        }else if (node.rd > node.ld + 1){
            if (node.right!.rd > node.right!.ld){
                this.rotation(node,node.right!,node.right!.right!,2);
            }else{
                this.rotation(node,node.right!,node.right!.left!,3);
            }
        }
        if (node.parent === null){
            this.root = node;
            return;
        }
        this.update(node.parent); 
    }
    // two issues first I need to update the depth no matter the child is null or not, secondly reassign root.
    private rotation(nodeA:AVLNode,nodeB:AVLNode,nodeC:AVLNode,pattern:number){
        switch(pattern){
            case 0:
                // link parentA and nodeB
                nodeB.parent = nodeA.parent;
                nodeB.parentSide = nodeA.parentSide;
                if (nodeB.parent !== null){
                    nodeB.parentSide === LEFT?nodeB.parent.left = nodeB:nodeB.parent.right = nodeB;
                }
                // link nodeA and nodeB.right
                nodeA.left = nodeB.right;
                if (nodeA.left !== null){
                    nodeA.left.parent = nodeA;
                    nodeA.left.parentSide = LEFT;
                    nodeA.ld = 1 + Math.max(nodeA.left.ld,nodeA.left.rd);
                }else{
                    nodeA.ld = 0;
                } 
                // update nodeA
                nodeA.parent = nodeB;
                nodeA.parentSide = RIGHT;
                nodeB.right = nodeA;
                break;
            case 1:
                // link between nodeB and nodeC.left child
                nodeB.right = nodeC.left;
                if (nodeB.right !== null){
                    nodeB.right.parent = nodeB;
                    nodeB.right.parentSide = RIGHT;
                    nodeB.rd = 1 + Math.max(nodeB.right.ld,nodeB.right.rd);
                }else{
                    nodeB.rd = 0;
                }
                // link between nodeA and right child of nodeC
                nodeA.left = nodeC.right;
                if (nodeA.left !== null){
                    nodeA.left.parent = nodeA;
                    nodeA.left.parentSide = LEFT;
                    nodeA.ld = 1 + Math.max(nodeA.left.ld,nodeA.left.rd);
                }else{
                    nodeA.ld = 0;
                }
                // link between nodeC and parent of nodeA
                nodeC.parent = nodeA.parent;
                nodeC.parentSide = nodeA.parentSide;
                if (nodeC.parent !== null){
                    nodeC.parentSide === LEFT?nodeC.parent.left = nodeC:nodeC.parent.right = nodeC;
                }
                nodeB.parent = nodeC;
                nodeA.parent = nodeC;
                nodeA.parentSide = RIGHT;
                nodeC.left = nodeB;
                nodeC.right = nodeA;
                break;
            case 2:
                // link between nodeB and parent of nodeA
                nodeB.parent = nodeA.parent;
                nodeB.parentSide = nodeA.parentSide;
                if (nodeB.parent !== null){
                    nodeB.parentSide === LEFT?nodeB.parent.left = nodeB:nodeB.parent.right = nodeB;
                }
                // link between nodeA and left child of nodeB
                nodeA.right = nodeB.left;
                if (nodeA.right !== null){
                    nodeA.right.parent = nodeA;
                    nodeA.right.parentSide = RIGHT;
                    nodeA.rd = 1 + Math.max(nodeA.right.rd,nodeA.right.ld);
                }else {
                    nodeA.rd = 0;
                }
                // update nodeA
                nodeA.parent = nodeB;
                nodeA.parentSide = LEFT;
                nodeB.left = nodeA;
                break;
            case 3:
                // link between nodeB and right child of nodeC
                nodeB.left = nodeC.right;
                if (nodeB.left !== null){
                    nodeB.left.parent = nodeB;
                    nodeB.left.parentSide = LEFT;
                    nodeB.ld = 1 + Math.max(nodeB.left.ld,nodeB.left.rd);
                }else{
                    nodeB.ld = 0;
                }
                // link between nodeA and left child of nodeC
                nodeA.right = nodeC.left;
                if (nodeA.right !== null){
                    nodeA.right.parent = nodeA;
                    nodeA.right.parentSide = RIGHT;
                    nodeA.rd = 1 + Math.max(nodeA.right.ld,nodeA.right.rd);
                }else{
                    nodeA.rd = 0;
                }
                // link between nodeC and parent of nodeA
                nodeC.parent = nodeA.parent;
                nodeC.parentSide = nodeA.parentSide;
                if (nodeC.parent !== null){
                    nodeC.parentSide === LEFT?nodeC.parent.left = nodeC:nodeC.parent.right = nodeC;
                }
                nodeA.parent = nodeC;
                nodeA.parentSide = LEFT;
                nodeB.parent = nodeC;
                nodeC.left = nodeA;
                nodeC.right = nodeB;
        }
    }
}

export class RedBlackTree extends Tree<RedBlackNode>{
    addNode(val:number){
        const curNode = this.addHelper(this.root,val);
        const nxt = new RedBlackNode(val,curNode,ROOT,RED);
        if (curNode === null){
            this.root = nxt;
            nxt.color = BLACK;
        }else if (curNode.val > val){
            curNode.left = nxt;
            nxt.parentSide = LEFT;
        }else{
            curNode.right = nxt;
            nxt.parentSide = RIGHT;
        }
        this.insertRotate(nxt);
    }

    private insertRotate(z:RedBlackNode){
        while (z.parent !== null && z.parent.color === RED){
            const grandparent:RedBlackNode = z.parent.parent!, parent = z.parent, uncle:RedBlackNode|null = z.parent.color === LEFT?grandparent.right: grandparent.left;
            if (uncle !== null && uncle.color === RED){
                uncle.color = BLACK;
                parent.color =BLACK;
                grandparent.color = RED;
                z = grandparent;
            // LEFT rotation in LR situation
            }else if (parent.parentSide === LEFT && z.parentSide === RIGHT){      
                z.parent = grandparent;
                z.parentSide = LEFT;
                grandparent.left = z;
                parent.parent = z;
                parent.right = z.left;
                if (parent.right !== null){
                    parent.right.parent = parent;
                    parent.right.parentSide = RIGHT;
                }
                z.left = parent;
                z = parent;
            // RIGHT rotation in RL situation
            }else if (parent.parentSide === RIGHT && z.parentSide === LEFT){      
                z.parent = grandparent;
                z.parentSide = RIGHT;
                grandparent.right = z;
                parent.parent = z;
                parent.left = z.right;
                if (parent.left !== null){
                    parent.left.parent = parent;
                    parent.left.parentSide = LEFT;
                }
                z.right = parent;
                z = parent;
            }else if (parent.parentSide === LEFT && z.parentSide === LEFT){
                parent.parent = grandparent.parent;
                parent.parentSide = grandparent.parentSide;
                if (parent.parent !== null){
                    parent.parentSide === LEFT?parent.parent.left = parent:parent.parent.right = parent;
                }
                parent.color = BLACK;
                grandparent.left = parent.right;
                if (grandparent.left !== null){
                    grandparent.left.parent = grandparent;
                    grandparent.left.parentSide = LEFT;
                }
                parent.right = grandparent;
                grandparent.parent = parent;
                grandparent.color = RED;
                grandparent.parentSide = RIGHT;
            }else{
                parent.parent = grandparent.parent;
                parent.parentSide = grandparent.parentSide;
                if (parent.parent !== null){
                    parent.parentSide === LEFT?parent.parent.left = parent:parent.parent.right = parent;
                }
                parent.color = BLACK;
                grandparent.right = parent.left;
                if (grandparent.right !== null){
                    grandparent.right.parent = grandparent;
                    grandparent.right.parentSide = RIGHT;
                }
                parent.left = grandparent;
                grandparent.parent = parent;
                grandparent.color = RED;
                grandparent.parentSide = LEFT;
            }
        }
        if (z.parent !== null){
            if (z.parent.parent === null){
                this.root = z.parent;
            }
        }
        this.root!.color = BLACK;
    }

    deleteNode(val:number){
        let cur = this.dfs(val,this.root);
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
                    this.root = null;
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
                    this.root = cur.right;
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
                    this.root = cur.left;
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
        // if (curColor === BLACK) this.update(cur);
        //this.cur = this.root;
    }
}


export class SegmentTree extends Tree<SegmentNode>{
    data:number[];
    len:number;
    constructor(data:number[],len:number){
        super();
        this.data = data;
        this.len = len;
        this.root = this.generator(data,0,len-1);
    }
    generator(data:number[], l: number, r: number):SegmentNode{
        if (l === r){
            return new SegmentNode(data[l],null,ROOT,{low:l,up:l});
        }
        const mid = l+Math.floor((r-l)/2);
        const left = this.generator(data,l,mid), right = this.generator(data,mid+1,r);
        const cur = new SegmentNode(left.val+right.val,null,ROOT,{low:l,up:l});
        left.parent = cur;
        left.parentSide = LEFT;
        right.parent = cur;
        right.parentSide = RIGHT;
        cur.left = left;
        cur.right = right;
        return cur;
    }
    update(Node:SegmentNode|null){
        if (Node === null) return;
        const lVal = Node.left === null?0:Node.left.val, rVal = Node.right === null?0:Node.right.val;
        Node.val = lVal + rVal;
    }
    changeVal(idx:number,val:number):SegmentNode{
        this.data[idx] = val;
        let cur = this.root;
        while (cur!.span.low !== cur!.span.up){
            if (cur!.left !== null && cur!.left.span.up >= idx ){
                cur = cur!.left;
            }else{
                cur = cur!.right;
            }
        }
        cur!.val = val;
        return cur!;
    }
}

export class SplayTree extends Tree<TreeNode>{

    splay(Node:TreeNode){
        // root
        if (Node.parent === null){
            this.root = Node;
            return;
        } 
        // child of root
        if (Node.parent.parent === null){
            const Root = Node.parent;
            if (Node.parentSide === LEFT){
                Root.left = Node.right;
                if (Root.left !== null){
                    Root.left.parent = Root;
                    Root.left.parentSide = LEFT;
                }
                Node.right = Root;
                Root.parentSide = RIGHT;
            }else{
                Root.right = Node.left;
                if (Root.right !== null){
                    Root.right.parent = Root;
                    Root.right.parentSide = RIGHT;
                }
                Node.left = Root;
                Root.parentSide = LEFT;
            }
            Root.parent = Node;
            Node.parent = null;
            Node.parentSide = ROOT;
            this.root = Node;
            return;
        }
        const parent = Node.parent, grandparent = Node.parent.parent;
        const nodeDir = Node.parentSide, parentDir = parent.parentSide;
        // link between node to great grandparent
        Node.parent = grandparent.parent;
        Node.parentSide = grandparent.parentSide;
        if (Node.parent !== null){
            Node.parentSide === LEFT?Node.parent.left = Node:Node.parent.right = Node;
        }
        if (nodeDir === parentDir){
            if (nodeDir === LEFT){
                // link between parent and child of Node
                parent.left = Node.right;
                if (parent.left !== null){
                    parent.left.parent = parent;
                    parent.left.parentSide = LEFT;
                }
                // link between grandparent and child of parent
                grandparent.left = parent.right;
                if (grandparent.left !== null){
                    grandparent.left.parent = grandparent;
                    grandparent.left.parentSide = LEFT;
                }
                Node.right = parent;
                parent.parentSide = RIGHT;
                parent.right = grandparent;
                grandparent.parentSide = RIGHT;
            }else{
                // link between parent and child of Node
                parent.right = Node.left;
                if (parent.right !== null){
                    parent.right.parent = parent;
                    parent.right.parentSide = RIGHT;
                }
                // link between grandparent and child of parent
                grandparent.right = parent.left;
                if (grandparent.right !== null){
                    grandparent.right.parent = grandparent;
                    grandparent.right.parentSide = RIGHT;
                }
                Node.left = parent;
                parent.parentSide = LEFT;
                parent.left = grandparent;
                grandparent.parentSide = LEFT;
            }
            // reverse link between parent and grandparent
            grandparent.parent = parent;
            parent.parent = Node;
        }else{
            if (nodeDir === RIGHT){
                grandparent.left = Node.right;
                if (grandparent.left !== null){
                    grandparent.left.parent = grandparent;
                    grandparent.left.parentSide = LEFT;
                }
                parent.right = Node.left;
                if (parent.right !== null){
                    parent.right.parent = parent;
                    parent.right.parentSide = RIGHT;
                }
                Node.left = parent;
                Node.right = grandparent;
                grandparent.parentSide = RIGHT;
            }else{
                grandparent.right = Node.left;
                if (grandparent.right !== null){
                    grandparent.right.parent = grandparent;
                    grandparent.right.parentSide = RIGHT;
                }
                parent.left = Node.right;
                if (parent.left !== null){
                    parent.left.parent = parent;
                    parent.left.parentSide = LEFT;
                }
                Node.right = parent;
                Node.left = grandparent;
                grandparent.parentSide = LEFT;
            }
            parent.parent = Node;
            grandparent.parent = Node;
        }
        this.splay(Node);
    }

    delete(Node:TreeNode){
        this.splay(Node);
        if (Node.left === null && Node.right === null){
            this.root = null;
        }else if (Node.left === null){
            this.root = Node.right;
            this.root!.parent = null;
            this.root!.parentSide = ROOT;
        }else{
            const right = Node.right, left = Node.left, leftMax = this.findMax(left);
            Node.left.parent = null;
            Node.left.parentSide = ROOT;
            this.root = Node.left;
            this.splay(leftMax);
            leftMax.right = right;
            if (right !== null) right.parent = leftMax;
        }
    }

    private findMax(Node:TreeNode){
        if (Node.right !== null){
            Node = Node.right;
        }
        return Node;
    }
}

export class TrieTree<TrieNode>{
    root:TrieNode;
    nodes:number[];
    constructor(root:TrieNode){
        this.root = root;
        this.nodes = new Array(7).fill(0);
    }
}

interface BNodeType{
    keys:number[];
    children:BNode[];
    parent:BNode|null;
    isLeaf:boolean;
    id:String;
}
export class BTree<BNode extends BNodeType>{
    Order:number;
    root:BNodeType|null;
    constructor(Order:number){
        this.root = null;
        this.Order = Order;
    }

    split(Node:BNodeType){
        // no further split
        if (Node.keys.length < this.Order){
            return;
        }
        // indices probably not right; wait for fixes
        const children:BNodeType[] = Node.children, keys:number[] = Node.keys, isLeaf = Node.isLeaf, parent:BNodeType|null = Node.parent, id = Node.id;
        const breakPoint = Math.floor(this.Order/2)-1, bpKey = keys[breakPoint], leftKeys = keys.slice(0,breakPoint), rightKeys = keys.slice(breakPoint+1,this.Order-1);
        const leftChildren = children.slice(0,breakPoint), rightChildren = children.slice(breakPoint,this.Order);
        const left = new BNode(), right = new BNode();
        left.keys = leftKeys;
        right.keys = rightKeys;
        if (!isLeaf){
            left.isLeaf = false;
            right.isLeaf = false;
        }
        left.children = leftChildren;
        right.children = rightChildren;
        // if split root
        if (parent === null){
            const root = new BNode();
            this.root = root;
            root.isLeaf = false;
            root.keys = [bpKey];
            root.children = [left,right];
            left.parent = root;
            right.parent = root;
            return;
        }else{
            // need to identify the node pointer and replace it with two maybe assign an id attribute
            let idx = 0;
            for (let i = 0; i < parent.children.length; i++){
                if (parent.children[i].id === id){
                    idx = i;
                    break;
                }
            }
            left.parent = parent;
            right.parent = parent;
            // tired gonna jot down and proof read later
            parent.keys = parent.keys.splice(idx,0,bpKey);
            parent.children = parent.children.splice(idx,1,left,right);
            this.split(parent);
        }
    }
    // gonna fix it later 
    delete(Node:BNode,val:number){
        
    }
}
