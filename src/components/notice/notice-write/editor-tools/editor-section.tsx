import { EditorContent, Editor } from '@tiptap/react';
import Toolbar from '../toolbar';
import { useEffect } from 'react';

type Props = {
  editor: Editor | null;
  className?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EditorSection({ editor, className }: Props) {
  // 에디터가 마운트된 후 스타일 적용
  useEffect(() => {
    if (!editor) return;

    const addLinkStyles = () => {
      const proseMirror = document.querySelector('.ProseMirror');
      if (proseMirror) {
        // 기존 스타일 제거 후 새로 추가
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

    // 에디터 업데이트 시마다 스타일 확인
    editor.on('update', addLinkStyles);
    addLinkStyles(); // 초기 실행

    return () => {
      editor.off('update', addLinkStyles);
    };
  }, [editor]);

  return (
    <div className={className}>
    <div className='m-1 rounded-sm border-2 border-bg-gray-d/60'>
      {editor && <Toolbar editor={editor} />}
      <EditorContent
        editor={editor}
        className='p-[20px] min-h-[350px] md:min-h-[450px] text-black prose prose-lg max-w-none'
      />
    </div>
    </div>
  );
}