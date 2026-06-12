/**
 * Claude Code CLI Color Constants — broadcast layer
 * Verbatim from cc-101-broadcast-source/colors.js. Plain JS (not babel) —
 * COLORS/TERM must be on window BEFORE deck-broadcast-components.jsx refs them.
 *
 * Expedia's existing T-prefixed primitives (TGray, TBlue, …) inline these
 * same values; this file backs the char-grid Terminal/Line/etc components.
 */

const COLORS = {
  // Grays
  gray: 'rgb(153, 153, 153)',
  dimGray: 'rgb(136, 136, 136)',
  lightGray: 'rgb(175, 175, 175)',
  subtle: 'rgb(80, 80, 80)',

  // Brand
  blue: 'rgb(177, 185, 249)',
  claudeOrange: 'rgb(215, 119, 87)',

  // Status
  green: 'rgb(78, 186, 101)',
  yellow: 'rgb(255, 193, 7)',
  red: 'rgb(255, 107, 128)',

  // Diff — dark mode
  diffAddedFg: 'rgb(80, 200, 80)',
  diffAddedBg: 'rgb(2, 40, 0)',
  diffAddedWordBg: 'rgb(4, 71, 0)',
  diffRemovedFg: 'rgb(220, 90, 90)',
  diffRemovedBg: 'rgb(61, 1, 0)',
  diffRemovedWordBg: 'rgb(92, 2, 0)',
  diffContextFg: 'rgb(248, 248, 242)',

  // Text
  white: 'rgb(255, 255, 255)',
  offWhite: 'rgb(240, 240, 240)',
  black: 'rgb(0, 0, 0)',

  // Mode
  planMode: 'rgb(72, 150, 140)',
  autoAccept: 'rgb(175, 135, 255)',

  // Other
  cyan: 'rgb(8, 145, 178)',
  magenta: 'rgb(147, 51, 234)',
  pink: 'rgb(219, 39, 119)',
  orange: 'rgb(234, 88, 12)',

  // Terminal
  termBg: '#1a1918',
  termFg: '#d1cfc5',
  userMsgBg: 'rgb(55, 55, 55)',
  inverseBg: '#d1cfc5',
  inverseFg: '#1a1918',
};

// Terminal dimensions — strict 6×13 char grid.
// Recap annotation top offsets (82, 152, 228…) are calibrated to lineHeight:13.
const TERM = {
  charWidth: 6,
  lineHeight: 13,
  font: "'JetBrains Mono', 'SF Mono', Menlo, Monaco, monospace",
  fontSize: 11,
  defaultWidth: 80,
  defaultHeight: 24,
};
