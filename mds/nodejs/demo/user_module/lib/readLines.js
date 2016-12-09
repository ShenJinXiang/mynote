// lib/readLines.js
const fs = require('fs');
const readline = require('readline');

function readLines(file, callback) {
	let data = [];

	let rl = readline.createInterface({
		input : fs.createReadStream(file)
	});

	rl.on('line', function(line){
		data.push(line);
	});

	rl.on('close', function() {
		callback(data);
	});
}

module.exports = readLines;
