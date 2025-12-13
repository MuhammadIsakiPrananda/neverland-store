import React, { useRef, useEffect } from 'react';
import { Shield } from 'lucide-react';

const NotificationPopover = ({ isOpen, onClose, triggerRef }) => {
  const popoverRef = useRef(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current && !popoverRef.current.contains(event.target) &&
        triggerRef.current && !triggerRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return ( 
    <div ref={popoverRef} className="absolute top-full right-0 mt-3 w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl shadow-sky-900/20 animate-fade-in-down z-50">
      <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
        <h3 className="font-bold text-white">Notifications</h3>
      </div>
      <div className="max-h-80 overflow-y-auto custom-scrollbar">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-slate-800/50 border border-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-slate-500" />
          </div>
          <p className="text-sm text-slate-400">Tidak ada notifikasi</p> 
          <p className="text-xs text-slate-500 mt-1">Semua notifikasi akan muncul di sini</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopover;