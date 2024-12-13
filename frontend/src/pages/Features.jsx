import React from 'react';
import { CheckCircle } from 'lucide-react';

const Features = () => {
  const featureList = [
    "Real-time weather integration",
    "Task creation and management",
    "Weather-based task suggestions",
    "User authentication and personalized task lists",
    "Responsive design for desktop and mobile use",
    "Easy-to-use interface",
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Features</h1>
      <p className="text-lg mb-8">
        Weather Task Manager comes packed with features to help you manage your tasks efficiently
        while taking weather conditions into account. Here are some of our key features:
      </p>
      <ul className="space-y-4">
        {featureList.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
            <span className="text-lg">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
        <p className="text-lg mb-4">
          We're constantly working on improving Weather Task Manager. Here are some features we're
          planning to add in the near future:
        </p>
        <ul className="list-disc list-inside space-y-2 text-lg">
          <li>Integration with popular calendar apps</li>
          <li>Advanced weather forecasting for long-term task planning</li>
          <li>Customizable weather condition thresholds for task suggestions</li>
          <li>Collaborative task management for teams</li>
        </ul>
      </div>
    </div>
  );
};

export default Features;


