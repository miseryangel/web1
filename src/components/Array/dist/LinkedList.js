"use strict";
exports.__esModule = true;
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var hooks_1 = require("../../app/hooks");
var react_router_dom_1 = require("react-router-dom");
var arrayStyle_1 = require("../Styles/arrayStyle");
var Array_1 = require("../../slices/Array");
var Array_2 = require("../../slices/Array");
var LList_1 = require("../bits/LList");
function ConditionalLLRenderer(props) {
    if (props.arr.length === 0) {
        return react_1["default"].createElement(core_1.Typography, { variant: "h6", color: "secondary" }, "LinkedList is Empty!");
    }
    else {
        return react_1["default"].createElement(LList_1.LList, { arr: props.arr, active: props.active });
    }
}
function LinkedList() {
    var dispatch = hooks_1.useAppDispatch();
    var linkedList = hooks_1.useAppSelector(function (state) { return state.linkedList.arr; });
    var llLen = hooks_1.useAppSelector(function (state) { return state.linkedList.len; });
    var _a = react_1.useState(0), val = _a[0], setVal = _a[1];
    var _b = react_1.useState(llLen), len = _b[0], setLen = _b[1];
    var _c = react_1.useState(""), msg = _c[0], setMsg = _c[1];
    var _d = react_1.useState(false), visible = _d[0], setVisible = _d[1];
    var _e = react_1.useState(0), index = _e[0], setIndex = _e[1];
    var _f = react_1.useState(0), order = _f[0], setOrder = _f[1];
    var _g = react_1.useState(-1), active = _g[0], setActive = _g[1];
    var _h = react_1.useState(false), on = _h[0], setOn = _h[1];
    var _j = react_1.useState(""), trans = _j[0], setTrans = _j[1];
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
    }, [visible, on, active, llLen]);
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
        setLen(llLen);
        order === 0 ? setActive(0) : setActive(llLen - 1);
    };
    var transHandler = function (e) {
        var choice = e.target.value;
        setTrans(choice);
    };
    var maximize = function () {
        switch (trans) {
            case "Array":
                dispatch(Array_2.arrayTransform(linkedList));
                break;
            case "Queue":
                dispatch(Array_2.queueTransform(linkedList));
                break;
            case "Stack":
                dispatch(Array_2.stackTransform(linkedList));
                break;
        }
        history.push("/" + trans);
    };
    return (react_1["default"].createElement(core_1.Grid, { container: true, spacing: 3, justify: "center" },
        react_1["default"].createElement(core_1.Grid, { item: true, xs: 10 },
            react_1["default"].createElement(core_1.Typography, { variant: "h4" }, "LinkedList"),
            react_1["default"].createElement(ConditionalLLRenderer, { arr: linkedList, active: active })),
        react_1["default"].createElement(core_1.Grid, { item: true, xs: 10 },
            react_1["default"].createElement(core_1.Button, { variant: "contained", className: classes.transform, onClick: maximize }, "Transform"),
            react_1["default"].createElement(core_1.Select, { labelId: "trans-label", className: "trans-select", value: trans, label: "Transformation", autoWidth: true, type: "text", onChange: transHandler },
                react_1["default"].createElement(core_1.MenuItem, { value: "Array" }, "array"),
                react_1["default"].createElement(core_1.MenuItem, { value: "Queue" }, "queue"),
                react_1["default"].createElement(core_1.MenuItem, { value: "Stack" }, "stack"))),
        react_1["default"].createElement(core_1.Grid, { item: true, xs: 10 },
            react_1["default"].createElement(core_1.ButtonGroup, { orientation: "vertical", "aria-label": "vertical outlined button group", color: "primary" },
                react_1["default"].createElement(core_1.Button, { variant: "contained", onClick: function () { return dispatch(Array_1.linkedListReset()); } }, "Refresh"),
                react_1["default"].createElement(core_1.Button, { onClick: function () { return msgHandler("The length of linkedList is " + llLen); } }, "GetSize"),
                react_1["default"].createElement(core_1.Button, { onClick: function () { return llLen === 0 ? msgHandler("LinkedList is Empty !") : msgHandler("LinkedList is not empty!"); } }, "IsEmpty"),
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        dispatch(Array_1.linkedListClear());
                    } }, "Clear")),
            react_1["default"].createElement(core_1.ButtonGroup, { orientation: "vertical", "aria-label": "vertical outlined button group", color: "primary" },
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        if (linkedList.length === 0) {
                            msgHandler("LinkedList is Empty !");
                        }
                        else {
                            msgHandler("The first element is " + linkedList[0]);
                        }
                    } }, "PeekFirst"),
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        if (linkedList.length === 0) {
                            msgHandler("LinkedList is Empty !");
                        }
                        else {
                            msgHandler("The last element is " + linkedList[linkedList.length - 1]);
                        }
                    } }, "PeekLast"),
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        if (linkedList.length === 0) {
                            msgHandler("LinkedList is Empty !");
                        }
                        else {
                            msgHandler("The fetched element is " + linkedList[0]);
                            dispatch(Array_1.linkedListPollFirst());
                        }
                    } }, "PollFirst"),
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        if (linkedList.length === 0) {
                            msgHandler("LinkedList is Empty !");
                        }
                        else {
                            msgHandler("The fetched element is " + linkedList[linkedList.length - 1]);
                            dispatch(Array_1.linkedListPollLast());
                        }
                    } }, "PollLast")),
            react_1["default"].createElement(core_1.ButtonGroup, { orientation: "vertical", "aria-label": "vertical outlined button group", color: "secondary" },
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        if (linkedList.length >= 20) {
                            msgHandler("The length of LinkedList has reached uplimit !");
                        }
                        else {
                            dispatch(Array_1.linkedListAddFirst(val));
                        }
                    } }, "AddFirst"),
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        if (linkedList.length >= 20) {
                            msgHandler("The length of LinkedList has reached uplimit !");
                        }
                        else {
                            dispatch(Array_1.linkedListAddLast(val));
                        }
                    } }, "AddLast"),
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        linkedList.includes(val) ? msgHandler("Element is in the linkedList !") : msgHandler("Element is not in the linkedList !");
                    } }, "Contains"),
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        console.log("val is", val);
                        var firstIndex = linkedList.indexOf(val);
                        if (firstIndex === -1) {
                            msgHandler("Element is in not linkedList !");
                        }
                        else {
                            dispatch(Array_1.linkedListRemove(firstIndex));
                        }
                    } }, "Remove")),
            react_1["default"].createElement(core_1.ButtonGroup, { orientation: "vertical", "aria-label": "vertical outlined button group", color: "primary" },
                react_1["default"].createElement("div", { className: "label-container" },
                    react_1["default"].createElement(core_1.TextField, { className: "outlined-number", label: "Number", type: "number", InputLabelProps: {
                            shrink: true
                        }, InputProps: {
                            inputProps: {
                                max: 100, min: 0
                            }
                        }, defaultValue: llLen, variant: "outlined", size: "small", onChange: function (e) { return setVal(+e.target.value); }, style: { marginBottom: "10px" } })),
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
                        }, value: len, variant: "outlined", size: "small", onChange: function (e) {
                            var newLen = +e.target.value;
                            if (newLen >= 0 && newLen <= 20) {
                                setLen(newLen);
                                dispatch(Array_1.linkedListResize(newLen));
                                dispatch(Array_1.linkedListReset());
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
                        var firstIndex = linkedList.indexOf(val);
                        firstIndex === -1 ? msgHandler("Element is in not linkedlist !") : msgHandler("The last index of element is " + firstIndex + " !");
                    } }, "IndexOf"),
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        if (linkedList.length >= 20) {
                            msgHandler("The length of linkedlist has reached the uplimit !");
                        }
                        else {
                            dispatch(Array_1.linkedListInsert({ index: index, element: val }));
                        }
                    } }, "Insert"),
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        if (index < 0 || index >= len) {
                            msgHandler("Element is in not linkedList !");
                        }
                        else {
                            msgHandler("The fetched element is " + linkedList[index]);
                        }
                    } }, "Get"),
                react_1["default"].createElement(core_1.Button, { onClick: function () {
                        if (index < 0 || index >= len) {
                            msgHandler("Element is in not linkedList !");
                        }
                        else if (val < 0 || val >= 100) {
                            msgHandler("value out of range !");
                        }
                        else {
                            dispatch(Array_1.linkedListSet({ index: index, element: val }));
                        }
                    } }, "set")),
            react_1["default"].createElement(core_1.ButtonGroup, { orientation: "vertical", "aria-label": "vertical outlined button group", color: "primary" },
                react_1["default"].createElement(core_1.Button, { onClick: iteratorHandler }, "Iterator"),
                react_1["default"].createElement(core_1.FormControl, { variant: "outlined", size: "small" },
                    react_1["default"].createElement(core_1.Select, { labelId: "order-label", className: "order-select", value: order, label: "Order", autoWidth: true, type: "number", onChange: orderHandler },
                        react_1["default"].createElement(core_1.MenuItem, { value: 0 }, "Ascending"),
                        react_1["default"].createElement(core_1.MenuItem, { value: 1 }, "Descending"))),
                react_1["default"].createElement(core_1.Button, { onClick: function () { return dispatch(Array_1.linkedListSort(order)); } }, "Sort")),
            visible && react_1["default"].createElement(core_1.Typography, { color: "secondary", variant: "h6" }, msg))));
}
exports["default"] = LinkedList;
