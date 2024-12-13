import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherStats = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/weather/${city}`);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  const chartData = {
    labels: weatherData.hourly.map((hour) => new Date(hour.dt * 1000).toLocaleTimeString()),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: weatherData.hourly.map((hour) => hour.temp),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Humidity (%)',
        data: weatherData.hourly.map((hour) => hour.humidity),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Weather Forecast for ${city}`,
      },
    },
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Weather Statistics for {city}</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default WeatherStats;

