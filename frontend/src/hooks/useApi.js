import { useState, useCallback, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, logout } = useContext(AuthContext);

  const apiCall = useCallback(async (method, url, data = null) => {
    setLoading(true);
    setError(null);

    try {
      const config = {
        method,
        url: `${process.env.REACT_APP_API_URL}${url}`,
        headers: user ? { Authorization: `Bearer ${user.token}` } : {},
        data,
      };

      const response = await axios(config);
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 401) {
        logout();
      }
      setError(err.response?.data?.error || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user, logout]);

  return { apiCall, loading, error };
};

export default useApi;

