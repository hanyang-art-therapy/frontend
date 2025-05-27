// STEP 1: 약관동의

import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SIGN_UP_AGREEMENT } from '@/constants/auth/sign-up';
import { cn } from '@/lib/utils';
import { type Dispatch, type SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpStep1({
  setProgress,
}: {
  setProgress: Dispatch<SetStateAction<number>>;
}) {
  const navigate = useNavigate();
  const { section1, section2 } = SIGN_UP_AGREEMENT;
  const [agreement, setAgreement] = useState('agree');

  return (
    <div className='space-y-[50px] mt-10 sm:mt-15'>
      {/* 메인 섹션 1 */}
      <section className='space-y-[30px]'>
        <h2 className='t-b-24'>{section1.title}</h2>

        <div className='space-y-2.5 t-r-18'>
          <p>{section1.paragraphs[0]}</p>

          <p>{section1.paragraphs[1]}</p>
        </div>

        <div className='space-y-2.5 t-r-14 text-gray'>
          <p>{section1.notices[0]}</p>

          <p>{section1.notices[1]}</p>
        </div>
      </section>

      {/* 메인 섹션 2 */}
      <section className='space-y-[30px]'>
        <div className='space-y-2.5'>
          <h3 className='t-b-18'>{section2.privacyTitle}</h3>

          <p className='t-r-14'>{section2.privacyDescription}</p>
        </div>

        {/* 개인정보 수집 이용 안내 테이블 */}
        <div className='space-y-2.5'>
          <h3 className='t-m-18'>{section2.collectPrivacyTitle}</h3>

          <div className='border border-bg-gray-d overflow-hidden'>
            <table className='w-full'>
              <thead>
                <tr className='flex h-[45px] items-center t-r-16 bg-bg-gray-fa border-b border-bg-gray-d'>
                  {section2.collectPrivacyItems.map((text, idx) => (
                    <td
                      key={idx}
                      className={cn(
                        'w-1/3 h-full flex items-center justify-center text-center',
                        idx < 2 && 'border-r border-bg-gray-d'
                      )}>
                      <span className='my-auto'>{text}</span>
                    </td>
                  ))}
                </tr>
              </thead>

              <tbody>
                <tr className='flex'>
                  {section2.collectPrivacyDetails.map((detail, idx) => (
                    <td
                      key={idx}
                      className={cn(
                        'w-1/3 h-32 border-r border-bg-gray-d p-2 overflow-y-auto',
                        idx === 2 && 'border-r-0'
                      )}>
                      <span className='t-r-16'>{detail.title}</span>

                      <ul className='space-y-1 mt-2'>
                        {detail.list.map((item, idx) => (
                          <li key={idx} className='t-r-14'>
                            · {item}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 동의를 거부할 권리 및 동의 거부에 따른 불이익 */}
        <div className='space-y-2 mt-6'>
          <h3 className='t-b-18'>{section2.rejectTitle}</h3>
          <span>
            <p className='t-r-16'>{section2.rejectDescription1}</p>
            <p className='t-r-16'>{section2.rejectDescription2}</p>
          </span>
        </div>

        {/* 동의 여부 라디오 버튼 - default: 동의함 */}
        <RadioGroup
          defaultValue='agree'
          className='flex md:space-x-[30px] space-x-2 justify-end'
          onValueChange={setAgreement}>
          <div className='flex items-center space-x-1.5'>
            <label htmlFor='agree' className='t-b-16'>
              동의함
            </label>
            <RadioGroupItem value='agree' id='agree' />
          </div>

          <div className='flex items-center space-x-1.5'>
            <label htmlFor='disagree' className='t-b-16'>
              동의하지 않음
            </label>
            <RadioGroupItem value='disagree' id='disagree' />
          </div>
        </RadioGroup>
      </section>

      {/* 확인 | 취소 */}
      <div className='flex justify-center space-x-5 '>
        <Button
          className='w-[100px] h-[50px]'
          disabled={agreement === 'disagree'}
          onClick={() => setProgress(2)}>
          확인
        </Button>
        <Button
          variant='outline'
          className='w-[100px] h-[50px]'
          onClick={() => navigate(-1)}>
          취소
        </Button>
      </div>
    </div>
  );
}
