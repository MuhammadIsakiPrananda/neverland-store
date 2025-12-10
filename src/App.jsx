import React, { useState } from 'react';

// Import komponen modular
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import GameList from './components/GameList';
import GameModal from './components/GameModal';
import Testimonials from './components/Testimonials';
import CartModal from './components/CartModal';
import FAQ from './components/FAQ';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ToastNotification from './components/ToastNotification';

// Import data dan utils
import { games, categories, features, paymentMethods, testimonials, faqs } from './data/appData.jsx';
import { formatPrice } from './utils/formatters';

const App = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Filter games based on search query
  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-dark-950 text-white overflow-x-hidden">
      {/* Header */}
      <Header 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        onCartClick={() => setIsCartOpen(true)}
        showToast={showToast}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home">
          <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </section>

        {/* Features Section */}
        <section id="features">
          <Features features={features} />
        </section>

        {/* Games List Section */}
        <section id="games">
          <GameList 
            games={filteredGames} 
            onGameSelect={setSelectedGame}
            categories={categories}
          />
        </section>

        {/* Testimonials Section */}
        <Testimonials testimonials={testimonials} />

        {/* FAQ Section */}
        <section id="faq">
          <FAQ faqs={faqs} />
        </section>

        {/* Newsletter Section */}
        <section id="contact">
          <Newsletter />
        </section>
      </main>

      {/* Game Modal */}
      <GameModal 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)}
        paymentMethods={paymentMethods}
        formatPrice={formatPrice}
      />

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Footer */}
      <Footer />

      {/* Toast Notification */}
      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default App;