// src/Login.js
import React from 'react';
import { signInWithPopup,GoogleAuthProvider,getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
const Login  = () => {
  const navigate = useNavigate()
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(); 
      const result = await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in: ", error);
    } finally{
      navigate('/')
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login with Google</h1>
        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
