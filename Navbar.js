  import React from 'react';
  import pic1 from '../Components/pic1.png';
  export default function Navbar() {
    return (
      <nav className='flex justify-between bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-2'>
        <div className='flex'>
          <img className=' h-10 w-10 ml-3 mr-1 cursor-pointer' src={pic1} alt="" />
          <span className=" font-medium cursor-pointer hover:font-bold transition-all text-2xl mt-1.5">Task Fiesta</span>

          <ul className='flex gap-8 mt-2'>
          <li className="cursor-pointer ml-9 text-xl hover:font-bold transition-all">Home</li>
          <li className="cursor-pointer text-xl hover:font-bold transition-all">About</li>
        </ul> 
        </div>
        {/* <ul className='flex gap-8 mt-2'>
          <li className="cursor-pointer text-xl hover:font-bold transition-all">Home</li>
          <li className="cursor-pointer text-xl hover:font-bold transition-all">About</li>
        </ul> */}
      </nav>
    )
  }
