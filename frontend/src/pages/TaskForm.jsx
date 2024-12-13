import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import WeatherStats from '../components/WeatherStats';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const { title, description, status, city, weather } = response.data;
      setTitle(title);
      setDescription(description);
      setStatus(status);
      setCity(city);
      setWeather(weather);
    } catch (err) {
      console.error('Error fetching task:', err);
      setError('Failed to fetch task details. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const taskData = { title, description, status, city };
    try {
      if (id) {
        await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${id}`, taskData, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, taskData, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
      }
      navigate('/tasks');
    } catch (err) {
      console.error('Error submitting task:', err);
      setError('Failed to save task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">{id ? 'Edit Task' : 'Add New Task'}</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 rounded">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
            Status
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
            City
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="city"
            type="text"
            placeholder="City for weather"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        {weather && (
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Current Weather
            </label>
            <p className="text-gray-600">{weather}</p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Saving...' : (id ? 'Update Task' : 'Add Task')}
          </button>
        </div>
      </form>
      {city && <WeatherStats city={city} />}
    </div>
  );
};

export default TaskForm;






