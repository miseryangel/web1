"use strict";
exports.__esModule = true;
exports.Tree = void 0;
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var arrayStyle_1 = require("../Styles/arrayStyle");
exports.Tree = function (props) {
    var classes = arrayStyle_1.arrayStyles();
    var nodes = [];
    var q = [];
    q.push(props.root);
    while (q.length !== 0) {
        var tmp = [];
        var row = [];
        for (var i = 0; i < q.length; i++) {
            var cur = q[i];
            if (cur.left !== null)
                tmp.push(cur.left);
            if (cur.right !== null)
                tmp.push(cur.right);
            if (props.active === cur.val) {
                row.push(react_1["default"].createElement(core_1.Paper, { color: "#ff6600", className: classes.active, variant: "outlined", elevation: 24 }, cur.val));
            }
            else {
                row.push(react_1["default"].createElement(core_1.Paper, { variant: "outlined", square: true, elevation: 3 }, cur.val));
            }
        }
        q = tmp;
        nodes.push(react_1["default"].createElement(core_1.Grid, { className: "tree-row" }, row));
    }
    return (react_1["default"].createElement(core_1.Box, { pt: 5, pb: 2, width: "94.6%" },
        react_1["default"].createElement("div", { className: classes.root }, nodes)));
};
