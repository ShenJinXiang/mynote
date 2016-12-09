// lib/readTemp.js
const readLines = require('./readLines');

let tempFile = './lib/temp.html';

module.exports = function(callback) {
	readLines(tempFile, function (data) {
		let index = data.indexOf('####');
		callback(data.slice(0, index), data.slice(index + 1, data.length));
	});
};
