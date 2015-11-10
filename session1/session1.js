'use strict';
/*
console.log("hello");
console.log("hello\\ \" ");
console.log("hello");
console.log("hello\r\n");
console.log("hello\r\n");
console.log("hello\r\n");
*/

// variable initialization
var anumber = 5.1234;
var numberAsString = "6.112555890123";
var text = "  Some Text  ";
var bool = false;
var obj = {};

// String manipulation
var varindexOf = 		text.indexOf('Some'); // first appearance of "Some": 2
var varlastIndexOf = 	text.lastIndexOf('e'); // last appearance of "e": 8
var varlength = 		text.length; // length of string: 13
var varslice = 			text.slice(4, 9); // slice the string starting at 4, ending at 8 (9-1): "me Te"
var vartoLowerCase = 	text.toLowerCase(); // lower case: "  some text  "
var vartoUpperCase = 	text.toUpperCase(); // upper case: "  SOME TEXT  "
var vartrim = 			text.trim(); // remove whitespace: "Some Text"

console.log(varindexOf);
console.log(varlastIndexOf);
console.log(varlength);
console.log(varslice);
console.log(vartoLowerCase);
console.log(vartoUpperCase);
console.log(vartrim);

// number manipulation
var vartoFixed		= anumber.toFixed(5); // adds zeroes at the end if number is shorter
var vartoPrecision	= anumber.toPrecision(5); // 

console.log(vartoFixed);
console.log(vartoPrecision);

// type conversion
console.log( parseInt(numberAsString) );
console.log( parseFloat(numberAsString) );
console.log( parseString(number) );

