// demo
const readTemp = require('./readTemp');

readTemp(function(arr1, arr2) {
	console.log(arr1.length);
	console.log(arr2.length);
	console.log('-----');
	arr1.forEach(function(item) {
		console.log(item);
	});
	console.log('-----');
	arr2.forEach(function(item) {
		console.log(item);
	});
});
