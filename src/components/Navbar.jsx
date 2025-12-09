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
    <nav className="bg-gray-900/50 backdrop-blur-sm sticky top-4 z-50 mx-auto max-w-fit rounded-full border border-white/10 my-4">
      <div className="flex items-center space-x-1 p-1.5">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ease-in-out
              ${
                activeCategory === category.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }
            `}
          >
            {React.cloneElement(category.icon, { className: 'w-4 h-4' })}
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}