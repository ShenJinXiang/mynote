// lib/utils/MD5Util.js
const crypto = require('crypto');

exports.md5 = function (content) {
	if (typeof content !== 'string') {
		return '';
	}
	let md5 = crypto.createHash('md5');
	md5.update(content);
	return md5.digest('hex');
};

exports.sha1 = function (content) {
	if (typeof content !== 'string') {
		return '';
	}
	let shasum = crypto.createHash('sha1');
	shasum.update(content);
	return shasum.digest('hex');
};
