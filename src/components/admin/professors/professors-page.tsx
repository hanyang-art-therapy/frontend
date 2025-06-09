import ProfessorView from '@/components/admin/professors/professor/professor-view';
import ProfessorForm from '@/components/admin/professors/professor/professor-form';
import TabButton from '@/components/admin/tab-btn';
import { TabType } from '@/components/admin/tab-btn';
import { useState } from 'react';

export default function AdminProfessor() {
  const [selectedTab, setSelectedTab] = useState<TabType>('view');

  const content =
    selectedTab === 'view' ? <ProfessorView /> : <ProfessorForm />;

  return (
    <>
      <div className='fixed z-5 w-full pt-[100px] bg-white'>
        <h2 className='t-b-24'>교수진 관리</h2>
        <div className='flex space-x-[10px] mt-[10px]'>
          <TabButton
            isSelected={selectedTab === 'view'}
            onSelect={() => setSelectedTab('view')}
          >
            조회
          </TabButton>
          <TabButton
            isSelected={selectedTab === 'form'}
            onSelect={() => setSelectedTab('form')}
          >
            등록
          </TabButton>
        </div>
      </div>

      <div className='pt-[215px] min-h-[100vh]'>{content}</div>
    </>
  );
}
