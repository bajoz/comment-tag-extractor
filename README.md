# comment-tag-extractor

`comment-tag-extractor` is a package that allows you to extract tags from "docblock" comments.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save comment-tag-extractor
```

Install with yarn:

```sh
$ yarn add comment-tag-extractor
```

## Usage

```javascript
import {extract, parse} from 'comment-tag-extractor';

const code = `
  /**
    * @name Button
    * @description Button component.
    *
    * @class .btn
    * @class .btn--primary
    *
    * @example
    * <div class="{{modifier}}">Button</div>
    *
    * @section 1.3.2
    */
  .btn {
    border: 1px solid black;
  }

  /**
    * @name Checkbox
    * @description Checkbox component.
    * You can write multiline descriptions.
    *
    * @class .checkbox
    * @class .checkbox--subtle
    *
    * @example
    * <div class="{{modifier}}">Checkbox</div>
    *
    * @section 3.2.2
    */
`;

const tags = parse(extract(code));
console.log(tags);

// Will output:
// [
//   {
//     name: [ 'Button' ],
//     description: [ 'Button component.' ],
//     class: [ '.btn', '.btn--primary' ],
//     example: [ '<div class="{{modifier}}">Button</div>' ],
//     section: [ '1.3.2' ]
//   },
//   {
//     name: [ 'Checkbox' ],
//     description: [ 'Checkbox component. You can write multiline descriptions.' ],
//     class: [ '.checkbox', '.checkbox--subtle' ],
//     example: [ '<div class="{{modifier}}">Checkbox</div>' ],
//     section: [ '3.2.2' ]
//   }
// ]
```

#### Mentions
Adapted from `jest-codeblocks`.
