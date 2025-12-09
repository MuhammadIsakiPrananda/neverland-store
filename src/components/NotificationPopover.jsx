import React, { useRef, useEffect } from 'react';
import { Gift, Zap, Shield, X } from 'lucide-react';

const notificationsData = [
  {
    id: 1,
    icon: <Gift className="w-5 h-5 text-accent-gold" />,
    title: 'New Year Sale!',
    description: 'Get 20% off on all game top-ups. Limited time offer!',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
    title: 'Top-up Successful',
    description: 'Your 500 Diamonds for Mobile Legends has been delivered.',
    time: '1 day ago',
    read: true,
  },
  {
    id: 3,
    icon: <Shield className="w-5 h-5 text-green-400" />,
    title: 'Security Update',
    description: 'Your account is now protected with two-factor authentication.',
    time: '3 days ago',
    read: true,
  },
];

const NotificationPopover = ({ isOpen, onClose, setNotificationCount }) => {
  const popoverRef = useRef(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        // A bit of a hack to prevent closing when the bell icon is clicked again
        if (!event.target.closest('[aria-label*="Notifications"]')) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={popoverRef} className="absolute top-full right-0 mt-3 w-80 bg-dark-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl animate-fade-in-down z-50">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <h3 className="font-bold text-white">Notifications</h3>
        <button onClick={() => setNotificationCount(0)} className="text-xs text-accent-gold hover:underline">Mark all as read</button>
      </div>
      <div className="max-h-80 overflow-y-auto custom-scrollbar">
        {notificationsData.map(notif => (
          <div key={notif.id} className={`p-4 flex gap-4 border-b border-white/5 ${!notif.read ? 'bg-accent-gold/5' : ''}`}>
            <div className="flex-shrink-0 w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
              {notif.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{notif.title}</p>
              <p className="text-xs text-slate-400 mb-1">{notif.description}</p>
              <p className="text-[10px] text-slate-500">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPopover;