import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone } from 'lucide-react';

// Tidak perlu custom WhatsAppIcon, gunakan Lucide Whatsapp

const FloatingActionButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Tampilkan tombol setelah scroll lebih dari 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleLiveChatClick = () => {
    alert('Fitur Live Chat akan segera hadir!');
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      {/* Tombol Live Chat */}
      <button
        onClick={handleLiveChatClick}
        aria-label="Live Chat"
        className="group flex items-center w-14 hover:w-48 h-14 px-4 bg-gradient-to-r from-primary-500 to-accent-purple rounded-full shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
      >
        <MessageSquare className="w-6 h-6 text-white flex-shrink-0" />
        <span className="text-white font-semibold text-sm max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs group-hover:ml-2 ml-0">
          Live Chat
        </span>
      </button>

      {/* Tombol WhatsApp */}
      <a
        href="https://wa.me/628995257735"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex items-center w-14 hover:w-48 h-14 px-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
      >
        <Phone className="w-6 h-6 text-white flex-shrink-0" />
        <span className="text-white font-semibold text-sm max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs group-hover:ml-2 ml-0">
          WhatsApp
        </span>
      </a>
    </div>
  );
};

export default FloatingActionButtons;