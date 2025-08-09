
import React from 'react';
import { Button } from './ui/Button';
import { EyeIcon } from './constants/constants';

interface CertificateViewProps {
  humanText: string;
  certificationSummary: string;
  onReset: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({ humanText, certificationSummary, onReset }) => {
  const timestamp = new Date().toUTCString();

  return (
    <div className="max-w-3xl mx-auto text-center animate-fade-in">
      <h1 className="text-4xl font-serif text-white mb-4">Certification Granted</h1>
      <p className="text-gray-300 mb-8">This document has been certified as 100% human-authored.</p>

      <div className="bg-brand-slate border-2 border-brand-accent rounded-lg p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 text-brand-dark/10">
            <EyeIcon className="w-48 h-48 transform rotate-12"/>
        </div>
        <div className="relative z-10 text-left">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-serif text-white">Certificate of Human Authorship</h2>
                    <p className="text-brand-accent">Issued by Notar-EYES™</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-400">Certified On</p>
                    <p className="font-mono text-xs text-gray-300">{timestamp}</p>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="font-semibold text-white mb-2">Notary's Attestation:</h3>
                <p className="text-gray-300 italic">"{certificationSummary}"</p>
            </div>
            
            <div className="mb-6">
                <h3 className="font-semibold text-white mb-2">Certified Content (Excerpt):</h3>
                <div className="bg-gray-900/50 p-4 rounded-md max-h-40 overflow-y-auto border border-gray-700">
                    <p className="text-gray-400 whitespace-pre-wrap font-mono text-sm">
                        {humanText.substring(0, 500)}{humanText.length > 500 ? '...' : ''}
                    </p>
                </div>
            </div>

             <p className="text-center text-xs text-gray-500 mt-8">
                This certificate verifies that the creative process was observed live and found to be consistent with the Human 11™ framework for authentic human authorship.
            </p>
        </div>
      </div>
      
      <div className="mt-8">
        <Button onClick={onReset}>Notarize Another Document</Button>
      </div>
    </div>
  );
};
