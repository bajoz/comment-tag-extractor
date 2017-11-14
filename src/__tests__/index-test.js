import { parse, extract } from '..';

describe('docblock-tag-extractor', () => {
  let comment1;
  let comment2;
  let noTagsComment;

  beforeEach(() => {
    comment1 = `
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
    `.trim();
    comment2 = `
      /**
       * @name Checkbox
       * @description Checkbox component.
       * You can write multiline descriptions.
       *
       * @class .cbox
       * @class .cbox-groupd
       *
       * @example
       * <div class="{{modifier}}">Checkbox</div>
       *
       * @section 3.2.2
       */
    `.trim();
    noTagsComment = `
      /**
       * Checkbox
       * Checkbox component.
       * You can write multiline descriptions.
       *
       * .cbox
       * .cbox-groupd
       *
       * <div class="{{modifier}}">Checkbox</div>
       *
       * 3.2.2
       */
    `.trim();
  });

  describe('#extract', () => {
    it('returns an empty array when no there are no docblocks', () => {
      const code = `
        const foo = 'bar';
        const magicNumber = 3;
      `;
      expect(extract(code)).toEqual([]);
    });

    it('returns an array with only one docblock', () => {
      const code = `
        const foo = 'bar';
        ${comment1}
        const magicNumber = 3;
      `;
      expect(extract(code)).toEqual([comment1]);
    });

    it('returns an array with all the docblocks', () => {
      const code = `
        const foo = 'bar';
        ${comment1}
        const magicNumber = 3;
        ${comment2}
        const other = false;
        ${noTagsComment}
      `;
      expect(extract(code)).toEqual([comment1, comment2, noTagsComment]);
    });
  });

  describe('#parse', () => {
    it('returns an empty array when there are no docblocks', () => {
      expect(parse()).toEqual([]);
      expect(parse(null)).toEqual([]);
      expect(parse('')).toEqual([]);
      expect(parse([])).toEqual([]);
    });

    it('returns an empty array when there are no tags in the docblocks', () => {
      expect(parse([noTagsComment])).toEqual([]);
    });

    it('returns the tags of a docblock', () => {
      const expected = [
        {
          name: ['Button'],
          description: ['Button component.'],
          class: ['.btn', '.btn--primary'],
          example: ['<div class="{{modifier}}">Button</div>'],
          section: ['1.3.2']
        }
      ];
      expect(parse([comment1])).toEqual(expected);
    });

    it('returns the tags for each docblock', () => {
      const comment1Tags = {
        name: ['Button'],
        description: ['Button component.'],
        class: ['.btn', '.btn--primary'],
        example: ['<div class="{{modifier}}">Button</div>'],
        section: ['1.3.2']
      };
      const comment2Tags = {
        name: ['Checkbox'],
        description: ['Checkbox component. You can write multiline descriptions.'],
        class: ['.cbox', '.cbox-groupd'],
        example: ['<div class="{{modifier}}">Checkbox</div>'],
        section: ['3.2.2']
      };
      expect(parse([comment2, comment1])).toEqual([comment2Tags, comment1Tags]);
    });
  });
});
