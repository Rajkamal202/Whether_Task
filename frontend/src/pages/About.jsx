import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Weather Task Manager</h1>
      <p className="text-lg mb-4">
        Weather Task Manager is an innovative application designed to help you organize your tasks
        based on current weather conditions. Our unique approach combines task management with
        real-time weather data to optimize your productivity and planning.
      </p>
      <p className="text-lg mb-4">
        Founded in 2023, our team of developers and weather enthusiasts came together with a shared
        vision: to create a tool that not only helps you manage your tasks but also takes into
        account the impact of weather on your daily activities.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
      <p className="text-lg mb-4">
        Our mission is to empower users to make informed decisions about their tasks and activities
        by providing a seamless integration of weather data and task management. We believe that by
        considering the weather in your planning, you can improve your productivity and make better
        use of your time.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">How It Works</h2>
      <p className="text-lg mb-4">
        Weather Task Manager uses real-time weather data to provide suggestions and organize your
        tasks. When you create a task, you can specify the location, and our system will
        automatically fetch the current weather conditions for that area. This information is then
        used to help you prioritize and plan your tasks more effectively.
      </p>
    </div>
  );
};

export default About;



