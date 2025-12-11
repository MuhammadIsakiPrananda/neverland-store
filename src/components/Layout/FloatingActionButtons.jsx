import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

// Ikon WhatsApp sederhana dalam format SVG
const WhatsAppIcon = (props) => (
  <svg
    viewBox="0 0 32 32"
    className="w-6 h-6"
    fill="currentColor"
    {...props}
  >
    <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.044-.53-.044-.316 0-.5-.015-.76-.015h-.234c-.27 0-.57.168-.83.431-.27.263-.87.86-1.002 2.15.015 1.44.87 2.775 1.48 3.72.98 1.52 2.57 2.98 5.02 4.49.7 1.02 1.33 1.36 1.87 1.52.54.16 1.18.14 1.73.12.58-.02 1.8-.74 2.16-1.44.37-1.1.37-1.44.26-1.59-.1-.15-.34-.24-.6-.24zm-6.46 9.26c-1.95 0-3.8-.72-5.22-2.04l-.35-.37-3.7 1 1.03-3.6-.37-.39c-1.4-1.46-2.16-3.3-2.16-5.25 0-4.5 3.6-8.2 8.1-8.2 2.2 0 4.2.87 5.7 2.42 1.5 1.55 2.4 3.5 2.4 5.78 0 4.5-3.6 8.2-8.1 8.2z" />
  </svg>
);

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
        className="group flex items-center gap-3 h-14 px-4 bg-gradient-to-r from-primary-500 to-accent-purple rounded-full shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 transform hover:-translate-y-1"
      >
        <MessageSquare className="w-6 h-6 text-white" />
        <span className="text-white font-semibold text-sm max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs group-hover:ml-1">
          Live Chat
        </span>
      </button>

      {/* Tombol WhatsApp */}
      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex items-center gap-3 h-14 px-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 transform hover:-translate-y-1"
      >
        <WhatsAppIcon />
        <span className="text-white font-semibold text-sm max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs group-hover:ml-1">
          WhatsApp
        </span>
      </a>
    </div>
  );
};

export default FloatingActionButtons;