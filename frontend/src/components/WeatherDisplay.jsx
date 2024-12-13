import React, { useState, useEffect } from 'react';
import { Cloud, Sun, Moon, CloudRain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherDisplay = ({ city, token }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const fetchWeatherData = async () => {
    if (!city) return;
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/weather/${city}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (weather) => {
    switch (weather?.toLowerCase()) {
      case 'clear':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'clouds':
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'rain':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case 'night':
        return <Moon className="h-8 w-8 text-indigo-500" />;
      default:
        return <Cloud className="h-8 w-8 text-gray-500" />;
    }
  };

  if (loading) return <div>Loading weather data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!weatherData) return null;

  const chartData = {
    labels: weatherData.hourly.map(hour => 
      new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    ),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: weatherData.hourly.map(hour => hour.temp),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Humidity (%)',
        data: weatherData.hourly.map(hour => hour.humidity),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: `Weather Forecast for ${city}`
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Temperature (°C)'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Humidity (%)'
        },
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getWeatherIcon(weatherData.hourly[0]?.weather)}
          <span>Current Weather in {city}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-lg font-semibold">
            Temperature: {weatherData.hourly[0]?.temp}°C
          </div>
          <div className="text-lg">
            Humidity: {weatherData.hourly[0]?.humidity}%
          </div>
        </div>
        <div className="h-[300px]">
          <Line options={chartOptions} data={chartData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;

