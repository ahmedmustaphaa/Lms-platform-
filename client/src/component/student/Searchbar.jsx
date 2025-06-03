import React, { useState } from 'react';
import { assets } from '../../assets/assets'; 
import { data, useNavigate } from 'react-router-dom'; // Ensure you're importing from 'react-router-dom'

export default function Searchbar({data}) {
  const navigate = useNavigate();
  const [input, setInput] = useState(data?data:''); 
  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate('/course-list/' + input); 
  }

  return (
    <div className='pt-8 w-full max-w-[550px]'>
      <form onSubmit={onSearchHandler}>
        <div className='flex items-center gap-2'>
          <div className='relative w-full'>
            <img 
              src={assets.search_icon} 
              alt="Search Icon" 
              className='absolute left-3 top-2.5 w-5 h-5' 
            />
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)} // Simplified arrow function
              type="text" 
              placeholder="Search here please" 
              className="border border-gray-300 rounded-lg py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="border border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}