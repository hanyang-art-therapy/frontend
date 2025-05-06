import React from 'react';

const Certificates: React.FC = () => {
  return (
    <div className='max-w-[1080px] mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-6 text-center'>학과 관련 자격증</h2>
      <p className='mb-4 text-gray-700 leading-relaxed'>
        미술치료는 예술적 표현을 통해 정서적·심리적 치유를 돕는 전문 분야로,
        자격증 취득은 전문가로서의 첫걸음입니다. 한양대학교 ERICA
        미술치료학과에서는 다양한 자격증 과정을 통해 여러분의 진로 확장을 적극
        지원하고 있습니다.
      </p>

      <div className='space-y-6'>
        <div className='bg-white shadow-md rounded-xl p-4'>
          <h3 className='text-lg font-semibold mb-2 text-black-700'>
            ✅ 발달장애 아동·청소년 바우처 자격증
          </h3>
          <p className='text-gray-700 leading-relaxed'>
            졸업 후 관련 기관에 이수 과목 및 현장실습 확인서를 제출하면,
            발달장애 아동·청소년을 대상으로 한 바우처 지원 자격증을 취득할 수
            있습니다.
          </p>
        </div>

        <div className='bg-white shadow-md rounded-xl p-4'>
          <h3 className='text-lg font-semibold mb-2 text-black-700'>
            ✅ 한국예술치료학회 미술심리상담사 1급 자격
          </h3>
          <p className='text-gray-700 leading-relaxed'>
            2023년, 우리 학과는 한국예술치료학회와 MOU를 체결하였습니다. 이에
            따라 본과 교육과정 및 집단 수퍼비전이 학회에서 공식적으로
            인정됩니다. 또한, 학회 학술활동 시간과 현장실습 시간을 충족하면
            미술심리상담사 1급 시험 응시 자격을 얻을 수 있습니다.
          </p>
        </div>

        <div className='bg-white shadow-md rounded-xl p-4'>
          <h3 className='text-lg font-semibold mb-2 text-black-700'>
            ✅ 예술심리상담사 1급 (한양대 총장 명의)
          </h3>
          <p className='text-gray-700 leading-relaxed'>
            서울 한양대 미래인재교육원에서 개설되는 13주 과정 자격증 프로그램을
            통해, 한양대학교 총장 명의의 예술심리상담사 1급 자격증을 취득할 수
            있습니다.
          </p>
          <ul className='list-disc list-inside text-gray-700 mt-2 space-y-1'>
            <li>80시간 이상의 임상 경험이 필요합니다.</li>
            <li>2급 없이 곧바로 1급 시험 응시 및 취득이 가능합니다.</li>
          </ul>
        </div>
      </div>

      <p className='mt-6 text-gray-700 leading-relaxed'>
        자격증 취득을 위해서는 학업과 실습을 체계적으로 계획하는 것이 중요하며,
        졸업 후에도 지속적인 전문성 개발을 위한 노력이 필요합니다.
      </p>
    </div>
  );
};

export default Certificates;
