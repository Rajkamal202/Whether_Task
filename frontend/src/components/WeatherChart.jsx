import React from 'react';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherChart = ({ weatherData }) => {
  if (!weatherData) return null;

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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Weather Forecast for ${weatherData.city}`,
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Forecast</CardTitle>
        <CardDescription>Temperature and humidity forecast for {weatherData.city}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Line options={options} data={chartData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherChart;

