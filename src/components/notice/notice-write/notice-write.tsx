import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'react-router-dom';
// import NoticeEditor from './notice-editor';
import { useState, useEffect } from 'react';
import { NotepadText } from 'lucide-react';
import NoticeNav from '../notice-nav.tsx/notice-nav';
// import NoticeEditor from './notice-editor';
import { CATEGORY_LIST } from '@/constants/notice/notice-category';
import Toolbar from './toolbar';

import { useEditor, EditorContent } from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';

const categoryList = CATEGORY_LIST;

export default function NoticeWrite() {
  const [title, setTitle] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') ?? '일반';
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true, // 여러 색상 가능하게
      }),
    ],
    content: '<p style="text-align:left;">여기에 내용을 입력하세요</p>',
  });
  const handleCategoryChange = (category: string) => {
    setSearchParams((prevSearchParams) => {
      if (category === 'all') {
        prevSearchParams.delete('category');
      } else {
        prevSearchParams.set('category', category);
      }
      return prevSearchParams;
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <div className='h-full w-full max-w-[1260px] pt-[100px] px-5 xl:px-0 mx-auto text-center'>
      <div className='w-full  text-center'>
        <div className='flex justify-start  items-center  gap-1 w-full pb-[18px]'>
          <div className='p-2 rounded-[5px] text-white bg-secondary'>
            <NotepadText size={32} strokeWidth={2} />
          </div>
          <strong className='p-2 text-gray-600 text-lg font-bold'>
            게시물 작성
          </strong>
        </div>
        <div className='flex flex-col md:flex-row gap-4 mb-4 overflow-x-auto'>
          {/* 제목 */}
          <div className='flex items-center gap-2 flex-grow t-b-16'>
            <label className='font-semibold whitespace-nowrap w-[30px]'>
              제목
            </label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='제목을 입력해주세요'
              className='w-[94%] border border-gray-300 rounded px-3 py-2'
            />
          </div>
          {/* 구분 */}
          <div className='flex items-center gap-2'>
            <label className='font-semibold whitespace-nowrap t-b-16 w-[30px]'>
              구분
            </label>
            <Select
              value={selectedCategory}
              onValueChange={(value) => handleCategoryChange(value)}
            >
              <SelectTrigger className='border rounded w-[80px] md:w-[100px] px-1 py-0 md:px-3 md:py-2'>
                <SelectValue placeholder='구분' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>전체</SelectItem>
                {categoryList.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 시작일 */}
          <div className='flex items-center gap-2'>
            <label className='font-semiboldwhitespace-nowrap'>시작일</label>
            <input
              type='date'
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className='border border-gray-300 rounded px-3 py-2 w-[140px]'
            />
          </div>

          {/* 종료일 */}
          <div className='flex items-center gap-2'>
            <label className='font-semiboldwhitespace-nowrap'>종료일</label>
            <input
              type='date'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className='border border-gray-300 rounded px-3 py-2 w-[140px]'
            />
          </div>
        </div>
        {/* 에디터 */}
        {/* <NoticeEditor /> */}
        <div className='m-1 border-1 rounded-sm border-[#cacad6]'>
          {editor && <Toolbar editor={editor} />}
          <EditorContent editor={editor} className='p-[12px]' />
        </div>
        <div className='flex justify-between mt-4'>
          <NoticeNav />
          <Button
            type='button'
            className='h-[30px] md:h-[40px] w-[80px] md:w-[120px]'
            onClick={() => {
              console.log({
                title,
                category: selectedCategory,
                startDate,
                endDate,
              });
            }}
          >
            작성완료
          </Button>
        </div>
      </div>
    </div>
  );
}
