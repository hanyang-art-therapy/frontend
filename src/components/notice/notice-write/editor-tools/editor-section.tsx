import { EditorContent, Editor } from '@tiptap/react';
import Toolbar from '../toolbar';
import { useEffect } from 'react';

type Props = {
  editor: Editor | null;
  className?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EditorSection({ editor, className }: Props) {
  useEffect(() => {
    if (!editor) return;

    const addLinkStyles = () => {
      const proseMirror = document.querySelector('.ProseMirror');
      if (proseMirror) {
        const existingStyle = document.getElementById('tiptap-link-styles');
        if (existingStyle) {
          existingStyle.remove();
        }

        const style = document.createElement('style');
        style.id = 'tiptap-link-styles';
        style.textContent = `
          .ProseMirror {
            outline: none !important;
          }
          .ProseMirror a {
            color: #3b82f6 !important;
            text-decoration: underline !important;
            cursor: pointer !important;
          }
          .ProseMirror a:hover {
            color: #1d4ed8 !important;
            font-weight: 600 !important;
          }
          .ProseMirror p {
            margin: 0.5rem 0 !important;
          }
        `;
        document.head.appendChild(style);
      }
    };


    editor.on('update', addLinkStyles);
    addLinkStyles();

    return () => {
      editor.off('update', addLinkStyles);
    };
  }, [editor]);

  return (
    <div className={className}>
    <div className='m-1 rounded-sm border-2 border-bg-gray-d/60 mx-0 md:mx-0'>
      {editor && <Toolbar editor={editor} />}
      <EditorContent
        editor={editor}
        className='p-[20px] min-h-[350px] md:min-h-[450px] text-black prose prose-lg max-w-none'
      />
    </div>
    </div>
  );
}