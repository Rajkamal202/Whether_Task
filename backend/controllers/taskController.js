const Task = require('../models/Task');
const axios = require('axios');

const getWeather = async (city) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}`);
    return response.data.weather[0].main;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return 'Unknown';
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, city } = req.body;
    const weather = await getWeather(city);
    const task = new Task({
      title,
      description,
      status,
      weather,
      city,
      user: req.user.userId,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Error creating task' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.userId });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching task' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, city } = req.body;
    const weather = await getWeather(city);
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { title, description, status, weather, city },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
};

