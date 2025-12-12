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
    <nav className="bg-slate-900/80 backdrop-blur-xl sticky top-2 z-50 mx-auto w-full max-w-4xl rounded-full border border-slate-700/50 shadow-lg shadow-sky-900/20 my-2 px-2 outline outline-2 outline-sky-500/30 md:outline-none">
      <div className="flex items-center overflow-x-auto scrollbar-hide space-x-1 p-2 sm:space-x-2 sm:p-2 md:space-x-3 md:p-3 snap-x snap-mandatory">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`
              flex flex-col sm:flex-row items-center justify-center space-y-0 sm:space-y-0 sm:space-x-2 px-3 py-3 sm:px-4 md:px-5 rounded-full text-base font-semibold transition-all duration-200 ease-in-out whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-sky-500/50 active:scale-95 snap-center min-w-[48px] min-h-[48px] shadow-sm
              ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg scale-105 border border-sky-500/50'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-sky-400 border border-transparent'
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