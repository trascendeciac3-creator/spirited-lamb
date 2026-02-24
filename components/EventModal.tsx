import React from 'react';
import { X, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Event } from '../types';

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose }) => {
  if (!event || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] p-10 overflow-hidden shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
          <X size={20} />
        </button>
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">{event.title}</h2>
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-gray-600">
            <Clock size={18} className="text-primary" />
            <span className="font-bold">{format(event.start, 'EEEE, MMM do p')}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <MapPin size={18} className="text-gold" />
            <span className="font-bold">{event.parishName}, {event.city}</span>
          </div>
        </div>
        <p className="text-gray-600 leading-relaxed text-lg italic">"{event.description}"</p>
      </div>
    </div>
  );
};
