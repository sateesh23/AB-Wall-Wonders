import React, { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessMessageProps {
  message: string;
  show: boolean;
  onClose: () => void;
  duration?: number;
}

export function SuccessMessage({ message, show, onClose, duration = 3000 }: SuccessMessageProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 max-w-md">
        <CheckCircle className="w-5 h-5 flex-shrink-0" />
        <p className="font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-auto hover:bg-green-700 rounded p-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
