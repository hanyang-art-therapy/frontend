import { PROFESSORS } from '@/constants/intro/professors';

export default function ProfessorsContent() {
  return (
    <ul className='grid md:grid-cols-3 gap-6'>
      {PROFESSORS.map((professor) => (
        <li
          key={professor.name + professor.image}
          className='shadow-lg rounded-xl p-4 text-center transform hover:-translate-y-2 transition-transform duration-300 ease-in-out'>
          {professor.image && (
            <img
              src={professor.image}
              alt={professor.name}
              className='w-32 h-32 object-cover rounded-full mx-auto mb-4'
            />
          )}

          <h3 className='title-b-18'>{professor.name}</h3>
          <p>{professor.position}</p>

          {professor.major && (
            <p className='text-r-14 mt-1'>{professor.major}</p>
          )}

          {professor.email && (
            <p className='text-r-14 text-primary mt-1'>
              <a
                href={`mailto:${professor.email}`}
                className='underline hover:text-primary/80 cursor-pointer'>
                {professor.email}
              </a>
            </p>
          )}

          {professor.phone && (
            <p className='text-r-14 text-gray mt-1'>
              <a
                href={`tel:${professor.phone}`}
                className='underline hover:text-gray/80 cursor-pointer'>
                {professor.phone}
              </a>
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
