var children = document.body.children;

eve.on('evematrix.key', function() {
    if (!(this instanceof WebSocket)) {
        // get the last child and apply the mytext class
        children[children.length - 1].classList.add('mytext');
    }
})(10);