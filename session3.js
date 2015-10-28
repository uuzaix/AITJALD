/*
	Hands-On Session 3
*/

/*
	Objects
*/
function newEmployee(firstname, lastname, age){
	'use strict';
	return {
		firstname: firstname,
		lastname: lastname,
		age: age
	};
}

function newDepartment(name) {
	'use strict';
	var empl = [];
	return {
		name: name,
		employees: empl
	};
}

function addNewEmployee(department, employee) {
	department.employees.push(employee);
}


var me = newEmployee('Christoph', 'Kisfeld', '26');
var otherone = newEmployee('Max', 'Mustermann', '27');
var ifgi = newDepartment('ifgi');

addNewEmployee(ifgi, me);
addNewEmployee(ifgi, otherone);

console.log(ifgi.toSource());
// ({name:"ifgi", employees:[{firstname:"Christoph", lastname:"Kisfeld", age:"26"}, {firstname:"Max", lastname:"Mustermann", age:"27"}]})


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
console.log(x1); // 10

var x2 = 10;
willChange(x2);
console.log(x2); // 2

/*
	Events
*/

window.addEventListener('resize', function(evt){
	console.log(evt);
	alert('Window resized!');
});

/*
	Minify
	see .min.js
*/