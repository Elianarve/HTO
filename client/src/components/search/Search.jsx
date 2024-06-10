import { useState } from 'react';
import '../search/Search.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); 
  };
  return (
    <>
      <input className="search-bar" placeholder="Busca por Nombre o Descripción..." value={searchTerm} onChange={handleSearch}/>
    </>
  );
};

export default SearchBar;