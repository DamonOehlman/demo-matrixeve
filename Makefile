SHELL := /bin/bash

build:
	@bake src/js/
	cp -R src/plugins dist/
	@cp src/index.html dist/
	@node_modules/stylus/bin/stylus -u nib src/css/ --out dist
	@DEBUG=* node server.js

test:
	@mocha --reporter spec

.PHONY: test