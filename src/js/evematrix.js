// req: eve, bootstrap, stylar

function captureKey(evt) {
    eve('evematrix.key', evt.target, String.fromCharCode(evt.charCode));
}

document.addEventListener('keypress', captureKey, true);