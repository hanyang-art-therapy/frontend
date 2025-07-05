import { Editor } from '@tiptap/react';
import ToolbarHeading from './toolbar-tools/toolbar-heading';

type ToolbarProps = {
  editor: Editor;
};

export default function Toolbar({ editor }: ToolbarProps) {
  if (!editor) return null;

  return (
    <div className='flex items-center justify-start'>
      <ToolbarHeading editor={editor} />
    </div>
  );
}
