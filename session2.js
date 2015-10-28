// functions
function add(a,b,c) {
	'use strict';
	return a+b+c;
}
console.log( add(1,2,3) ); // 6

console.log( ('day' < 'daylight') ); // true
console.log( ('Hello' < 'hello') ); // true
console.log( ('Hello' > 'hello') ); // false


// arrays
var myarray = [];
myarray.push('element1'); // add elements to the end of the array
myarray.push('element2', 'element3');
console.log(myarray);

var something = myarray.pop(); // removes the last element from the array and returns it
console.log(something, myarray);

var somethingElse = myarray.shift(); // removes the first element from the array and returns it
console.log(somethingElse, myarray);

myarray.unshift('elementA', 'elementB', 'elementC'); // adds elements at the beginning of the array
console.log(myarray);

// array.splice(index, deleteCount[, element1[, ...[, elementN]]])
myarray.splice(2, 1, 'newElement'); // add new elements, while removing existing ones
console.log(myarray);


// objects
var myObject = {};
myObject.color = "green";
myObject.shape = "triangle";
myObject.number = 10;
console.log(myObject);

var myOtherObject = {
	color: "red",
	shape: "circle",
	number: 5
};
console.log(myOtherObject);