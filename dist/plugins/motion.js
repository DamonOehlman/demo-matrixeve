// on key press events, create a new span at a random position and make the key go down the screen
eve.on('evematrix.key', function(key) {
    // create the span to hold the character
    var span = document.createElement('span');
    span.innerHTML = key;
    span.classList.add('matrix');
    
    // set the initial style
    stylar(span)
        .set('position', 'absolute')
        .set('left', Math.floor(Math.random() * window.innerWidth) + 'px')
        .set('top', '-100px');
    
    // add to the document
    document.body.appendChild(span);
    
    // add the dropped class
    setTimeout(function() {
        stylar(span).set('transform', 'translate(0px, ' + (window.innerHeight + 100) + 'px)');
    }, 50);
    
    setTimeout(function() {
        document.body.removeChild(span);
    }, 1700);
});