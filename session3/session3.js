'use strict';
/*
	Hands-On Session 3
*/

/*
	Objects
*/
function employee(firstname, lastname, age){
	this.firstname = firstname;
	this.lastname = lastname;
	this.age = age;
}

function department(name) {
	this.name = name;
	this.employees = [];
	this.addNewEmployee = function(employee) {
		this.employees.push(employee);
	};
}
var me = new employee('Christoph', 'Kisfeld', '26');
var otherone = new employee('Max', 'Mustermann', '27');
var ifgi = new department('ifgi');
ifgi.addNewEmployee(me);
ifgi.addNewEmployee(otherone);

console.log(ifgi);
console.log(ifgi.toSource());
/*
({name:"ifgi", employees:[{firstname:"Christoph", lastname:"Kisfeld", age:"26"}, {firstname:"Max", lastname:"Mustermann", age:"27"}], addNewEmployee:(function (employee) {
"use strict";
		this.employees.push(employee);
	})})
*/

/*
	Passage by reference and by value
*/

function willNotChange(x){
	console.log('Passage by value, before assignment x = ' + x + '\n');
	x = 2;
	console.log('Passage by value, after assignment x = ' + x + '\n');
}
function willChange(x) {
	console.log('Passage by reference, before assignment x.num = ' + x.num + '\n');
	x.num = 2;
	console.log('Passage by reference, after assignment, x.num = ' + x.num + '\n');
}
var x1 = 10;
willNotChange(x1);
console.log(x1); // x1 = 10

var x2 = { num: 10 };
willChange(x2);
console.log(x2); // x2.num = 2

/*
	Events
*/

window.addEventListener('resize', function(evt){
	console.log(evt);
	alert('Window resized!');
});

/*
	Minify
	see sesion3.min.js
*/