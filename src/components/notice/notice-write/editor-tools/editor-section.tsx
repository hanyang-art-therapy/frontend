import { EditorContent } from '@tiptap/react';
import Toolbar from '../toolbar';

export default function EditorSection({ editor }: { editor: any }) {
  return (
    <div className='m-1 border-1 rounded-sm border-[#cacad6]'>
      {editor && <Toolbar editor={editor} />}
      <EditorContent
        editor={editor}
        className='p-[20px] min-h-[350px] md:min-h-[450px]'
      />
    </div>
  );
}
