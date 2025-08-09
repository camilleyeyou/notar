
import React from 'react';
import { EyeIcon } from './constants/constants';

interface HeaderProps {
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="bg-brand-dark/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <button onClick={onLogoClick} className="flex items-center space-x-2 text-2xl font-serif text-brand-light hover:text-brand-accent transition-colors">
            <EyeIcon className="w-8 h-8 text-brand-accent" />
            <span>Notar-EYES™</span>
          </button>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#human11" className="text-gray-300 hover:text-brand-accent transition-colors">The Human 11™</a>
            <a href="#pricing" className="text-gray-300 hover:text-brand-accent transition-colors">Pricing</a>
            <a href="#course" className="text-gray-300 hover:text-brand-accent transition-colors">Get Certified</a>
          </nav>
        </div>
      </div>
    </header>
  );
};
