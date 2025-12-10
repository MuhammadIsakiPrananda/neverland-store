import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import NotificationPopover from './NotificationPopover';
import { categories } from '../data/appData';

// Komponen ini mengasumsikan Anda menggunakan Tailwind CSS untuk styling.

export default function Navbar({ onCategoryChange }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  return (
    <>
      {/* Notification button & popover khusus mobile */}
      <div className="fixed bottom-24 right-4 z-[60] md:hidden flex flex-col items-end">
        <button
          onClick={() => setShowNotifications((v) => !v)}
          aria-label={`Notifications (${notifications} new)`}
          className="relative p-3 rounded-full bg-white/20 shadow-lg shadow-black/10 hover:bg-accent-gold/20 transition-all"
        >
          <Bell className="w-6 h-6 text-slate-200" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-accent-gold rounded-full text-[11px] flex items-center justify-center text-dark-950 font-bold animate-pulse">
              {notifications}
            </span>
          )}
        </button>
        <NotificationPopover isOpen={showNotifications} onClose={() => setShowNotifications(false)} setNotificationCount={setNotifications} />
      </div>

      <nav className="bg-white/10 backdrop-blur-xl sticky top-2 z-50 mx-auto w-full max-w-4xl rounded-full border border-white/20 shadow-lg shadow-black/10 my-2 px-2 outline outline-2 outline-indigo-400/60 md:outline-none">
        <div className="flex items-center overflow-x-auto scrollbar-hide space-x-1 p-2 sm:space-x-2 sm:p-2 md:space-x-3 md:p-3 snap-x snap-mandatory">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`
                flex flex-col sm:flex-row items-center justify-center space-y-0 sm:space-y-0 sm:space-x-2 px-3 py-3 sm:px-4 md:px-5 rounded-full text-base font-semibold transition-all duration-200 ease-in-out whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-400/60 active:scale-95 snap-center min-w-[48px] min-h-[48px] shadow-sm
                ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg scale-105 border border-indigo-400/40'
                    : 'text-gray-200 hover:bg-white/10 hover:text-indigo-200 border border-transparent'
                }
              `}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {React.cloneElement(category.icon, { className: 'w-6 h-6 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-200' })}
              <span className="hidden sm:inline text-xs sm:text-sm md:text-base font-medium transition-all duration-200">{category.name}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}