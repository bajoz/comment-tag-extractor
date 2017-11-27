# comment-tag-extractor

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
`;

const tags = parse(extract(code));
console.log(tags);

// Will output:
// {
//   name: [ 'Button' ],
//   description: [ 'Button component.' ],
//   class: [ '.btn', '.btn--primary' ],
//   example: [ '<div class="{{modifier}}">Button</div>' ],
//   section: [ '1.3.2' ]
// }
```

#### Mentions
Adapted from `jest-codeblocks`.
