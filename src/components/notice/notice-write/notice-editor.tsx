import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';

import Image from '@tiptap/extension-image';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import { useState } from 'react';

export default function NoticeEditor() {
  const [imageUrl, setImageUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Underline,
      Color,
      Highlight,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image,
    ],
    content: '<p>여기에 글을 써보세요!</p>',
  });

  if (!editor) return null;

  return (
    <div className='space-y-4'>
      {/* 툴바 */}
      <div className='flex flex-wrap gap-2'>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className='btn'
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className='btn'
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className='btn'
        >
          Underline
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className='btn'
        >
          Highlight
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className='btn'
        >
          Left
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className='btn'
        >
          Center
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className='btn'
        >
          Right
        </button>

        <button
          onClick={() => editor.chain().focus().setColor('#f43f5e').run()}
          className='btn text-pink-500'
        >
          Pink
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#3b82f6').run()}
          className='btn text-blue-500'
        >
          Blue
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#16a34a').run()}
          className='btn text-green-600'
        >
          Green
        </button>

        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .setMark('textStyle', { fontSize: '12px' })
              .run()
          }
          className='btn text-sm'
        >
          작게
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .setMark('textStyle', { fontSize: '16px' })
              .run()
          }
          className='btn text-base'
        >
          보통
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .setMark('textStyle', { fontSize: '20px' })
              .run()
          }
          className='btn text-lg'
        >
          크게
        </button>
      </div>

      {/* 이미지 삽입 */}
      <div className='flex gap-2'>
        <input
          type='text'
          placeholder='이미지 URL 입력'
          className='border p-1 rounded text-sm'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button
          onClick={() => {
            editor.chain().focus().setImage({ src: imageUrl }).run();
            setImageUrl('');
          }}
          className='btn'
        >
          이미지 추가
        </button>
      </div>

      {/* 에디터 */}
      <div className='border border-b-bg-gray-d p-3 rounded-lg min-h-[300px] leading-relaxed'>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
