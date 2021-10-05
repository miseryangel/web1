"use strict";
exports.__esModule = true;
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var hooks_1 = require("../../app/hooks");
var react_router_dom_1 = require("react-router-dom");
var arrayStyle_1 = require("../Styles/arrayStyle");
var Array_1 = require("../../slices/Array");
var Array_2 = require("../../slices/Array");
var List_1 = require("../bits/List");
function ConditionalLLRenderer(props) {
    if (props.arr.length === 0) {
        return react_1["default"].createElement(core_1.Typography, { variant: "h6", color: "secondary" }, "Stack is Empty!");
    }
    else {
        return react_1["default"].createElement(List_1.List, { arr: props.arr, active: props.active });
    }
}
function Stack() {
    var dispatch = hooks_1.useAppDispatch();
    var stack = hooks_1.useAppSelector(function (state) { return state.stack.arr; });
    var sLen = hooks_1.useAppSelector(function (state) { return state.stack.len; });
    var _a = react_1.useState(0), val = _a[0], setVal = _a[1];
    var _b = react_1.useState(sLen), len = _b[0], setLen = _b[1];
    var _c = react_1.useState(""), msg = _c[0], setMsg = _c[1];
    var _d = react_1.useState(false), visible = _d[0], setVisible = _d[1];
    var _e = react_1.useState(0), order = _e[0], setOrder = _e[1];
    var _f = react_1.useState(-1), active = _f[0], setActive = _f[1];
    var _g = react_1.useState(false), on = _g[0], setOn = _g[1];
    var _h = react_1.useState(""), trans = _h[0], setTrans = _h[1];
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
    }, [visible, on, active, sLen]);
    var msgHandler = function (message) {
        setVisible(true);
        setMsg(message);
        var interval = setInterval(function () { return setVisible(false); }, 2000);
        return function () { return clearInterval(interval); };
    };
    var orderHandler = function (e) {
        e.target.value === 1 ? setOrder(1) : setOrder(0);
    };
    var iteratorHandler = function () {
        setOn(true);
        setLen(sLen);
        order === 0 ? setActive(0) : setActive(sLen - 1);
    };
    var transHandler = function (e) {
        var choice = e.target.value;
        setTrans(choice);
    };
    var maximize = function () {
        switch (trans) {
            case "LinkedList":
                dispatch(Array_2.linkedListTransform(stack));
                break;
            case "Queue":
                dispatch(Array_2.queueTransform(stack));
                break;
            case "Array":
                dispatch(Array_2.arrayTransform(stack));
                break;
        }
        history.push("/" + trans);
    };
    return (react_1["default"].createElement(core_1.Grid, { container: true, spacing: 3, justify: "center" },
        react_1["default"].createElement(core_1.Grid, { item: true, xs: 10 },
            react_1["default"].createElement(core_1.Typography, { variant: "h4" }, "Stack"),
            react_1["default"].createElement(ConditionalLLRenderer, { arr: stack, active: active })),
        react_1["default"].createElement(core_1.Grid, { item: true, xs: 10 },
            react_1["default"].createElement(core_1.Button, { variant: "contained", className: classes.transform, onClick: maximize }, "Transform"),
            react_1["default"].createElement(core_1.Select, { labelId: "trans-label", className: "trans-select", value: trans, label: "Transformation", autoWidth: true, type: "text", onChange: transHandler },
                react_1["default"].createElement(core_1.MenuItem, { value: "Array" }, "array"),
                react_1["default"].createElement(core_1.MenuItem, { value: "LinkedList" }, "linkedList"),
                react_1["default"].createElement(core_1.MenuItem, { value: "Queue" }, "queue"))),
        react_1["default"].createElement(core_1.Grid, { item: true, xs: 10 },
            react_1["default"].createElement(core_1.ButtonGroup, { orientation: "vertical", "aria-label": "vertical outlined button group", color: "primary" },
                react_1["default"].createElement(core_1.Button, { variant: "contained", onClick: function () { return dispatch(Array_1.stackReset()); } }, "Refresh"),
                react_1["default"].createElement(core_1.Button, { onClick: function () { return msgHandler("The length of stack is " + sLen); } }, "GetSize"),
                react_1["default"].createElement(core_1.Button, { onClick: function () { return sLen === 0 ? msgHandler("Stack is Empty !") : msgHandler("Stack is not empty!"); } }, "IsEmpty")),
            react_1["default"].createElement(core_1.ButtonGroup, { orientation: "vertical", "aria-label": "vertical outlined button group", color: "primary" },
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        if (stack.length === 0) {
                            msgHandler("Stack is Empty !");
                        }
                        else {
                            msgHandler("The first element is " + stack[stack.length - 1]);
                        }
                    } }, "Peek"),
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        if (stack.length === 0) {
                            msgHandler("Stack is Empty !");
                        }
                        else {
                            msgHandler("The fetched element is " + stack[0]);
                            dispatch(Array_1.stackPop());
                        }
                    } }, "Pop")),
            react_1["default"].createElement(core_1.ButtonGroup, { orientation: "vertical", "aria-label": "vertical outlined button group", color: "secondary" },
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        if (stack.length >= 20) {
                            msgHandler("The length of stack has reached uplimit !");
                        }
                        else {
                            dispatch(Array_1.stackPush(val));
                        }
                    } }, "Add"),
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        stack.includes(val) ? msgHandler("Element is in the stack !") : msgHandler("Element is not in the stack !");
                    } }, "Contains")),
            react_1["default"].createElement(core_1.ButtonGroup, { orientation: "vertical", "aria-label": "vertical outlined button group", color: "primary" },
                react_1["default"].createElement("div", { className: "label-container" },
                    react_1["default"].createElement(core_1.TextField, { className: "outlined-number", label: "Number", type: "number", InputLabelProps: {
                            shrink: true
                        }, InputProps: {
                            inputProps: {
                                max: 100, min: 0
                            }
                        }, defaultValue: sLen, variant: "outlined", size: "small", onChange: function (e) { return setVal(+e.target.value); }, style: { marginBottom: "10px" } })),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement(core_1.TextField, { className: "outlined-number", label: "Length", type: "number", InputLabelProps: {
                            shrink: true
                        }, InputProps: {
                            inputProps: {
                                max: 20, min: 0
                            }
                        }, value: len, variant: "outlined", size: "small", onChange: function (e) {
                            var newLen = +e.target.value;
                            if (newLen >= 0 && newLen <= 20) {
                                setLen(newLen);
                                dispatch(Array_1.stackResize(newLen));
                                dispatch(Array_1.stackReset());
                            }
                            else if (newLen < 0) {
                                msgHandler("invalid length !");
                            }
                            else {
                                msgHandler("value out of range !");
                            }
                        } }))),
            react_1["default"].createElement(core_1.ButtonGroup, { orientation: "vertical", "aria-label": "vertical outlined button group", color: "primary" },
                react_1["default"].createElement(core_1.Button, { onClick: iteratorHandler }, "Iterator"),
                react_1["default"].createElement(core_1.FormControl, { variant: "outlined", size: "small" },
                    react_1["default"].createElement(core_1.Select, { labelId: "order-label", className: "order-select", value: order, label: "Order", autoWidth: true, type: "number", onChange: orderHandler },
                        react_1["default"].createElement(core_1.MenuItem, { value: 0 }, "Ascending"),
                        react_1["default"].createElement(core_1.MenuItem, { value: 1 }, "Descending")))),
            visible && react_1["default"].createElement(core_1.Typography, { color: "secondary", variant: "h6" }, msg))));
}
exports["default"] = Stack;
