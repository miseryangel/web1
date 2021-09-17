import { AVLNode, RedBlackNode } from './node';

export const LEFT = Symbol('left');
export const RIGHT = Symbol('right');
export const ROOT = Symbol('root');
export const RED = Symbol("red");
export const BLACK = Symbol("black");

export class Tree<T>{
    root:T|null;
    constructor(){
        this.root = null;
    }
}

export class AVLTree extends Tree<AVLNode>{

    update(node:AVLNode|null){
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
    rotation(nodeA:AVLNode,nodeB:AVLNode,nodeC:AVLNode,pattern:number){
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
                console.log(2);
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
    insertRotate(z:RedBlackNode){
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
}


