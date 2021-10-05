"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.BTree = exports.TrieTree = exports.SplayTree = exports.SegmentTree = exports.RedBlackTree = exports.AVLTree = exports.BSTree = exports.Tree = void 0;
var node_1 = require("./node");
var symbol_1 = require("./symbol");
var Tree = /** @class */ (function () {
    function Tree() {
        this.root = null;
    }
    Tree.prototype.addHelper = function (node, val) {
        if (node === null)
            return null;
        if (node.val > val) {
            if (node.left === null) {
                return node;
            }
            return this.addHelper(node.left, val);
        }
        else {
            if (node.right === null) {
                return node;
            }
            return this.addHelper(node.right, val);
        }
    };
    Tree.prototype.dfs = function (val, node) {
        if (node === null)
            return null;
        if (node.val > val) {
            return this.dfs(val, node.left);
        }
        else if (node.val === val) {
            return node;
        }
        else {
            return this.dfs(val, node.right);
        }
    };
    return Tree;
}());
exports.Tree = Tree;
var BSTree = /** @class */ (function (_super) {
    __extends(BSTree, _super);
    function BSTree() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BSTree.prototype.addNode = function (val) {
        var curNode = this.addHelper(this.root, val);
        if (curNode === null) {
            this.root = new node_1.TreeNode(val, null, symbol_1.ROOT);
        }
        else if (curNode.val > val) {
            curNode.left = new node_1.TreeNode(val, curNode, symbol_1.LEFT);
        }
        else {
            curNode.right = new node_1.TreeNode(val, curNode, symbol_1.RIGHT);
        }
    };
    BSTree.prototype.deleteNode = function (val) {
        var cur = this.dfs(val, this.root);
        if (cur === null)
            return;
        // leaf node
        if (cur.left === null && cur.right === null) {
            switch (cur.parentSide) {
                case symbol_1.LEFT:
                    cur.parent.left = null;
                    break;
                case symbol_1.RIGHT:
                    cur.parent.right = null;
                    break;
                case symbol_1.ROOT:
                    this.root = null;
                    break;
            }
            // single child
        }
        else if (cur.left === null) {
            cur.right.parentSide = cur.parentSide;
            cur.right.parent = cur.parent;
            switch (cur.parentSide) {
                case symbol_1.LEFT:
                    cur.parent.left = cur.right;
                    break;
                case symbol_1.RIGHT:
                    cur.parent.right = cur.right;
                    break;
                case symbol_1.ROOT:
                    this.root = cur.right;
                    break;
            }
            // single child
        }
        else if (cur.right === null) {
            cur.left.parentSide = cur.parentSide;
            cur.left.parent = cur.parent;
            switch (cur.parentSide) {
                case symbol_1.LEFT:
                    cur.parent.left = cur.left;
                    break;
                case symbol_1.RIGHT:
                    cur.parent.right = cur.left;
                    break;
                case symbol_1.ROOT:
                    this.root = cur.left;
                    break;
            }
            // find swap cur either with predecessor or successor and then remove the leaf node
        }
        else {
            var predecessor = cur.left, successor = cur.right;
            var l = 0, r = 0;
            while (predecessor.right !== null) {
                predecessor = predecessor.right;
                l++;
            }
            while (successor.left !== null) {
                successor = successor.left;
                r++;
            }
            if (l >= r) {
                cur.val = predecessor.val;
                if (predecessor.parentSide === symbol_1.LEFT) {
                    cur.left = predecessor.left;
                    if (cur.left !== null)
                        cur.left.parent = cur;
                }
                else {
                    predecessor.parent.right = predecessor.left;
                    if (predecessor.left !== null) {
                        predecessor.left.parent = predecessor.parent;
                        predecessor.left.parentSide = symbol_1.RIGHT;
                    }
                }
            }
            else {
                cur.val = successor.val;
                if (successor.parentSide === symbol_1.RIGHT) {
                    cur.right = successor.right;
                    if (cur.right !== null)
                        cur.right.parent = cur;
                }
                else {
                    successor.parent.left = successor.right;
                    if (successor.right !== null) {
                        successor.right.parent = successor.parent;
                        successor.right.parentSide = symbol_1.LEFT;
                    }
                }
            }
        }
    };
    return BSTree;
}(Tree));
exports.BSTree = BSTree;
var AVLTree = /** @class */ (function (_super) {
    __extends(AVLTree, _super);
    function AVLTree() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AVLTree.prototype.addNode = function (val) {
        var curNode = this.addHelper(this.root, val);
        if (curNode === null) {
            this.root = new node_1.AVLNode(val, null, 0, 0, symbol_1.ROOT);
        }
        else if (curNode.val > val) {
            curNode.left = new node_1.AVLNode(val, curNode, 0, 0, symbol_1.LEFT);
        }
        else {
            curNode.right = new node_1.AVLNode(val, curNode, 0, 0, symbol_1.RIGHT);
        }
        this.update(curNode);
    };
    AVLTree.prototype.deleteNode = function (val) {
        var cur = this.dfs(val, this.root);
        if (cur === null)
            return;
        // leaf node
        if (cur.left === null && cur.right === null) {
            switch (cur.parentSide) {
                case symbol_1.LEFT:
                    cur.parent.left = null;
                    break;
                case symbol_1.RIGHT:
                    cur.parent.right = null;
                    break;
                case symbol_1.ROOT:
                    this.root = null;
                    break;
            }
            cur = cur.parent;
            // single child
        }
        else if (cur.left === null) {
            cur.right.parentSide = cur.parentSide;
            cur.right.parent = cur.parent;
            switch (cur.parentSide) {
                case symbol_1.LEFT:
                    cur.parent.left = cur.right;
                    break;
                case symbol_1.RIGHT:
                    cur.parent.right = cur.right;
                    break;
                case symbol_1.ROOT:
                    this.root = cur.right;
                    break;
            }
            cur = cur.parent;
            // single child
        }
        else if (cur.right === null) {
            cur.left.parentSide = cur.parentSide;
            cur.left.parent = cur.parent;
            switch (cur.parentSide) {
                case symbol_1.LEFT:
                    cur.parent.left = cur.left;
                    break;
                case symbol_1.RIGHT:
                    cur.parent.right = cur.left;
                    break;
                case symbol_1.ROOT:
                    this.root = cur.left;
                    break;
            }
            cur = cur.parent;
            // find swap cur either with predecessor or successor and then remove the leaf node
        }
        else {
            var predecessor = cur.left, successor = cur.right;
            var l = 0, r = 0;
            while (predecessor.right !== null) {
                predecessor = predecessor.right;
                l++;
            }
            while (successor.left !== null) {
                successor = successor.left;
                r++;
            }
            if (l >= r) {
                cur.val = predecessor.val;
                if (predecessor.parentSide === symbol_1.LEFT) {
                    cur.left = predecessor.left;
                    if (cur.left !== null)
                        cur.left.parent = cur;
                }
                else {
                    predecessor.parent.right = predecessor.left;
                    if (predecessor.left !== null) {
                        predecessor.left.parent = predecessor.parent;
                        predecessor.left.parentSide = symbol_1.RIGHT;
                    }
                    cur = predecessor.parent;
                }
            }
            else {
                cur.val = successor.val;
                if (successor.parentSide === symbol_1.RIGHT) {
                    cur.right = successor.right;
                    if (cur.right !== null)
                        cur.right.parent = cur;
                }
                else {
                    successor.parent.left = successor.right;
                    if (successor.right !== null) {
                        successor.right.parent = successor.parent;
                        successor.right.parentSide = symbol_1.LEFT;
                    }
                    cur = successor.parent;
                }
            }
        }
        this.update(cur);
    };
    AVLTree.prototype.update = function (node) {
        if (node === null)
            return;
        node.ld = node.left === null ? 0 : 1 + Math.max(node.left.ld, node.left.rd);
        node.rd = node.right === null ? 0 : 1 + Math.max(node.right.ld, node.right.rd);
        if (node.ld > node.rd + 1) {
            if (node.left.ld > node.left.rd) {
                this.rotation(node, node.left, node.left.left, 0);
            }
            else {
                this.rotation(node, node.left, node.left.right, 1);
            }
        }
        else if (node.rd > node.ld + 1) {
            if (node.right.rd > node.right.ld) {
                this.rotation(node, node.right, node.right.right, 2);
            }
            else {
                this.rotation(node, node.right, node.right.left, 3);
            }
        }
        if (node.parent === null) {
            this.root = node;
            return;
        }
        this.update(node.parent);
    };
    // two issues first I need to update the depth no matter the child is null or not, secondly reassign root.
    AVLTree.prototype.rotation = function (nodeA, nodeB, nodeC, pattern) {
        switch (pattern) {
            case 0:
                // link parentA and nodeB
                nodeB.parent = nodeA.parent;
                nodeB.parentSide = nodeA.parentSide;
                if (nodeB.parent !== null) {
                    nodeB.parentSide === symbol_1.LEFT ? nodeB.parent.left = nodeB : nodeB.parent.right = nodeB;
                }
                // link nodeA and nodeB.right
                nodeA.left = nodeB.right;
                if (nodeA.left !== null) {
                    nodeA.left.parent = nodeA;
                    nodeA.left.parentSide = symbol_1.LEFT;
                    nodeA.ld = 1 + Math.max(nodeA.left.ld, nodeA.left.rd);
                }
                else {
                    nodeA.ld = 0;
                }
                // update nodeA
                nodeA.parent = nodeB;
                nodeA.parentSide = symbol_1.RIGHT;
                nodeB.right = nodeA;
                break;
            case 1:
                // link between nodeB and nodeC.left child
                nodeB.right = nodeC.left;
                if (nodeB.right !== null) {
                    nodeB.right.parent = nodeB;
                    nodeB.right.parentSide = symbol_1.RIGHT;
                    nodeB.rd = 1 + Math.max(nodeB.right.ld, nodeB.right.rd);
                }
                else {
                    nodeB.rd = 0;
                }
                // link between nodeA and right child of nodeC
                nodeA.left = nodeC.right;
                if (nodeA.left !== null) {
                    nodeA.left.parent = nodeA;
                    nodeA.left.parentSide = symbol_1.LEFT;
                    nodeA.ld = 1 + Math.max(nodeA.left.ld, nodeA.left.rd);
                }
                else {
                    nodeA.ld = 0;
                }
                // link between nodeC and parent of nodeA
                nodeC.parent = nodeA.parent;
                nodeC.parentSide = nodeA.parentSide;
                if (nodeC.parent !== null) {
                    nodeC.parentSide === symbol_1.LEFT ? nodeC.parent.left = nodeC : nodeC.parent.right = nodeC;
                }
                nodeB.parent = nodeC;
                nodeA.parent = nodeC;
                nodeA.parentSide = symbol_1.RIGHT;
                nodeC.left = nodeB;
                nodeC.right = nodeA;
                break;
            case 2:
                // link between nodeB and parent of nodeA
                nodeB.parent = nodeA.parent;
                nodeB.parentSide = nodeA.parentSide;
                if (nodeB.parent !== null) {
                    nodeB.parentSide === symbol_1.LEFT ? nodeB.parent.left = nodeB : nodeB.parent.right = nodeB;
                }
                // link between nodeA and left child of nodeB
                nodeA.right = nodeB.left;
                if (nodeA.right !== null) {
                    nodeA.right.parent = nodeA;
                    nodeA.right.parentSide = symbol_1.RIGHT;
                    nodeA.rd = 1 + Math.max(nodeA.right.rd, nodeA.right.ld);
                }
                else {
                    nodeA.rd = 0;
                }
                // update nodeA
                nodeA.parent = nodeB;
                nodeA.parentSide = symbol_1.LEFT;
                nodeB.left = nodeA;
                break;
            case 3:
                // link between nodeB and right child of nodeC
                nodeB.left = nodeC.right;
                if (nodeB.left !== null) {
                    nodeB.left.parent = nodeB;
                    nodeB.left.parentSide = symbol_1.LEFT;
                    nodeB.ld = 1 + Math.max(nodeB.left.ld, nodeB.left.rd);
                }
                else {
                    nodeB.ld = 0;
                }
                // link between nodeA and left child of nodeC
                nodeA.right = nodeC.left;
                if (nodeA.right !== null) {
                    nodeA.right.parent = nodeA;
                    nodeA.right.parentSide = symbol_1.RIGHT;
                    nodeA.rd = 1 + Math.max(nodeA.right.ld, nodeA.right.rd);
                }
                else {
                    nodeA.rd = 0;
                }
                // link between nodeC and parent of nodeA
                nodeC.parent = nodeA.parent;
                nodeC.parentSide = nodeA.parentSide;
                if (nodeC.parent !== null) {
                    nodeC.parentSide === symbol_1.LEFT ? nodeC.parent.left = nodeC : nodeC.parent.right = nodeC;
                }
                nodeA.parent = nodeC;
                nodeA.parentSide = symbol_1.LEFT;
                nodeB.parent = nodeC;
                nodeC.left = nodeA;
                nodeC.right = nodeB;
        }
    };
    return AVLTree;
}(Tree));
exports.AVLTree = AVLTree;
var RedBlackTree = /** @class */ (function (_super) {
    __extends(RedBlackTree, _super);
    function RedBlackTree() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RedBlackTree.prototype.addNode = function (val) {
        var curNode = this.addHelper(this.root, val);
        var nxt = new node_1.RedBlackNode(val, curNode, symbol_1.ROOT, symbol_1.RED);
        if (curNode === null) {
            this.root = nxt;
            nxt.color = symbol_1.BLACK;
        }
        else if (curNode.val > val) {
            curNode.left = nxt;
            nxt.parentSide = symbol_1.LEFT;
        }
        else {
            curNode.right = nxt;
            nxt.parentSide = symbol_1.RIGHT;
        }
        this.insertRotate(nxt);
    };
    RedBlackTree.prototype.insertRotate = function (z) {
        while (z.parent !== null && z.parent.color === symbol_1.RED) {
            var grandparent = z.parent.parent, parent = z.parent, uncle = z.parent.color === symbol_1.LEFT ? grandparent.right : grandparent.left;
            if (uncle !== null && uncle.color === symbol_1.RED) {
                uncle.color = symbol_1.BLACK;
                parent.color = symbol_1.BLACK;
                grandparent.color = symbol_1.RED;
                z = grandparent;
                // LEFT rotation in LR situation
            }
            else if (parent.parentSide === symbol_1.LEFT && z.parentSide === symbol_1.RIGHT) {
                z.parent = grandparent;
                z.parentSide = symbol_1.LEFT;
                grandparent.left = z;
                parent.parent = z;
                parent.right = z.left;
                if (parent.right !== null) {
                    parent.right.parent = parent;
                    parent.right.parentSide = symbol_1.RIGHT;
                }
                z.left = parent;
                z = parent;
                // RIGHT rotation in RL situation
            }
            else if (parent.parentSide === symbol_1.RIGHT && z.parentSide === symbol_1.LEFT) {
                z.parent = grandparent;
                z.parentSide = symbol_1.RIGHT;
                grandparent.right = z;
                parent.parent = z;
                parent.left = z.right;
                if (parent.left !== null) {
                    parent.left.parent = parent;
                    parent.left.parentSide = symbol_1.LEFT;
                }
                z.right = parent;
                z = parent;
            }
            else if (parent.parentSide === symbol_1.LEFT && z.parentSide === symbol_1.LEFT) {
                parent.parent = grandparent.parent;
                parent.parentSide = grandparent.parentSide;
                if (parent.parent !== null) {
                    parent.parentSide === symbol_1.LEFT ? parent.parent.left = parent : parent.parent.right = parent;
                }
                parent.color = symbol_1.BLACK;
                grandparent.left = parent.right;
                if (grandparent.left !== null) {
                    grandparent.left.parent = grandparent;
                    grandparent.left.parentSide = symbol_1.LEFT;
                }
                parent.right = grandparent;
                grandparent.parent = parent;
                grandparent.color = symbol_1.RED;
                grandparent.parentSide = symbol_1.RIGHT;
            }
            else {
                parent.parent = grandparent.parent;
                parent.parentSide = grandparent.parentSide;
                if (parent.parent !== null) {
                    parent.parentSide === symbol_1.LEFT ? parent.parent.left = parent : parent.parent.right = parent;
                }
                parent.color = symbol_1.BLACK;
                grandparent.right = parent.left;
                if (grandparent.right !== null) {
                    grandparent.right.parent = grandparent;
                    grandparent.right.parentSide = symbol_1.RIGHT;
                }
                parent.left = grandparent;
                grandparent.parent = parent;
                grandparent.color = symbol_1.RED;
                grandparent.parentSide = symbol_1.LEFT;
            }
        }
        if (z.parent !== null) {
            if (z.parent.parent === null) {
                this.root = z.parent;
            }
        }
        this.root.color = symbol_1.BLACK;
    };
    RedBlackTree.prototype.deleteNode = function (val) {
        var cur = this.dfs(val, this.root);
        if (cur === null)
            return;
        var curColor = cur.color;
        if (cur.left === null && cur.right === null) {
            switch (cur.parentSide) {
                case symbol_1.LEFT:
                    cur.parent.left = null;
                    break;
                case symbol_1.RIGHT:
                    cur.parent.right = null;
                    break;
                case symbol_1.ROOT:
                    this.root = null;
                    break;
            }
        }
        else if (cur.left === null) {
            cur.right.parentSide = cur.parentSide;
            cur.right.parent = cur.parent;
            switch (cur.parentSide) {
                case symbol_1.LEFT:
                    cur.parent.left = cur.right;
                    break;
                case symbol_1.RIGHT:
                    cur.parent.right = cur.right;
                    break;
                case symbol_1.ROOT:
                    this.root = cur.right;
                    break;
            }
        }
        else if (cur.right === null) {
            cur.left.parentSide = cur.parentSide;
            cur.left.parent = cur.parent;
            switch (cur.parentSide) {
                case symbol_1.LEFT:
                    cur.parent.left = cur.left;
                    break;
                case symbol_1.RIGHT:
                    cur.parent.right = cur.left;
                    break;
                case symbol_1.ROOT:
                    this.root = cur.left;
                    break;
            }
        }
        else {
            var predecessor = cur.left, successor = cur.right;
            var l = 0, r = 0;
            while (predecessor.right !== null) {
                predecessor = predecessor.right;
                l++;
            }
            while (successor.left !== null) {
                successor = successor.left;
                r++;
            }
            curColor = l >= r ? predecessor.color : successor.color;
            if (l >= r) {
                cur.val = predecessor.val;
                if (predecessor.parentSide === symbol_1.LEFT) {
                    cur.left = predecessor.left;
                    if (cur.left !== null)
                        cur.left.parent = cur;
                }
                else {
                    predecessor.parent.right = predecessor.left;
                    if (predecessor.left !== null) {
                        predecessor.left.parent = predecessor.parent;
                        predecessor.left.parentSide = symbol_1.RIGHT;
                    }
                    cur = predecessor.parent;
                }
            }
            else {
                cur.val = successor.val;
                if (successor.parentSide === symbol_1.RIGHT) {
                    cur.right = successor.right;
                    if (cur.right !== null)
                        cur.right.parent = cur;
                }
                else {
                    successor.parent.left = successor.right;
                    if (successor.right !== null) {
                        successor.right.parent = successor.parent;
                        successor.right.parentSide = symbol_1.LEFT;
                    }
                    cur = successor.parent;
                }
            }
        }
        // haven't updated
        // if (curColor === BLACK) this.update(cur);
        //this.cur = this.root;
    };
    return RedBlackTree;
}(Tree));
exports.RedBlackTree = RedBlackTree;
var SegmentTree = /** @class */ (function (_super) {
    __extends(SegmentTree, _super);
    function SegmentTree(data, len) {
        var _this = _super.call(this) || this;
        _this.data = data;
        _this.len = len;
        _this.root = _this.generator(data, 0, len - 1);
        return _this;
    }
    SegmentTree.prototype.generator = function (data, l, r) {
        if (l === r) {
            return new node_1.SegmentNode(data[l], null, symbol_1.ROOT, { low: l, up: l });
        }
        var mid = l + Math.floor((r - l) / 2);
        var left = this.generator(data, l, mid), right = this.generator(data, mid + 1, r);
        var cur = new node_1.SegmentNode(left.val + right.val, null, symbol_1.ROOT, { low: l, up: l });
        left.parent = cur;
        left.parentSide = symbol_1.LEFT;
        right.parent = cur;
        right.parentSide = symbol_1.RIGHT;
        cur.left = left;
        cur.right = right;
        return cur;
    };
    SegmentTree.prototype.update = function (Node) {
        if (Node === null)
            return;
        var lVal = Node.left === null ? 0 : Node.left.val, rVal = Node.right === null ? 0 : Node.right.val;
        Node.val = lVal + rVal;
    };
    SegmentTree.prototype.changeVal = function (idx, val) {
        this.data[idx] = val;
        var cur = this.root;
        while (cur.span.low !== cur.span.up) {
            if (cur.left !== null && cur.left.span.up >= idx) {
                cur = cur.left;
            }
            else {
                cur = cur.right;
            }
        }
        cur.val = val;
        return cur;
    };
    return SegmentTree;
}(Tree));
exports.SegmentTree = SegmentTree;
var SplayTree = /** @class */ (function (_super) {
    __extends(SplayTree, _super);
    function SplayTree() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SplayTree.prototype.splay = function (Node) {
        // root
        if (Node.parent === null) {
            this.root = Node;
            return;
        }
        // child of root
        if (Node.parent.parent === null) {
            var Root = Node.parent;
            if (Node.parentSide === symbol_1.LEFT) {
                Root.left = Node.right;
                if (Root.left !== null) {
                    Root.left.parent = Root;
                    Root.left.parentSide = symbol_1.LEFT;
                }
                Node.right = Root;
                Root.parentSide = symbol_1.RIGHT;
            }
            else {
                Root.right = Node.left;
                if (Root.right !== null) {
                    Root.right.parent = Root;
                    Root.right.parentSide = symbol_1.RIGHT;
                }
                Node.left = Root;
                Root.parentSide = symbol_1.LEFT;
            }
            Root.parent = Node;
            Node.parent = null;
            Node.parentSide = symbol_1.ROOT;
            this.root = Node;
            return;
        }
        var parent = Node.parent, grandparent = Node.parent.parent;
        var nodeDir = Node.parentSide, parentDir = parent.parentSide;
        // link between node to great grandparent
        Node.parent = grandparent.parent;
        Node.parentSide = grandparent.parentSide;
        if (Node.parent !== null) {
            Node.parentSide === symbol_1.LEFT ? Node.parent.left = Node : Node.parent.right = Node;
        }
        if (nodeDir === parentDir) {
            if (nodeDir === symbol_1.LEFT) {
                // link between parent and child of Node
                parent.left = Node.right;
                if (parent.left !== null) {
                    parent.left.parent = parent;
                    parent.left.parentSide = symbol_1.LEFT;
                }
                // link between grandparent and child of parent
                grandparent.left = parent.right;
                if (grandparent.left !== null) {
                    grandparent.left.parent = grandparent;
                    grandparent.left.parentSide = symbol_1.LEFT;
                }
                Node.right = parent;
                parent.parentSide = symbol_1.RIGHT;
                parent.right = grandparent;
                grandparent.parentSide = symbol_1.RIGHT;
            }
            else {
                // link between parent and child of Node
                parent.right = Node.left;
                if (parent.right !== null) {
                    parent.right.parent = parent;
                    parent.right.parentSide = symbol_1.RIGHT;
                }
                // link between grandparent and child of parent
                grandparent.right = parent.left;
                if (grandparent.right !== null) {
                    grandparent.right.parent = grandparent;
                    grandparent.right.parentSide = symbol_1.RIGHT;
                }
                Node.left = parent;
                parent.parentSide = symbol_1.LEFT;
                parent.left = grandparent;
                grandparent.parentSide = symbol_1.LEFT;
            }
            // reverse link between parent and grandparent
            grandparent.parent = parent;
            parent.parent = Node;
        }
        else {
            if (nodeDir === symbol_1.RIGHT) {
                grandparent.left = Node.right;
                if (grandparent.left !== null) {
                    grandparent.left.parent = grandparent;
                    grandparent.left.parentSide = symbol_1.LEFT;
                }
                parent.right = Node.left;
                if (parent.right !== null) {
                    parent.right.parent = parent;
                    parent.right.parentSide = symbol_1.RIGHT;
                }
                Node.left = parent;
                Node.right = grandparent;
                grandparent.parentSide = symbol_1.RIGHT;
            }
            else {
                grandparent.right = Node.left;
                if (grandparent.right !== null) {
                    grandparent.right.parent = grandparent;
                    grandparent.right.parentSide = symbol_1.RIGHT;
                }
                parent.left = Node.right;
                if (parent.left !== null) {
                    parent.left.parent = parent;
                    parent.left.parentSide = symbol_1.LEFT;
                }
                Node.right = parent;
                Node.left = grandparent;
                grandparent.parentSide = symbol_1.LEFT;
            }
            parent.parent = Node;
            grandparent.parent = Node;
        }
        this.splay(Node);
    };
    SplayTree.prototype["delete"] = function (Node) {
        this.splay(Node);
        if (Node.left === null && Node.right === null) {
            this.root = null;
        }
        else if (Node.left === null) {
            this.root = Node.right;
            this.root.parent = null;
            this.root.parentSide = symbol_1.ROOT;
        }
        else {
            var right = Node.right, left = Node.left, leftMax = this.findMax(left);
            Node.left.parent = null;
            Node.left.parentSide = symbol_1.ROOT;
            this.root = Node.left;
            this.splay(leftMax);
            leftMax.right = right;
            if (right !== null)
                right.parent = leftMax;
        }
    };
    SplayTree.prototype.findMax = function (Node) {
        if (Node.right !== null) {
            Node = Node.right;
        }
        return Node;
    };
    return SplayTree;
}(Tree));
exports.SplayTree = SplayTree;
var TrieTree = /** @class */ (function () {
    function TrieTree(root) {
        this.root = root;
        this.nodes = new Array(7).fill(0);
    }
    return TrieTree;
}());
exports.TrieTree = TrieTree;
var BTree = /** @class */ (function () {
    function BTree(Order) {
        this.root = null;
        this.Order = Order;
    }
    BTree.prototype.split = function (Node) {
        // no further split
        if (Node.keys.length < this.Order) {
            return;
        }
        // indices probably not right; wait for fixes
        var children = Node.children, keys = Node.keys, isLeaf = Node.isLeaf, parent = Node.parent, id = Node.id;
        var breakPoint = Math.floor(this.Order / 2) - 1, bpKey = keys[breakPoint], leftKeys = keys.slice(0, breakPoint), rightKeys = keys.slice(breakPoint + 1, this.Order - 1);
        var leftChildren = children.slice(0, breakPoint), rightChildren = children.slice(breakPoint, this.Order);
        var left = new node_1.BNode(), right = new node_1.BNode();
        left.keys = leftKeys;
        right.keys = rightKeys;
        if (!isLeaf) {
            left.isLeaf = false;
            right.isLeaf = false;
        }
        left.children = leftChildren;
        right.children = rightChildren;
        // if split root
        if (parent === null) {
            var root = new node_1.BNode();
            this.root = root;
            root.isLeaf = false;
            root.keys = [bpKey];
            root.children = [left, right];
            left.parent = root;
            right.parent = root;
            return;
        }
        else {
            // need to identify the node pointer and replace it with two maybe assign an id attribute
            var idx = 0;
            for (var i = 0; i < parent.children.length; i++) {
                if (parent.children[i].id === id) {
                    idx = i;
                    break;
                }
            }
            left.parent = parent;
            right.parent = parent;
            // tired gonna jot down and proof read later
            parent.keys = parent.keys.splice(idx, 0, bpKey);
            parent.children = parent.children.splice(idx, 1, left, right);
            this.split(parent);
        }
    };
    // gonna fix it later 
    BTree.prototype["delete"] = function (Node, val) {
    };
    return BTree;
}());
exports.BTree = BTree;
