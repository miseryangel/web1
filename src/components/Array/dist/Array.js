"use strict";
exports.__esModule = true;
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var hooks_1 = require("../../app/hooks");
var react_router_dom_1 = require("react-router-dom");
var Array_1 = require("../../slices/Array");
var Array_2 = require("../../slices/Array");
var List_1 = require("../bits/List");
var arrayStyle_1 = require("../Styles/arrayStyle");
function ConditionalArrayRenderer(props) {
    if (props.arr.length === 0) {
        return (react_1["default"].createElement(core_1.Box, { pt: 5, pb: 2 },
            react_1["default"].createElement(core_1.Typography, { variant: "h6", color: "secondary" }, "Array is Empty!")));
    }
    else {
        return react_1["default"].createElement(List_1.List, { arr: props.arr, active: props.active });
    }
}
function Array() {
    var dispatch = hooks_1.useAppDispatch();
    var array = hooks_1.useAppSelector(function (state) { return state.array.arr; });
    var arrLen = hooks_1.useAppSelector(function (state) { return state.array.len; });
    var value = hooks_1.useAppSelector(function (state) { return state.array.val; });
    var _a = react_1.useState(0), val = _a[0], setVal = _a[1];
    var _b = react_1.useState(""), msg = _b[0], setMsg = _b[1];
    var _c = react_1.useState(0), index = _c[0], setIndex = _c[1];
    var _d = react_1.useState(0), order = _d[0], setOrder = _d[1];
    var _e = react_1.useState(array.length), len = _e[0], setLen = _e[1];
    var _f = react_1.useState(false), visible = _f[0], setVisible = _f[1];
    var _g = react_1.useState(0), start = _g[0], setStart = _g[1];
    var _h = react_1.useState(len), end = _h[0], setEnd = _h[1];
    var _j = react_1.useState(-1), active = _j[0], setActive = _j[1];
    var _k = react_1.useState(false), on = _k[0], setOn = _k[1];
    var _l = react_1.useState(""), trans = _l[0], setTrans = _l[1];
    var history = react_router_dom_1.useHistory();
    var classes = arrayStyle_1.arrayStyles();
    react_1.useEffect(function () {
        var interval = null;
        if (on) {
            interval = setInterval(function () {
                order === 0 ? setActive(active + 1) : setActive(active - 1);
                if (active >= len || active < 0) {
                    setOn(false);
                }
            }, 200);
        }
        else {
            clearInterval(interval);
        }
        return function () { return clearInterval(interval); };
    }, [visible, value, on, active, array, arrLen]);
    var msgHandler = function (message) {
        setVisible(true);
        setMsg(message);
        setInterval(function () { return setVisible(false); }, 2000);
    };
    var orderHandler = function (e) {
        e.target.value === 1 ? setOrder(1) : setOrder(0);
    };
    var iteratorHandler = function () {
        setOn(true);
        setLen(array.length);
        order === 0 ? setActive(0) : setActive(arrLen - 1);
    };
    var transHandler = function (e) {
        var choice = e.target.value;
        setTrans(choice);
    };
    var maximize = function () {
        console.log(trans);
        switch (trans) {
            case "LinkedList":
                dispatch(Array_2.linkedListTransform(array));
                break;
            case "Queue":
                dispatch(Array_2.queueTransform(array));
                break;
            case "Stack":
                dispatch(Array_2.stackTransform(array));
                break;
        }
        history.push("/" + trans);
    };
    return (react_1["default"].createElement(core_1.Grid, { container: true, spacing: 3, justify: "center" },
        react_1["default"].createElement(core_1.Grid, { item: true, xs: 10 },
            react_1["default"].createElement(core_1.Typography, { variant: "h4" }, "Array"),
            react_1["default"].createElement(ConditionalArrayRenderer, { arr: array, active: active })),
        react_1["default"].createElement(core_1.Grid, { item: true, xs: 10 },
            react_1["default"].createElement(core_1.Button, { variant: "contained", className: classes.transform, onClick: maximize }, "Transform"),
            react_1["default"].createElement(core_1.Select, { labelId: "trans-label", className: "trans-select", value: trans, label: "Transformation", autoWidth: true, type: "text", onChange: transHandler },
                react_1["default"].createElement(core_1.MenuItem, { value: "LinkedList" }, "linkedList"),
                react_1["default"].createElement(core_1.MenuItem, { value: "Queue" }, "queue"),
                react_1["default"].createElement(core_1.MenuItem, { value: "Stack" }, "stack"))),
        react_1["default"].createElement(core_1.Grid, { item: true, xs: 10 },
            react_1["default"].createElement(core_1.ButtonGroup, { orientation: "vertical", "aria-label": "vertical outlined button group", color: "primary" },
                react_1["default"].createElement(core_1.Button, { variant: "contained", onClick: function () { return dispatch(Array_1.arrayReset()); } }, "Refresh"),
                react_1["default"].createElement(core_1.Button, { onClick: function () { return msgHandler("The length of array is " + arrLen); } }, "GetSize"),
                react_1["default"].createElement(core_1.Button, { onClick: function () { return arrLen === 0 ? msgHandler("Array is Empty !") : msgHandler("Array is not empty!"); } }, "IsEmpty"),
                react_1["default"].createElement(core_1.Button, { onClick: function () { return dispatch(Array_1.arrayClear()); } }, "Clear")),
            react_1["default"].createElement(core_1.ButtonGroup, { orientation: "vertical", "aria-label": "vertical outlined button group", color: "secondary" },
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        if (arrLen >= 20) {
                            msgHandler("Array length has reached uplimit !");
                        }
                        else {
                            dispatch(Array_1.arrayAdd(val));
                        }
                    } }, "Add"),
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        array.includes(val) ? msgHandler("Element is in the array !") : msgHandler("Element is not in the array !");
                    } }, "Contains"),
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        var firstIndex = array.indexOf(val);
                        firstIndex === -1 ? msgHandler("Element is not in the array !") : msgHandler("The last index of element is " + firstIndex + " !");
                    } }, "IndexOf"),
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        var lastIndex = array.lastIndexOf(val);
                        lastIndex === -1 ? msgHandler("Element is in not array !") : msgHandler("the first index of element is " + lastIndex + " !");
                    } }, "LastIndexOf")),
            react_1["default"].createElement(core_1.ButtonGroup, { orientation: "vertical", "aria-label": "vertical outlined button group", color: "primary" },
                react_1["default"].createElement("div", { className: "label-container" },
                    react_1["default"].createElement(core_1.TextField, { className: "outlined-number", label: "Number", type: "number", InputLabelProps: {
                            shrink: true
                        }, InputProps: {
                            inputProps: {
                                max: 100, min: 0
                            }
                        }, defaultValue: val, variant: "outlined", size: "small", onChange: function (e) { return setVal(+e.target.value); }, style: { marginBottom: "10px" } })),
                react_1["default"].createElement("div", { className: "label-container" },
                    react_1["default"].createElement(core_1.TextField, { className: "outlined-number", label: "Index", type: "number", InputLabelProps: {
                            shrink: true
                        }, InputProps: {
                            inputProps: {
                                max: len, min: 0
                            }
                        }, defaultValue: val, variant: "outlined", size: "small", onChange: function (e) { return setIndex(+e.target.value); } })),
                react_1["default"].createElement(core_1.Box, { pt: 1 },
                    react_1["default"].createElement(core_1.TextField, { className: "outlined-number", label: "Length", type: "number", InputLabelProps: {
                            shrink: true
                        }, InputProps: {
                            inputProps: {
                                max: 20, min: 0
                            }
                        }, defaultValue: len, variant: "outlined", size: "small", onChange: function (e) {
                            var newLen = +e.target.value;
                            if (newLen >= 0 && newLen <= 20) {
                                setLen(newLen);
                                dispatch(Array_1.arrayResize(newLen));
                                dispatch(Array_1.arrayReset());
                            }
                            else if (newLen < 0) {
                                msgHandler("invalid length !");
                            }
                            else {
                                msgHandler("value out of range !");
                            }
                        } }))),
            react_1["default"].createElement(core_1.ButtonGroup, { orientation: "vertical", "aria-label": "vertical outlined button group", color: "primary" },
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        if (index < 0 || index >= len) {
                            msgHandler("Element is in not array !");
                        }
                        else {
                            msgHandler("The fetched element is " + array[index]);
                        }
                    } }, "Get"),
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        var firstIndex = array.indexOf(val);
                        if (firstIndex === -1) {
                            msgHandler("Element is in not array !");
                        }
                        else {
                            dispatch(Array_1.arrayRemove(firstIndex));
                        }
                    } }, "Remove"),
                react_1["default"].createElement(core_1.Button, { onClick: function () { return dispatch(Array_1.arrayFill(val)); } }, "Fill"),
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        if (index < 0 || index >= len) {
                            msgHandler("Element is in not array !");
                        }
                        else if (val < 0 || val >= 100) {
                            msgHandler("value out of range !");
                        }
                        else {
                            dispatch(Array_1.arraySet({ index: index, element: val }));
                        }
                    } }, "set")),
            react_1["default"].createElement(core_1.ButtonGroup, { orientation: "vertical", "aria-label": "vertical outlined button group", color: "primary" },
                react_1["default"].createElement(core_1.Button, { onClick: iteratorHandler }, "Iterator"),
                react_1["default"].createElement(core_1.FormControl, { variant: "outlined", size: "small" },
                    react_1["default"].createElement(core_1.Select, { labelId: "order-label", className: "order-select", value: order, label: "Order", autoWidth: true, type: "number", onChange: orderHandler },
                        react_1["default"].createElement(core_1.MenuItem, { value: 0 }, "Ascending"),
                        react_1["default"].createElement(core_1.MenuItem, { value: 1 }, "Descending"))),
                react_1["default"].createElement(core_1.Button, { onClick: function () { return dispatch(Array_1.arraySort(order)); } }, "Sort")),
            react_1["default"].createElement(core_1.ButtonGroup, { orientation: "vertical", "aria-label": "vertical outlined button group", color: "primary" }),
            react_1["default"].createElement(core_1.ButtonGroup, { orientation: "vertical", "aria-label": "vertical outlined button group", color: "primary" },
                react_1["default"].createElement("div", { className: "label-container" },
                    react_1["default"].createElement(core_1.TextField, { label: "startIndex", className: "outlined-number", type: "number", value: start, InputLabelProps: {
                            shrink: true
                        }, variant: "outlined", size: "small", onChange: function (e) { return setStart(+e.target.value); } })),
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        console.log(len);
                        if (start < 0 || start > end || end > len) {
                            msgHandler("Invalid indices!");
                        }
                        else {
                            dispatch(Array_1.arraySubList({ from: start, to: end }));
                        }
                    } }, "Sublist"),
                react_1["default"].createElement(core_1.Box, { pt: 1 },
                    react_1["default"].createElement(core_1.TextField, { label: "endIndex", className: "outlined-number", type: "number", value: end, size: "small", onChange: function (e) { return setEnd(+e.target.value); }, InputLabelProps: {
                            shrink: true
                        }, variant: "outlined" }))),
            visible && react_1["default"].createElement(core_1.Typography, { color: "secondary", variant: "h6" }, msg))));
}
exports["default"] = Array;
