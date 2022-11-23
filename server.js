//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var express = require('express');
var app = express();
var https = require('https');
//var https = require('http');
var fs = require('fs');

/*function read(f) {return fs.readFileSync(f).toString();}
function include(f) {eval.apply(global, [read(f)]);}*/

/*var pkey = fs.readFileSync('/etc/letsencrypt/live/s1.damasistem.com/privkey.pem');
var pcert = fs.readFileSync('/etc/letsencrypt/live/s1.damasistem.com/cert.pem');*/

var SERVER_PORT = 3002;
var options = {
    hostname: 'https://testserverexploreeu.herokuapp.com/',
    port: SERVER_PORT,  
   /* key: pkey, 
    cert: pcert,
    requestCert: true,*/
    rejectUnauthorized: false, 
};

var server = https.createServer(options, app).listen(SERVER_PORT, function(){
  console.log("Express server listening on port " + SERVER_PORT);
});  

//var server = require('https').Server(app)
var io = require('socket.io')(server);

connections = [];
global.allRooms = [];

const PORT = process.env.PORT || SERVER_PORT;
app.get('/', function (req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connect', function (socket) {
	
 	connections.push(socket);
	console.log('Connected: %s kadar kişi bağlı',connections.length);
	socket.on('disconnect',function(data){
		//getFriendOnlineStatusAndSendImOnlineorOffline(socket,io,0);

		connections.splice(connections.indexOf(socket),1);
		
		
		console.log('Disconnected: %s kadar kişi bağlı',connections.length);
	});

	
});

