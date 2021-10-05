"use strict";
exports.__esModule = true;
exports.LList = void 0;
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var linkedListStyle_1 = require("../Styles/linkedListStyle");
exports.LList = function (props) {
    var classes = linkedListStyle_1.linkedListStyles();
    var arr = props.arr.map(function (val, index) {
        if (index === props.active) {
            return (react_1["default"].createElement(core_1.Paper, { color: "#ff6600", variant: "outlined", className: classes.active, elevation: 24 }, val));
        }
        return (react_1["default"].createElement(core_1.Paper, { variant: "outlined", className: classes.customBorderRadius, elevation: 3 }, val));
    });
    return (react_1["default"].createElement(core_1.Box, { p: 10, pt: 5, width: "94.6%" },
        react_1["default"].createElement("div", { className: classes.root }, arr)));
};
