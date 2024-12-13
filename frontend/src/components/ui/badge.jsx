import React from 'react';

export const Badge = ({ className, ...props }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}
    {...props}
  />
);

