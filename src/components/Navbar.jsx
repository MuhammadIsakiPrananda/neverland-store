import React, { useState } from 'react';
import { categories } from '../data/appData';

// Komponen ini mengasumsikan Anda menggunakan Tailwind CSS untuk styling.

export default function Navbar({ onCategoryChange }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  return (
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
  );
}