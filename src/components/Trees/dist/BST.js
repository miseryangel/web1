"use strict";
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var hooks_1 = require("../../app/hooks");
var Tree_1 = require("../bits/Tree");
var react_1 = require("react");
var Tree_2 = require("../../slices/Tree");
function ConditionalTreeRenderer(props) {
    if (props.root === null) {
        return (React.createElement(core_1.Box, { pt: 5, pb: 2 },
            React.createElement(core_1.Typography, { variant: "h6", color: "secondary" }, "Tree is Empty!")));
    }
    else {
        return React.createElement(Tree_1.Tree, { root: props.root, active: props.active });
    }
}
var BST = function () {
    var dispatch = hooks_1.useAppDispatch();
    var tree = hooks_1.useAppSelector(function (state) { return state.bst.tree; });
    var root = tree.root;
    var visited = hooks_1.useAppSelector(function (state) { return state.bst.visited; });
    var _a = react_1.useState(-1), val = _a[0], setVal = _a[1];
    var _b = react_1.useState(-1), nodeVal = _b[0], setNodeVal = _b[1];
    var _c = react_1.useState(""), msg = _c[0], setMsg = _c[1];
    var _d = react_1.useState(false), visible = _d[0], setVisible = _d[1];
    var _e = react_1.useState(1), traverseChoice = _e[0], setTraverse = _e[1];
    react_1.useEffect(function () {
        console.log(tree);
    }, [visible]);
    var msgHandler = function (message) {
        setVisible(true);
        setMsg(message);
        var interval = setInterval(function () { return setVisible(false); }, 2000);
        return function () { return clearInterval(interval); };
    };
    var inOrder = function (node) {
        if (node === null)
            return;
        inOrder(node.left);
        var interval = setInterval(function () { return setVal(node.val); }, 500);
        inOrder(node.right);
        return function () { return clearInterval(interval); };
    };
    var preOrder = function (node) {
        if (node === null)
            return;
        var interval = setInterval(function () { return setVal(node.val); }, 500);
        preOrder(node.left);
        preOrder(node.right);
        return function () { return clearInterval(interval); };
    };
    var postOrder = function (node) {
        if (node === null)
            return;
        postOrder(node.left);
        postOrder(node.right);
        var interval = setInterval(function () { return setVal(node.val); }, 500);
        return function () { return clearInterval(interval); };
    };
    var traverseHandler = function () {
        switch (traverseChoice) {
            case 1:
                inOrder(root);
                break;
            case 2:
                preOrder(root);
                break;
            case 3:
                postOrder(root);
                break;
        }
        setVal(-1);
    };
    var dfs = function (node, value) {
        if (node === null)
            return 0;
        if (value > node.val) {
            return dfs(node.right, value);
        }
        return dfs(node.left, value);
    };
    return (React.createElement(core_1.Box, { pt: 5 },
        React.createElement(core_1.Grid, { container: true, spacing: 3, justify: "center" },
            React.createElement(core_1.Grid, { item: true, xs: 8 },
                React.createElement(ConditionalTreeRenderer, { root: root, active: val })),
            React.createElement(core_1.Grid, { item: true, xs: 3 },
                React.createElement(core_1.ButtonGroup, { orientation: "vertical", "aria-label": "vertical outlined button group", color: "primary" },
                    React.createElement(core_1.TextField, { className: "outlined-number", label: "Number", type: "number", InputLabelProps: {
                            shrink: true
                        }, InputProps: {
                            inputProps: {
                                max: 100, min: 0
                            }
                        }, defaultValue: val, variant: "outlined", size: "small", onChange: function (e) { return setVal(+e.target.value); }, style: { marginBottom: "10px" } }),
                    React.createElement(core_1.TextField, { className: "outlined-number", label: "Node", type: "number", InputLabelProps: {
                            shrink: true
                        }, InputProps: {
                            inputProps: {
                                max: 100, min: 0
                            }
                        }, defaultValue: nodeVal, variant: "outlined", size: "small", onChange: function (e) { return setNodeVal(+e.target.value); }, style: { marginBottom: "10px" } }),
                    React.createElement(core_1.FormControl, { variant: "outlined", size: "small" },
                        React.createElement(core_1.Select, { labelId: "order-label", className: "order-select", value: traverseChoice, label: "Order", autoWidth: true, type: "number", onChange: function (e) {
                                var op = e.target.value;
                                setTraverse(op);
                            } },
                            React.createElement(core_1.MenuItem, { value: 1 }, "inOrder"),
                            React.createElement(core_1.MenuItem, { value: 2 }, "preOrder"),
                            React.createElement(core_1.MenuItem, { value: 3 }, "postOrder")))),
                React.createElement(core_1.ButtonGroup, { orientation: "vertical", "aria-label": "vertical outlined button group", color: "primary" },
                    React.createElement(core_1.Button, { onClick: function () {
                            if (visited.has(val)) {
                                msgHandler("TreeNode already exists!");
                            }
                            else {
                                var depth = dfs(root, val);
                                if (depth > 5) {
                                    msgHandler("Tree has reached the height limit !");
                                    return;
                                }
                                dispatch(Tree_2.addNode(val));
                            }
                        } }, "insert"),
                    React.createElement(core_1.Button, { onClick: function () {
                            if (!visited.has(val)) {
                                msgHandler("TreeNode doesn't exist!");
                            }
                            else {
                                dispatch(Tree_2.deleteNode(val));
                            }
                        } }, "remove"),
                    React.createElement(core_1.Button, { onClick: traverseHandler }, "traverse"))),
            visible && React.createElement(core_1.Typography, { color: "secondary", variant: "h6" }, msg))));
};
exports["default"] = BST;
