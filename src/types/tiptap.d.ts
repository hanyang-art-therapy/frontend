import 'tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    setFontSize: {
      setFontSize: (size: string) => ReturnType;
    };
  }
}
