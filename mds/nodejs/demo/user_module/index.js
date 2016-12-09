// index.js
const server = require('./lib/server');
const router = require('./lib/route');
const requestHandler = require('./lib/requestHandlers');

let handle = {};
handle['/'] = requestHandler.index;
handle['/user'] = requestHandler.user;
handle['/addUser'] = requestHandler.addUser;
handle['/addUserForm'] = requestHandler.addUserForm;
handle['/updUser'] = requestHandler.updUser;
handle['/updUserForm'] = requestHandler.updUserForm;
handle['/delUser'] = requestHandler.delUser;
server.start(router.route, handle);
