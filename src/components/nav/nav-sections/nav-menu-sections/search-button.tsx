import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function SearchButton() {
  return (
    <>
      <Link to='#' className='block'>
        <span className='blind'>검색</span>
        <Search className='search-btn' />
      </Link>
    </>
  );
}
