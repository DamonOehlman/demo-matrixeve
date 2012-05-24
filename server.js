var config = require('config'),
    debug = require('debug')('evedemo'),
    express = require('express'),
    WebSocketServer = require('ws').Server,
    path = require('path'),
    app = express.createServer(),
    clients = [],
    wss,
    wsPort = parseInt(config.port, 10) + 1;
    
// create the new socket server
debug('Initialising websocket server on port: ' + wsPort);
wss = new WebSocketServer({ host: '0.0.0.0', port: wsPort });

wss.on('connection', function(ws) {
    debug('received client connection');
    
    // create a new client 
    clients[clients.length] = ws;
    
    ws.on('message', function(message) {
        var validClients = clients.filter(function(client) {
            return client !== ws;
        });

        // send the message to the valid clients
        // debug('received message "' + message + '" sending to ' + validClients.length + ' clients');
        validClients.forEach(function(client) {
            client.send(message);
        });
    });

    ws.on('close', function() {
        clients.splice(clients.indexOf(ws), 1);
        debug('client disconnected');
    });
});

app.use(express.static(path.resolve(__dirname, 'dist')));
app.listen(config.port);