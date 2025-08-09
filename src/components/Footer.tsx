
import React from 'react';
import { EyeIcon } from './constants/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-slate border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-400">
          <div className="flex justify-center items-center mb-4 space-x-2">
            <EyeIcon className="w-7 h-7 text-brand-accent"/>
            <p className="text-xl font-serif text-brand-light">Notar-EYES™</p>
          </div>
          <p className="mb-2 italic">Not Anti-AI. Just Pro-Human.</p>
          <p className="text-sm">© {new Date().getFullYear()} Notar-EYES LLC. A little ceremony for the real.</p>
          <p className="text-xs mt-2">*Notar-EYES™ is a satirical and conceptual service and not a legally binding notary.</p>
        </div>
      </div>
    </footer>
  );
};
