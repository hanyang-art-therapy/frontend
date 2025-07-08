import { Editor } from '@tiptap/react';
import FontSizeButtons from './toolbar-buttons/font-size-buttons';
import TextColorButtons from './toolbar-buttons/text-color-buttons';
import TextStyleButtons from './toolbar-buttons/text-style-buttons';
import ListAlignButtons from './toolbar-buttons/list-align-buttons';

type ToolbarProps = {
  editor: Editor | null;
};

// 구분선
const Divider = () => (
  <div className='w-[1px] h-[25px] mx-[15px] bg-[#cacad6] hidden md:block' />
);

export default function ToolbarHeading({ editor }: ToolbarProps) {
  if (!editor) return null;

  return (
    <div className='w-full border-1 rounded-sm border-b-1 border-bg-gray-d/60 md:mx-0 p-2'>
      <div className='flex flex-col md:flex-row md:items-center justify-center md:justify-start md:p-[8px] gap-2 md:gap-0'>
        <div className='flex justify-start items-center gap-2'>
          <FontSizeButtons editor={editor} />
          <TextColorButtons editor={editor} />
        </div>
        <div className='flex justify-start items-center'>
          <TextStyleButtons editor={editor} />
          <ListAlignButtons editor={editor} />
          <Divider />
        </div>
      </div>
    </div>
  );
}
