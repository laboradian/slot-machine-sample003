all: html css js img manifest lint

html: index.html
css: main.css
js: main.js Reel.js SpriteLoader.js jquery.min.js sprite.json
img: sprite.png icon-32.png icon-192.png

manifest:
	cp src/slot-machine-sample003.webmanifest dist/slot-machine-sample003.webmanifest
index.html:
	cp src/index.html dist/index.html
main.css:
	sass src/scss/main.scss dist/css/main.css --style compressed
main.js:
	cp src/js/main.js dist/js/main.js
Reel.js:
	cp src/js/Reel.js dist/js/Reel.js
SpriteLoader.js:
	cp src/js/SpriteLoader.js dist/js/SpriteLoader.js
jquery.min.js:
	cp src/js/jquery.min.js dist/js/jquery.min.js
sprite.json:
	cp src/js/sprite.json dist/js/sprite.json
sprite.png:
	cp src/img/sprite.png dist/img/sprite.png
icon-32.png:
	cp src/img/icon-32.png dist/img/icon-32.png
icon-192.png:
	cp src/img/icon-192.png dist/img/icon-192.png

lint:
	./node_modules/.bin/eslint dist/js/

clean:
	rm dist/index.html
	rm -fr dist/css/*
	rm -fr dist/img/*
	rm -fr dist/js/*

