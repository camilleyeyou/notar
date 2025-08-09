import React, { useState } from 'react';
import type { TimeSlot } from './types/types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { CalendarIcon } from './constants/constants';

interface BookingViewProps {
  onSlotSelect: (slot: TimeSlot) => void;
  onBack: () => void;
}

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

export const BookingView: React.FC<BookingViewProps> = ({ onSlotSelect, onBack }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const changeMonth = (amount: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0,0,0,0);

    const blanks = Array(firstDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div className="grid grid-cols-7 gap-2 text-center">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="font-bold text-gray-400">{d}</div>)}
        {blanks.map((_, i) => <div key={`blank-${i}`} />)}
        {days.map(day => {
          const date = new Date(year, month, day);
          const isPast = date < today;
          const isSelected = selectedDate?.getTime() === date.getTime();
          
          let classes = 'w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200';
          if (isPast) {
            classes += ' text-gray-600 cursor-not-allowed';
          } else {
            classes += ' cursor-pointer';
            if(isSelected) {
                classes += ' bg-brand-accent text-brand-dark font-bold';
            } else if (date.getTime() === today.getTime()){
                 classes += ' border-2 border-brand-accent text-brand-accent';
            } else {
                classes += ' hover:bg-brand-slate';
            }
          }

          return (
            <div key={day} className={classes} onClick={() => !isPast && setSelectedDate(date)}>
              {day}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif text-white flex items-center justify-center space-x-3">
          <CalendarIcon className="w-10 h-10 text-brand-accent" />
          <span>Book a Notary Session</span>
        </h1>
        <p className="text-gray-400 mt-2">Select a date and time for your live authorship session.</p>
      </div>
      <Card>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <Button onClick={() => changeMonth(-1)} variant="secondary">&lt;</Button>
              <h3 className="text-xl font-serif text-white">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h3>
              <Button onClick={() => changeMonth(1)} variant="secondary">&gt;</Button>
            </div>
            {renderCalendar()}
          </div>
          <div>
            <h3 className="text-xl font-serif text-white mb-4">
              Available Times for {selectedDate?.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h3>
            {selectedDate ? (
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(time => {
                   const isSelected = selectedTime === time;
                   return (
                     <button
                       key={time}
                       onClick={() => setSelectedTime(time)}
                       className={`p-2 rounded-md text-center transition-colors duration-200 ${
                         isSelected
                           ? 'bg-brand-accent text-brand-dark font-bold'
                           : 'bg-brand-slate hover:bg-gray-600'
                       }`}
                     >
                       {time}
                     </button>
                   );
                })}
              </div>
            ) : (
              <p className="text-gray-400">Please select a date to see available times.</p>
            )}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700 flex justify-between items-center">
            <Button onClick={onBack} variant="secondary">Cancel</Button>
            <Button 
                onClick={() => onSlotSelect({date: selectedDate!, time: selectedTime!})}
                disabled={!selectedDate || !selectedTime}
            >
                Confirm & Proceed to Payment
            </Button>
        </div>
      </Card>
    </div>
  );
};
