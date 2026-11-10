import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decodeText } from '../src/decode-text.mjs';

const TEXT = 'héllo ✓ wörld';
const utf16le = (s) => Buffer.from(s, 'utf16le');
const utf16be = (s) => Buffer.from(s, 'utf16le').swap16();

test('UTF-8 with no byte-order mark', () => {
  assert.equal(decodeText(Buffer.from(TEXT, 'utf8')), TEXT);
});

test('UTF-8 with a byte-order mark', () => {
  assert.equal(decodeText(Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), Buffer.from(TEXT, 'utf8')])), TEXT);
});

test('UTF-16 little-endian with a byte-order mark', () => {
  assert.equal(decodeText(Buffer.concat([Buffer.from([0xff, 0xfe]), utf16le(TEXT)])), TEXT);
});

test('UTF-16 big-endian with a byte-order mark', () => {
  assert.equal(decodeText(Buffer.concat([Buffer.from([0xfe, 0xff]), utf16be(TEXT)])), TEXT);
});
