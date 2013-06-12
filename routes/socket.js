var sanitize = require('validator').sanitize;
var users = [];

global.io.sockets.on('connection', function (socket) {

  users.push({ client: socket.id});

  socket.on('msg', function (data) {

    var safeData = {
        name: sanitize(data["name"]).escape(),
        msg: sanitize(data["msg"]).escape()
    }

    global.io.sockets.emit('new', safeData);

  });
});
