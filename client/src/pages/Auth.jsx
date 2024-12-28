
import React, { useState } from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="max-w-md mx-auto mt-16 px-4">
      <div className="bg-white p-8 rounded-lg shadow">
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 ${isLogin ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 ${!isLogin ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default Auth;