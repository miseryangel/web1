"use strict";
exports.__esModule = true;
exports.arrayStyles = void 0;
var styles_1 = require("@material-ui/core/styles");
var yellow_1 = require("@material-ui/core/colors/yellow");
exports.arrayStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        outline: "2px solid black",
        "& > *": {
            margin: theme.spacing(0.1),
            width: theme.spacing(5),
            height: theme.spacing(5),
            backgroundColor: yellow_1["default"][300],
            textAlign: "center",
            padding: theme.spacing(1)
        }
    },
    textField: {
        marginBottom: theme.spacing(0.5)
    },
    active: {
        backgroundColor: yellow_1["default"][700]
    },
    transform: {
        background: 'linear-gradient(45deg,#9fff80,#3399ff)'
    },
    node: {
        backgroundColor: yellow_1["default"][100],
        borderRadius: 25
    }
}); });
