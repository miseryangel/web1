"use strict";
exports.__esModule = true;
exports.randomArray = void 0;
// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.randomArray = function (len) {
    var arr = [];
    for (var i = 0; i < len; i++) {
        arr[i] = randomIntFromInterval(1, 100);
    }
    return arr;
};
