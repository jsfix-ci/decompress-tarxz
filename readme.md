# @felipecrs/decompress-tarxz [![Build Status](https://travis-ci.org/kevva/decompress-tarxz.svg?branch=master)](https://travis-ci.org/kevva/decompress-tarxz)

> tar.xz decompress plugin

This package is an upgrade on top of original [decompress-targz](https://github.com/kevva/decompress-tarxz).

## Install

```
$ npm install decompress-tarxz
```


## Usage

```js
const decompress = require('decompress');
const decompressTarxz = require('decompress-tarxz');

(async () => {
	await decompress('unicorn.tar.xz', 'dist', {
		plugins: [
			decompressTarxz()
		]
	});

	console.log('Files decompressed');
})();
```


## API

### decompressTarxz()(input)

Returns both a `Promise<Buffer>` and a [Duplex stream](https://nodejs.org/api/stream.html#stream_class_stream_duplex).

#### input

Type: `Buffer` `Stream`

Buffer or stream to decompress.
