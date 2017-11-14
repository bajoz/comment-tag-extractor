import detectNewline from 'detect-newline';
import { EOL } from 'os';

const commentEndRe = /\*\/$/;
const commentStartRe = /^\/\*\*/;
const docblockRe = /\/\*{2}([\s\S]+?)\*\//g;
const lineCommentRe = /(^|\s+)\/\/([^\r\n]*)/g;
const ltrimRe = /^\s*/;
const rtrimRe = /\s*$/;
const ltrimNewlineRe = /^(\r?\n)+/;
const multilineRe = /(?:^|\r?\n) *(@[^\r\n]*?) *\r?\n *(?![^@\r\n]*\/\/[^]*)([^@\r\n\s][^@\r\n]+?) *\r?\n/g;
const propertyRe = /(?:^|\r?\n) *@(\S+) *([^\r\n]*)/g;
const stringStartRe = /(\r?\n|^) *\* ?/g;

export function extract(contents) {
  let match;
  let matches = [];
  while ((match = docblockRe.exec(contents))) {
    matches = [...matches, match[0]];
  }
  return matches.map(match => match.replace(ltrimRe, ''));
}

function parseDocblock(docblock) {
  const line = detectNewline(docblock) || EOL;

  docblock = docblock
    .replace(commentStartRe, '')
    .replace(commentEndRe, '')
    .replace(stringStartRe, '$1');

  let prev = '';
  while (prev !== docblock) {
    prev = docblock;
    docblock = docblock.replace(multilineRe, `${line}$1 $2${line}`);
  }
  docblock = docblock.replace(ltrimNewlineRe, '').replace(rtrimRe, '');

  const result = Object.create(null);
  let match;
  while ((match = propertyRe.exec(docblock))) {
    if (!result[match[1]]) {
      result[match[1]] = [];
    }
    result[match[1]] = [...result[match[1]], match[2].replace(lineCommentRe, '')];
  }
  return result;
}

export function parse(docblocks) {
  if (!docblocks || !Array.isArray(docblocks)) {
    return [];
  }
  return docblocks
    .map(docblock => parseDocblock(docblock))
    .filter(docblockTags => Object.keys(docblockTags).length !== 0);
}
