// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    // Hardcoded credentials for frontend-only security
    if (username === 'admin' && password === 'saffron123') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-md border border-amber-100 dark:border-slate-700 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-amber-100 dark:bg-slate-700 rounded-full mb-4">
            <Lock className="text-amber-600 dark:text-amber-400" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-amber-900 dark:text-white">Admin Portal</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-2 text-sm">Authorized personnel only</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg mb-6 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Username</label>
            <input 
              name="username" 
              type="text" 
              required 
              className="w-full border border-gray-300 dark:border-slate-600 bg-transparent dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full border border-gray-300 dark:border-slate-600 bg-transparent dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500" 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-amber-600 text-white font-bold py-3 rounded-lg hover:bg-amber-700 transition shadow-sm mt-4"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}