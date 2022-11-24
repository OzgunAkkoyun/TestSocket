const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

connections = [];
io.on('connection', (socket) => {
	connections.push(socket);
	console.log('Connected: %s kadar kişi bağlı',connections.length);
	socket.on('disconnect',function(data){
		connections.splice(connections.indexOf(socket),1);
		
		console.log('Disconnected: %s kadar kişi bağlı',connections.length);
	});
});
  
server.listen(PORT, () => {
console.log('listening on *:3000');
});