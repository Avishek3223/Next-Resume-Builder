"use client";

import React, { useState, useContext } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, GithubAuthProvider } from 'firebase/auth';
import { auth } from './firebaseApp';
import GoogleLogo from '../utils/GoogleLogo.svg';
import GithubIcon from '../utils/GithubIcon.svg';
import { useRouter } from 'next/navigation';
import { UserDataContext } from '@/context/UserDataContext';

const AuthComponent = ({ showLoginModal, handleCloseModal, isRegister, setIsRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const { createUser } = useContext(UserDataContext);

  const handleToggleForm = () => {
    setIsRegister(!isRegister);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      router.push('/template');
      const user = userCredential.user;
      console.log('Logged in successfully:', user);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await createUser(name, email);
      const user = await createUserWithEmailAndPassword(auth, email, password);
      router.push('/template');
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        emailId: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };

      if (isRegister) {
        await createUser(userData.displayName, userData.emailId);
      }

      const cache = await caches.open('user-data');
      await cache.put('user', new Response(JSON.stringify(userData)));

      router.push('/template');
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  const handleGitHubAuth = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        emailId: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };

      if (isRegister) {
        await createUser(userData.displayName, userData.emailId);
      }

      router.push('/template');
    } catch (error) {
      console.error('Error during GitHub sign-in:', error);
    }
  };

  return (
    <div className={showLoginModal ? "fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50" : "hidden"}>
      <div className="bg-white p-8 rounded-lg w-96" style={{ backdropFilter: 'blur(20px)' }}>
        <div className=' text-[1.2rem] font-[300] mb-1'>Welcome !</div>
        <h2 className="text-[1.5rem] font-[600]">{isRegister ? 'Sign up to' : 'Login to'}</h2>
        <div className='text-[0.8rem] mb-6'>construct a dynamic recruitment-focused resume</div>
        <form onSubmit={isRegister ? handleSignup : handleLogin}>
          {isRegister && (
            <div className="mb-4">
              <label htmlFor="name" className="text-black">Name</label>
              <input placeholder='Enter your Name' type="text" id="name" name="name" className="mt-1 p-2 w-full border border-black rounded-md" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="text-black">Email</label>
            <input placeholder='Enter your Email' type="email" id="email" name="email" className="mt-1 p-2 w-full border border-black rounded-md" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className=" text-[black]">Password</label>
            <input placeholder='Enter your Password' type="password" id="password" name="password" className="mt-1 p-2 w-full border border-black rounded-md" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {isRegister && (
            <>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="text-black">Confirm Password</label>
                <input placeholder='Confirm your Password' type="password" id="confirmPassword" name="confirmPassword" className="mt-1 p-2 w-full border border-black rounded-md" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            </>
          )}
          <div className="flex justify-between items-center mb-4 mt-7">
            <button type="submit" className="px-4 py-2 bg-black w-full text-white rounded-md">{isRegister ? 'Sign Up' : 'Login'}</button>
          </div>
          <button type="button" onClick={handleGoogleAuth} className="text-center w-full py-2 flex items-center gap-8 mt-4" style={{ boxShadow: '0 0px 10px rgba(0, 0, 0, 0.2)' }}>
          <div className="ml-8"><GoogleLogo /></div>
            Sign in with Google
          </button>
          <button type="button" onClick={handleGitHubAuth} className="text-center w-full py-2 flex items-center gap-8 mt-4" style={{ boxShadow: '0 0px 10px rgba(0, 0, 0, 0.2)' }}>
          <div className="ml-8"><GithubIcon /></div>
            Sign in with GitHub
          </button>
          <div className='text-center mt-4'>
            {isRegister ? (
              <p>Already have an account? <button type="button" onClick={handleToggleForm} className="font-[600]">Login</button></p>
            ) : (
              <p>Don&apos;t have an account? <button type="button" onClick={handleToggleForm} className="font-[600]">Sign up</button></p>
            )}
          </div>
        </form>
        <button className="absolute top-0 right-0 p-2" onClick={handleCloseModal}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.707 4.293a1 1 0 011.414 0L10 8.586l4.793-4.793a1 1 0 111.414 1.414L11.414 10l4.793 4.793a1 1 0 01-1.414 1.414L10 11.414l-4.793 4.793a1 1 0 01-1.414-1.414L8.586 10 3.793 5.207a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AuthComponent;
