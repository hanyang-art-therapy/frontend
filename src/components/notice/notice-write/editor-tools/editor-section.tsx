import { EditorContent } from '@tiptap/react';
import Toolbar from '../toolbar';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EditorSection({ editor }: { editor: any }) {
  return (
    <div className='m-1 border-1 rounded-sm border-gray-300'>
      {editor && <Toolbar editor={editor} />}
      <EditorContent
        editor={editor}
        className='p-[20px] min-h-[350px] md:min-h-[450px]'
      />
    </div>
  );
}
