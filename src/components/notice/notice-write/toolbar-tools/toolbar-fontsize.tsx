import { Mark } from '@tiptap/core';

const FontSize = Mark.create({
  name: 'fontSize',

  addAttributes() {
    return {
      size: {
        default: null,
        parseHTML: (element) => element.style.fontSize || null,
        renderHTML: (attributes) => {
          if (!attributes.size) return {};
          return {
            style: `font-size: ${attributes.size}`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [{ style: 'font-size' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0];
  },

  addCommands() {
    return {
      setFontSize:
        (size: string) =>
        ({ commands }) => {
          return commands.setMark('fontSize', { size });
        },
    };
  },
});

export default FontSize;
