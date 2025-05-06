import { Professor } from 'src/types/index.ts';

type ProfessorModalProps = {
  professor: Professor;
  onClose: () => void;
};

const ProfessorModal: React.FC<ProfessorModalProps> = ({
  professor,
  onClose,
}) => {
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center pt-[200px]'
      onClick={handleOutsideClick}>
      <div className='bg-white rounded-xl shadow-lg max-w-4xl w-full p-6 relative flex gap-6 max-h-[90vh] overflow-y-auto'>
        <button
          className='absolute top-4 right-4 text-gray-500 hover:text-black text-2xl'
          onClick={onClose}>
          &times;
        </button>
        {professor.image && (
          <img
            src={professor.image}
            alt={professor.name}
            className='w-48 h-48 object-cover rounded-xl'
          />
        )}
        <div>
          <h2 className='text-2xl font-bold mb-2'>{professor.name}</h2>
          <p className='text-sm text-gray-600 mb-1'>{professor.position}</p>
          <p className='text-sm text-gray-600 mb-3'>{professor.major}</p>
          {professor.bio && (
            <pre className='whitespace-pre-wrap text-sm text-gray-800'>
              {professor.bio}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessorModal;
