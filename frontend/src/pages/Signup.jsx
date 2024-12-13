import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Make sure this matches your backend URL exactly
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.message) {
        alert('Signup successful! Please login.');
        navigate('/login');
      }
    } catch (err) {
      console.error('Signup error:', err.response?.data || err);
      setError(
        err.response?.data?.error || 
        'An error occurred during signup. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 rounded">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <p className="text-xs text-gray-500">Password must be at least 6 characters long</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </div>
      </form>
      <p className="text-center text-gray-600 text-sm">
        Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Log in</Link>
      </p>
    </div>
  );
};

export default Signup;













