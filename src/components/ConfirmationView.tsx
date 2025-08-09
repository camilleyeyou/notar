import React from 'react';
import type { TimeSlot } from './types/types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { EyeIcon } from './constants/constants';

interface ConfirmationViewProps {
  slot: TimeSlot | null;
  onStart: () => void;
  onHome: () => void;
}

export const ConfirmationView: React.FC<ConfirmationViewProps> = ({ slot, onStart, onHome }) => {
  if (!slot) return null;

  return (
    <div className="max-w-2xl mx-auto text-center animate-fade-in">
      <div className="inline-block bg-green-900/50 p-4 rounded-full mb-6 border-2 border-green-500">
        <svg className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 className="text-4xl font-serif text-white">Booking Confirmed!</h1>
      <p className="text-gray-300 mt-2 mb-8">Your session with a Certified Human Content Notary™ is scheduled.</p>
      
      <Card isFeatured>
        <div className="text-left">
          <div className="flex items-center space-x-3 mb-4">
              <EyeIcon className="w-8 h-8 text-brand-accent" />
              <h2 className="text-2xl font-serif text-white">Your Session Details</h2>
          </div>
          <div className="space-y-2 text-lg">
            <p className="text-gray-300">
                <span className="font-semibold text-white">Date:</span> {slot.date.toLocaleDateString('default', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-gray-300">
                <span className="font-semibold text-white">Time:</span> {slot.time}
            </p>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            When you're ready, you can start your live-authorship session. The notary is standing by.
          </p>
        </div>
      </Card>

      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
        <Button onClick={onStart} className="w-full sm:w-auto">Start Writing Session Now</Button>
        <Button onClick={onHome} variant="secondary" className="w-full sm:w-auto">Back to Home</Button>
      </div>
    </div>
  );
};
