// this file defines functions for the calculator as modules imported by index.js
/*for each calculator function added, ensure function name is pushed to the exported list
    as per the first example, add
*/

var list = []; // defines the array list variable for export 

// Addition function
list.push("add") //pushes name of function to array list
function add (num1, num2) { //name of function must be same as that pushed to array
    return num1 + num2;
}

// Subtraction function
list.push("sub")
function sub (num1, num2) {
    return num1 - num2;
}

// Multiplication function
list.push("mult")
function mult (num1, num2) {
    return num1 * num2;
}

// Division function
list.push("div")
function div (num1, num2) {
    return num1 / num2;
}

// exponentiation function
list.push("exp")
function exp (num1, num2) {
    return num1 ** num2;
}

// Square root function
list.push("sqrt")
function sqrt (num1, num2) {
    return Math.sqrt(num1 * num2);
}

// Modulo function
list.push("mod")
function mod (num1, num2) {
    return num1 % num2;
}

module.exports = { add, sub, mult, div, exp, sqrt, mod, list };