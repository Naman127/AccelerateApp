import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-slate-800';
  const icon = type === 'success' ? <CheckCircle2 size={18} /> : type === 'error' ? <AlertTriangle size={18} /> : <Info size={18} />;

  return (
    <div className={`fixed bottom-20 md:bottom-6 right-6 z-50 ${bgColor} text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-slide-up-fade backdrop-blur-md bg-opacity-90`}>
      {icon}
      <span className="text-sm font-medium font-body">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X size={14} /></button>
    </div>
  );
};