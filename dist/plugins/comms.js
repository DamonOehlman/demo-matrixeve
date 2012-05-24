var reHostParts = /(.*)\:(\d+)/,
    hostMatch = reHostParts.exec(window.location.host),
    wsUrl,
    socket;
    
if (! hostMatch) {
    throw new Error('Unable to determine the host and port for the current location');
}

// initialise the websocket url
wsUrl = 'ws://' + hostMatch[1] + ':' + (parseInt(hostMatch[2], 10) + 1);

// initialise the socket connection
console.log('connecting to: ' + wsUrl);
socket = new WebSocket(wsUrl);

// once the socket is opened
socket.onopen = function() {
    eve.on('*', function() {
        // if the scope is the websocket, abort
        if (this === socket) return;
        
        // otherwise create the message and send it to the server
        var message = eve.nt() + '|' + Array.prototype.join.call(arguments, '|');
        socket.send(message);
    });
    
    console.log('connected');
};

socket.onmessage = function(evt) {
    // when we receive a message, break it up and map it to eve
    var args = evt.data.split('|');
    
    // trigger even
    eve.apply(eve, [args[0], socket].concat(args.slice(1)));
};

console.log(socket);