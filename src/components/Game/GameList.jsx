import React, { useState, useRef, useEffect } from 'react';
import { Star, Users, TrendingUp, Sparkles, Filter, ChevronDown } from 'lucide-react';

// --- Sub-components for a cleaner structure ---

const SectionHeader = () => (
  <div className="text-center mb-12 animate-fade-in-up">
    <div className="inline-flex items-center gap-2 bg-slate-900/70 backdrop-blur-md px-4 py-2 rounded-full border border-indigo-500/30 mb-4">
      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
      <span className="text-sm font-semibold text-indigo-400">Game Store</span>
    </div>
    <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
      <span className="text-white">Browse Our</span>
      <br />
      <span className="bg-gradient-to-r from-indigo-400 via-sky-200 to-indigo-400 bg-clip-text text-transparent">
        Popular Games
      </span>
    </h2>
    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
      Choose from 10+ games and get instant top-up with the best prices.
    </p>
  </div>
);

const SortByDropdown = ({ sortBy, setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = {
    popular: 'Most Popular',
    rating: 'Highest Rated',
    trending: 'Trending',
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSelect = (option) => {
    setSortBy(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-44 px-4 py-2 bg-slate-900/70 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
      >
        <span>{sortOptions[sortBy]}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-44 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-lg shadow-2xl z-10 animate-fade-in-down overflow-hidden">
          {Object.entries(sortOptions).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                sortBy === key
                  ? 'bg-indigo-500/10 text-indigo-400 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterControls = ({ categories, selectedCategory, setSelectedCategory, sortBy, setSortBy }) => (
  <div className="relative z-20 mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
        <Filter className="w-5 h-5 text-indigo-400" />
        <span>Filter by Category</span>
      </h3>
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-400">Sort by:</span>
        <SortByDropdown sortBy={sortBy} setSortBy={setSortBy} />
      </div>
    </div>

    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.id)}
          className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2.5 border ${
            selectedCategory === category.id
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 border-transparent'
              : 'bg-slate-900/70 text-slate-300 hover:bg-slate-800 border-slate-700'
          }`}
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  </div>
);

const GameCard = ({ game, onGameSelect, index }) => (
  <div
    onClick={() => onGameSelect(game)}
    className="group relative bg-slate-900/70 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-700/50 cursor-pointer transition-all duration-300 hover:border-indigo-500/50 hover:-translate-y-2 animate-fade-in-up"
    style={{ animationDelay: `${index * 0.05}s` }}
  >
    {/* Glowing Border Effect */}
    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-500/30 transition-all duration-300" style={{ mask: 'radial-gradient(transparent, black), linear-gradient(white, white)', maskComposite: 'intersect' }} />

    {/* Image Container */}
    <div className="relative w-full h-48 overflow-hidden">
      <img 
        src={game.image} 
        alt={game.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
      
      {/* Badges */}
      <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
        {game.popular && (
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1 shadow-lg">
            <Star size={12} className="fill-current" />
            <span>POPULAR</span>
          </div>
        )}
        {game.trending && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1 shadow-lg">
            <TrendingUp size={12} />
            <span>TRENDING</span>
          </div>
        )}
      </div>
    </div>

    {/* Content */}
    <div className="p-5">
      <h3 className="text-xl font-bold text-white mb-2 truncate group-hover:text-indigo-400 transition-colors">
        {game.name}
      </h3>
      <p className="text-sm text-slate-400 mb-4 line-clamp-2 h-10">
        {game.description}
      </p>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm border-t border-slate-700/50 pt-4">
        <div className="flex items-center gap-1.5 text-yellow-400">
          <Star size={16} className="fill-current" />
          <span className="font-bold text-white">{game.rating}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Users size={16} />
          <span className="font-medium text-white">{game.players}</span>
        </div>
        <div className="px-2 py-1 bg-slate-800 rounded-md text-xs font-medium text-slate-300">
          {game.category}
        </div>
      </div>
    </div>
  </div>
);

const NoGamesFound = () => (
  <div className="text-center py-20 col-span-full animate-fade-in-up">
    <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-900/80 rounded-full mb-6 border-2 border-dashed border-slate-700">
      <Sparkles className="w-12 h-12 text-slate-600" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-2">No Games Found</h3>
    <p className="text-slate-400">
      Try adjusting your filters or search term.
    </p>
  </div>
);

const GameList = ({ games, onGameSelect, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const sortFunctions = {
    popular: (a, b) => (b.popular ? 1 : -1) - (a.popular ? 1 : -1) || (parseFloat(b.rating) - parseFloat(a.rating)),
    rating: (a, b) => parseFloat(b.rating) - parseFloat(a.rating),
    trending: (a, b) => (b.trending ? 1 : -1) - (a.trending ? 1 : -1) || (parseFloat(b.rating) - parseFloat(a.rating)),
  };

  // Filter and sort games
  let processedGames = selectedCategory === 'all' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  // Sort games
  if (sortFunctions[sortBy]) {
    processedGames = [...processedGames].sort(sortFunctions[sortBy]);
  }

  return (
    <div id="games" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-slate-950">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-96 h-96 bg-sky-900/10 rounded-full blur-3xl top-20 right-20 animate-pulse-slow" />
        <div className="absolute w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl bottom-20 left-20 animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto">
        <SectionHeader />
        
        <FilterControls 
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {processedGames.length > 0 ? (
            processedGames.map((game, index) => (
              <GameCard 
                key={game.id}
                game={game}
                onGameSelect={onGameSelect}
                index={index}
              />
            ))
          ) : (
            <NoGamesFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default GameList;