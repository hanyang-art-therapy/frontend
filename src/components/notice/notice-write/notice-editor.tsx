import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import { useRef } from 'react';

export default function NoticeEditor() {
  const editorRef = useRef<Editor>(null);

  return (
    <div className='text-left'>
      <Editor
        ref={editorRef}
        placeholder='내용을 입력해주세요'
        previewStyle='vertical'
        height='400px'
        initialEditType='wysiwyg'
        useCommandShortcut={false}
      />
    </div>
  );
}
