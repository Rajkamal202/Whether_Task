import React from 'react';

export const Card = ({ className, ...props }) => (
  <div className={`bg-white shadow-md rounded-lg ${className}`} {...props} />
);

export const CardHeader = ({ className, ...props }) => (
  <div className={`p-6 ${className}`} {...props} />
);

export const CardTitle = ({ className, ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
);

export const CardDescription = ({ className, ...props }) => (
  <p className={`text-sm text-gray-500 ${className}`} {...props} />
);

export const CardContent = ({ className, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
);

