'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { PrincipalTextWhite } from '@components/atoms/text';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <div className='flex flex-col items-center mt-8'>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={handleChange}
        className="border border-gray-300 px-36 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl text-center"
      />
      <button id="btnBuscar"
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded-md ml-2"
      >
        <PrincipalTextWhite text="Buscar"></PrincipalTextWhite>

      </button>
    </form>
    </div>
  );
};

export default SearchBar;
