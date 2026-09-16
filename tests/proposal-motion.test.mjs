import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const [html, css, js] = await Promise.all([
  readFile(new URL('index.html', root), 'utf8'),
  readFile(new URL('assets/proposal-motion.css', root), 'utf8'),
  readFile(new URL('assets/proposal-motion.js', root), 'utf8')
]);

test('proposal loads its dedicated motion layer', () => {
  assert.match(html, /assets\/proposal-motion\.css/);
  assert.match(html, /assets\/proposal-motion\.js/);
});

test('proposal motion is transform based and keeps reduced-motion support', () => {
  assert.match(css, /transform:\s*translate3d/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(css, /transition:[^;]*(?:background|box-shadow|color)/);
  assert.match(js, /IntersectionObserver/);
  assert.match(js, /motion-stagger/);
});

test('proposal motion targets presentation sections without changing content', () => {
  assert.match(js, /\.real-system-frame/);
  assert.match(js, /\.identity-preview-card/);
  assert.match(js, /\.employee-job-demo/);
  assert.doesNotMatch(js, /innerHTML|textContent|removeChild/);
});
