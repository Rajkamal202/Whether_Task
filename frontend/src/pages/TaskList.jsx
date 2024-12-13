import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Cloud, Sun, Moon, CloudRain } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import WeatherDisplay from '../components/WeatherDisplay';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setTasks(response.data);
      if (response.data.length > 0) {
        setSelectedCity(response.data[0].city);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to fetch tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
      alert('Failed to delete task. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500';
      case 'In-Progress':
        return 'bg-blue-500';
      case 'Completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getWeatherIcon = (weather) => {
    switch (weather?.toLowerCase()) {
      case 'clear':
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'clouds':
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case 'rain':
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      case 'night':
        return <Moon className="h-6 w-6 text-indigo-500" />;
      default:
        return <Cloud className="h-6 w-6 text-gray-500" />;
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center p-8">
      <div className="text-red-500 mb-4">{error}</div>
      <Button onClick={fetchTasks}>Try Again</Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Task List</h2>
        <Link to="/add-task">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Add New Task
          </Button>
        </Link>
      </div>

      {selectedCity && (
        <WeatherDisplay city={selectedCity} token={user.token} />
      )}

      {tasks.length === 0 ? (
        <Card className="text-center p-8 mt-8">
          <CardContent className="pt-6">
            <div className="mb-4">
              <PlusCircle className="h-12 w-12 mx-auto text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
            <p className="text-gray-500 mb-4">Start by adding a new task to your list.</p>
            <Link to="/add-task">
              <Button>Create Your First Task</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {tasks.map(task => (
            <Card 
              key={task._id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedCity(task.city)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{task.title}</CardTitle>
                    <CardDescription>{task.description}</CardDescription>
                  </div>
                  {getWeatherIcon(task.weather)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                    <span className="text-sm text-gray-500">{task.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to={`/edit-task/${task._id}`}>
                      <Button variant="outline" size="sm">Edit</Button>
                    </Link>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(task._id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;









