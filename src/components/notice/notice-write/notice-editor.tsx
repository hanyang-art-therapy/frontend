import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import { useEffect, useRef, useState } from 'react';

export default function NoticeEditor() {
  const editorRef = useRef<Editor>(null);
  const [height, setHeight] = useState('550px');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setHeight('450px');
      } else {
        setHeight('550px');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='text-left h-auto md:h-[550px]'>
      <Editor
        ref={editorRef}
        placeholder='내용을 입력해주세요'
        previewStyle='vertical'
        height={height}
        initialEditType='wysiwyg'
        useCommandShortcut={false}
      />
    </div>
  );
}
