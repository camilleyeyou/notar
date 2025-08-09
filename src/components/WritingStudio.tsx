
import React, { useState, useEffect, useCallback } from 'react';
import { useDebounce } from './hooks/useDebounce';
import { getNotaryObservation } from './services/geminiService';
import { Button } from './ui/Button';
import { EyeIcon } from './constants/constants';

interface WritingStudioProps {
  onComplete: (text: string) => void;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

export const WritingStudio: React.FC<WritingStudioProps> = ({ onComplete, onBack, isLoading, error }) => {
  const [text, setText] = useState('');
  const [observation, setObservation] = useState('Awaiting your first words...');
  const [isObserving, setIsObserving] = useState(false);
  const debouncedText = useDebounce(text, 1200);

  const fetchObservation = useCallback(async () => {
    if (!debouncedText) {
      setObservation("Ready to observe. The blank page holds infinite potential.");
      return;
    }
    setIsObserving(true);
    try {
      const newObservation = await getNotaryObservation(debouncedText);
      setObservation(newObservation);
    } catch (err) {
      console.error(err);
      setObservation("There was a brief issue with observation. Please continue.");
    } finally {
      setIsObserving(false);
    }
  }, [debouncedText]);

  useEffect(() => {
    fetchObservation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText]);

  const handleComplete = () => {
    if (text.trim().length > 10) {
      onComplete(text);
    } else {
      alert("Please write a bit more to receive a proper certification.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif text-white">Live Authorship Session</h1>
        <p className="text-gray-400 mt-2">A Certified Human Content Notary™ is now observing. Write freely.</p>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-md mb-6" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-96 p-4 bg-gray-900 border border-gray-700 rounded-md text-lg text-gray-200 focus:ring-2 focus:ring-brand-accent focus:outline-none resize-none leading-relaxed"
            placeholder="Your authentic words go here..."
            disabled={isLoading}
          />
        </div>
        <div className="flex flex-col">
          <div className="bg-brand-slate border border-gray-700 rounded-lg p-6 flex-grow">
            <h2 className="font-serif text-xl text-white mb-4 flex items-center">
              <EyeIcon className="w-6 h-6 mr-2 text-brand-accent"/>
              Notary's Log
            </h2>
            <div className="h-64 overflow-y-auto text-gray-300 space-y-4">
               <div className={`transition-opacity duration-500 ${isObserving ? 'opacity-50' : 'opacity-100'}`}>
                 <p className="italic">{observation}</p>
                 {isObserving && <p className="text-sm text-brand-accent mt-2 animate-pulse">Notary is observing...</p>}
               </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-between items-center">
        <Button onClick={onBack} variant="secondary" disabled={isLoading}>
          Cancel Session
        </Button>
        <Button onClick={handleComplete} isLoading={isLoading} disabled={text.trim().length === 0}>
          Finish & Certify
        </Button>
      </div>
    </div>
  );
};
