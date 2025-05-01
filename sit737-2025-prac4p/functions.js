// this file defines functions for the calculator as modules imported by index.js
/*adding calculator functions will require the function and export lines to be updated, along with the switch function and additional api endpoint in index.js be updated accordingly
*/

// Addition function
function add (num1, num2) {
    return num1 + num2;
}

// Subtraction function
function sub (num1, num2) {
    return num1 - num2;
}

// Multiplication function
function mult (num1, num2) {
    return num1 * num2;
}

// Division function
function div (num1, num2) {
    return num1 / num2;
}

module.exports = { add, sub, mult, div };