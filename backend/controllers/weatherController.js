const axios = require('axios');

exports.getWeatherForecast = async (req, res) => {
  try {
    const { city } = req.params;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`);
    
    // Process the data to get hourly forecast for the next 24 hours
    const hourlyForecast = response.data.list.slice(0, 8).map(item => ({
      dt: item.dt,
      temp: item.main.temp,
      humidity: item.main.humidity,
      weather: item.weather[0].main
    }));

    res.json({
      city: response.data.city.name,
      hourly: hourlyForecast
    });
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    res.status(500).json({ error: 'Failed to fetch weather forecast' });
  }
};

