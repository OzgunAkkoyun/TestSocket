var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

connections = [];

io.on('connection', (socket) => {
	connections.push(socket);
	console.log('Connected: %s kadar kişi bağlı',connections.length);
	io.emit('asd',connections.length);
	socket.on('disconnect',function(data){
		connections.splice(connections.indexOf(socket),1);
		
		console.log('Disconnected: %s kadar kişi bağlı',connections.length);
		io.emit('asd',connections.length);
	});
});
  
http.listen(PORT, () => {
console.log('listening on *:3000');
});