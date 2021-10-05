"use strict";
exports.__esModule = true;
exports.List = void 0;
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var arrayStyle_1 = require("../Styles/arrayStyle");
exports.List = function (props) {
    var classes = arrayStyle_1.arrayStyles();
    console.log(props.active);
    var arr = props.arr.map(function (val, index) {
        if (index === props.active) {
            return (react_1["default"].createElement(core_1.Paper, { color: "#ff6600", variant: "outlined", className: classes.active, elevation: 24 }, val));
        }
        return (react_1["default"].createElement(core_1.Paper, { variant: "outlined", square: true, elevation: 3 }, val));
    });
    return (react_1["default"].createElement(core_1.Box, { pt: 5, pb: 2, width: "94.6%" },
        react_1["default"].createElement("div", { className: classes.root }, arr)));
};
