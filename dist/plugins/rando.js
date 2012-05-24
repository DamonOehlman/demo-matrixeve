setInterval(function() {
    eve('evematrix.key', null, String.fromCharCode((Math.random() * 60) + 97 | 0));
}, 1);