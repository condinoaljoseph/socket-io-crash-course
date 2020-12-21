const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	io.emit('user joined', 'user joined the group');

	socket.on('chat message', (msg) => {
		io.emit('chat message', msg);
	});

	socket.on('disconnect', () => {
		io.emit('user left', 'user has left the group');
	});
});

http.listen(8080, () => {
	console.log('listening on port 8080');
});
