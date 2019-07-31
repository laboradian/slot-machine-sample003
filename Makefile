all: html css js img lint

html: index.html
css: main.css
js: main.js Reel.js SpriteLoader.js sprite.json
img: sprite.png

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
sprite.json:
	cp src/js/sprite.json dist/js/sprite.json
sprite.png:
	cp src/img/sprite.png dist/img/sprite.png

lint:
	./node_modules/.bin/eslint dist/js/

clean:
	rm dist/index.html
	rm -fr dist/css/*
	rm -fr dist/img/*
	rm -fr dist/js/*
