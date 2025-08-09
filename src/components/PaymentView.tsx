import React, { useState } from 'react';
import type { TimeSlot } from './types/types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { CreditCardIcon } from './constants/constants';

interface PaymentViewProps {
  slot: TimeSlot | null;
  price: number;
  onPaymentSuccess: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export const PaymentView: React.FC<PaymentViewProps> = ({ slot, price, onPaymentSuccess, onBack, isLoading }) => {
  const [card, setCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const isFormValid = card.length === 16 && expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/) && cvc.length >= 3;

  if (!slot) return null;

  return (
    <div className="max-w-xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif text-white flex items-center justify-center space-x-3">
          <CreditCardIcon className="w-10 h-10 text-brand-accent" />
          <span>Complete Your Booking</span>
        </h1>
        <p className="text-gray-400 mt-2">This is a simulated payment for a conceptual service.</p>
      </div>

      <Card isFeatured={true}>
        <div className="mb-6 pb-6 border-b border-gray-700">
          <h2 className="text-2xl font-serif text-white">Order Summary</h2>
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-300">Notary Session on {slot.date.toLocaleDateString()} at {slot.time}</p>
            <p className="font-bold text-white text-lg">${price}.00</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-serif text-white mb-4">Payment Details</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="card" className="block text-sm font-medium text-gray-300">Card Number</label>
              <input type="text" id="card" maxLength={16} value={card} onChange={e => setCard(e.target.value.replace(/\D/g, ''))} className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-accent focus:border-brand-accent" placeholder="0000 0000 0000 0000" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-300">Expiry Date</label>
                <input type="text" id="expiry" value={expiry} onChange={e => setExpiry(e.target.value)} className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-accent focus:border-brand-accent" placeholder="MM/YY" />
              </div>
              <div>
                <label htmlFor="cvc" className="block text-sm font-medium text-gray-300">CVC</label>
                <input type="text" id="cvc" maxLength={4} value={cvc} onChange={e => setCvc(e.target.value.replace(/\D/g, ''))} className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-accent focus:border-brand-accent" placeholder="123" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 flex justify-between items-center">
            <Button onClick={onBack} variant="secondary" disabled={isLoading}>Back to Booking</Button>
            <Button 
                onClick={onPaymentSuccess}
                disabled={!isFormValid || isLoading}
                isLoading={isLoading}
            >
                Pay ${price}.00 & Confirm
            </Button>
        </div>
      </Card>
    </div>
  );
};
