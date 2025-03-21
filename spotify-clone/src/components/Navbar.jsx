import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div className='w-full flex justify-between items-center font-semibold'>
        <div className='flex items-center gap-2'>
          <img onClick={() => navigate(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt='' />
          <img onClick={() => navigate(1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt='' />
        </div>
        <div className='flex items-center gap-4'>
          <p className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer'>Explore Premium</p>
          <p className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer'>Install App</p>
          <p onClick={() => setShowAuthModal(true)} className='bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center cursor-pointer'>G</p>
        </div>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <p className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>All</p>
        <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Music</p>
        <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Podcasts</p>
      </div>
      
      {showAuthModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-90'>
          <div className='bg-black p-6 rounded-lg w-80 text-white'>
            <h2 className='text-xl font-bold mb-4'>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <input type='email' placeholder='Email' className='w-full mb-2 p-2 border rounded bg-gray-800 text-white' />
            <input type='password' placeholder='Password' className='w-full mb-2 p-2 border rounded bg-gray-800 text-white' />
            {!isLogin && <input type='text' placeholder='Username' className='w-full mb-2 p-2 border rounded bg-gray-800 text-white' />}
            <button className='w-full bg-white text-black p-2 rounded'>{isLogin ? 'Login' : 'Sign Up'}</button>
            <p className='text-center mt-2 text-sm cursor-pointer' onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </p>
            <div className='flex gap-2 mt-2'>
              <button className='w-full bg-white text-black p-2 rounded' onClick={() => setIsLogin(false)}>Sign Up</button>
              <button className='w-full bg-gray-700 text-white p-2 rounded' onClick={() => setShowAuthModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
