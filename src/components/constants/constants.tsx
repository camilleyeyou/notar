import React from 'react';
import type { PricingPlan } from '../types/types';

export const EyeIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

export const CalendarIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

export const CreditCardIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);

export const HUMAN_11_MARKERS = [
  { name: 'Hesitation', description: 'The natural pauses of a mind at work.' },
  { name: 'Revision', description: 'Crafting and re-crafting; the hallmark of care.' },
  { name: 'Emotional Tone Shift', description: 'The authentic flow of changing feelings.' },
  { name: 'Overexplaining', description: 'The earnest desire to be truly understood.' },
  { name: 'Sudden Confidence', description: 'A breakthrough moment, captured in text.' },
  { name: 'Tangents', description: 'The beautiful detours of a creative intellect.' },
  { name: 'Metaphor Drift', description: 'Where one idea blossoms into another.' },
  { name: 'Ambiguity', description: 'The subtle nuances that defy simple definition.' },
  { name: 'Typographical Errors', description: 'The charming imperfections of human hands.' },
  { name: 'Pacing Variation', description: 'The rhythm of thought, with its sprints and rests.' },
  { name: 'Colloquialisms', description: 'The unique flavor of a personal voice.' },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    title: 'Single Credit',
    price: '$99',
    description: 'For that one important document.',
    features: ['1 Human-Authorship Certification'],
  },
  {
    title: '3-Pack',
    price: '$269',
    description: 'For a few key applications or letters.',
    features: ['3 Human-Authorship Certifications', 'Save 10%'],
    isFeatured: true,
  },
  {
    title: 'Enterprise',
    price: 'Contact Us',
    description: 'For hiring platforms & educational institutions.',
    features: ['API Integration', 'Admin Dashboard', 'Volume Discounts'],
  },
];

export const COURSE_PRICE = '$89';