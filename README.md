# docblock-tag-extractor

## Usage

```javascript
import {extract, parse} from 'docblock-tag-extractor';

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

const tags = extract(parse(code));
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
Code inspired by `jest-codeblocks`.
