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
  assert.match(html, /proposal-ambient/);
});

test('proposal motion is transform based and keeps reduced-motion support', () => {
  assert.match(css, /transform:\s*translate3d/);
  assert.match(css, /aspect-ratio:\s*1100\s*\/\s*650/);
  assert.match(css, /proposal-ambient-drift/);
  assert.match(css, /hero-ring-breathe/);
  assert.match(css, /dor-orb-rise/);
  assert.match(css, /height:\s*auto\s*!important/);
  assert.match(css, /animation-timeline:\s*view/);
  assert.match(css, /section::before[\s\S]*display:\s*none/);
  assert.match(css, /\.hero::after[\s\S]*display:\s*none/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(css, /transition:[^;]*(?:background|box-shadow|color)/);
  assert.match(js, /IntersectionObserver/);
  assert.match(js, /ResizeObserver/);
  assert.match(js, /preview-scale/);
  assert.match(js, /dor-orb-shift/);
  assert.match(js, /requestAnimationFrame/);
  assert.match(js, /motion-stagger/);
});

test('proposal keeps one continuous atmosphere across section boundaries', () => {
  assert.match(css, /body::after[\s\S]*continuous-atmosphere/);
  assert.match(css, /section:not\(\.hero\)::before[\s\S]*display:\s*none/);
  assert.match(css, /#dor::after[\s\S]*display:\s*none/);
  assert.match(css, /continuous-atmosphere/);
  assert.doesNotMatch(css, /background-position/);
});

test('proposal motion targets presentation sections without changing content', () => {
  assert.match(js, /\.real-system-frame/);
  assert.match(js, /\.identity-preview-card/);
  assert.match(js, /\.employee-job-demo/);
  assert.doesNotMatch(js, /innerHTML|textContent|removeChild/);
});
