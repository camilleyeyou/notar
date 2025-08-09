
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  isFeatured?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', isFeatured = false }) => {
  const borderClass = isFeatured ? 'border-brand-accent' : 'border-gray-700';
  return (
    <div className={`bg-brand-slate border ${borderClass} rounded-lg shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
};
