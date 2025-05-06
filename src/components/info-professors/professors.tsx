import React from 'react';

type Professor = {
  name: string;
  position: string;
  major: string;
  email?: string;
  phone?: string;
  image?: string;
};

const professors: Professor[] = [
  {
    name: '김은진',
    position: '교수 (학과주임)',
    major: '미술치료전공',
    email: 'eunjin49@hanyang.ac.kr',
    phone: '031-400-5107',
    image: '/images/professors/professors01.jpg',
  },
  {
    name: '옥금자',
    position: '자문위원',
    major: '',
    email: '',
    phone: '',
    image: '/images/professors/professors02.png',
  },
  {
    name: '김현미',
    position: '교수',
    major: '미술치료전공',
    email: 'studio505@hanyang.ac.kr',
    phone: '',
    image: '/images/professors/professors03.png',
  },
  {
    name: '박성은',
    position: '교수',
    major: '미술치료전공',
    email: 'hyeyu@hanyang.ac.kr',
    phone: '',
    image: '/images/professors/professors04.jpg',
  },
  {
    name: '이현주',
    position: '교수',
    major: '미술치료전공',
    email: 'lhjlhj529@hanyang.ac.kr',
    phone: '',
    image: '/images/professors/professors05.jpg',
  },
  {
    name: '한영희',
    position: '교수',
    major: '예술치료전공',
    email: 'yhee711@hanyang.ac.kr',
    phone: '',
    image: '/images/professors/professors06.jpg',
  },
  {
    name: '허성호',
    position: '교수',
    major: '심리학전공',
    email: 'powerrcy@hanyang.ac.kr',
    phone: '',
    image: '/images/professors/professors07.png',
  },
];

const Professors: React.FC = () => {
  return (
    <div className='max-w-[1080px] mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-6 text-center'>교수진 소개</h2>
      <div className='grid md:grid-cols-3 gap-6'>
        {professors.map((prof, index) => (
          <div
            key={index}
            className='bg-white shadow-md rounded-xl p-4 text-center cursor-pointer transform hover:-translate-y-2 transition-transform duration-300 ease-in-out'>
            {prof.image && (
              <img
                src={prof.image}
                alt={prof.name}
                className='w-32 h-32 object-cover rounded-full mx-auto mb-4'
              />
            )}
            <h3 className='text-lg font-semibold'>{prof.name}</h3>
            <p className='text-gray-600'>{prof.position}</p>
            {prof.major && (
              <p className='text-sm text-gray-500 mt-1'>{prof.major}</p>
            )}
            {prof.email && (
              <p className='text-sm text-blue-600 mt-1'>
                <a
                  href={`mailto:${prof.email}`}
                  className='underline hover:text-blue-800'>
                  {prof.email}
                </a>
              </p>
            )}
            {prof.phone && (
              <p className='text-sm text-gray-500 mt-1'>
                <a
                  href={`tel:${prof.phone}`}
                  className='underline hover:text-gray-700'>
                  {prof.phone}
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Professors;
