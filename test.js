const fs = require('fs');
const path = require('path');
const FileType = require('file-type');
const test = require('ava');
const decompressTarxz = require('.');

async function isJpg(input) {
	const fileType = await FileType.fileTypeFromBuffer(input);
	return fileType.ext === 'jpg';
}

test('extract file', async t => {
	const buf = fs.readFileSync(path.join(__dirname, 'fixture.tar.xz'));
	const files = await decompressTarxz()(buf);

	t.is(files[0].path, 'test.jpg');
	t.true(await isJpg(files[0].data));
});

test('extract file using streams', async t => {
	const stream = fs.createReadStream(path.join(__dirname, 'fixture.tar.xz'));
	const files = await decompressTarxz()(stream);

	t.is(files[0].path, 'test.jpg');
	t.true(await isJpg(files[0].data));
});

test('return empty array if non-valid file is supplied', async t => {
	const buf = fs.readFileSync(__filename);
	const files = await decompressTarxz()(buf);

	t.is(files.length, 0);
});

test('throw on wrong input', async t => {
	await t.throwsAsync(decompressTarxz()('foo'), {message: 'Expected a Buffer or Stream, got string'});
});
