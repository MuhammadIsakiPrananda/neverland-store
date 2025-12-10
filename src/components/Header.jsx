import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ShoppingBag, User, Bell, Sparkles, Gift, Home, Gamepad2, Layers, HelpCircle, Mail } from 'lucide-react';
import logoImage from '../assets/Neverland Games Store.png';
import AuthModal from './AuthModal';
import NotificationPopover from './NotificationPopover';

const Header = ({ menuOpen, setMenuOpen, onCartClick, showToast, cartItemCount = 0 }) => {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const [notifications, setNotifications] = useState(3);
  const [activeMenu, setActiveMenu] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll Spy - Update active menu based on scroll position
      // Logika ini disempurnakan agar lebih akurat dan tidak "bingung" saat scroll.
      const sections = ['home', 'features', 'games', 'faq', 'contact'];
      const scrollPosition = window.scrollY;
      
      // Offset dinamis berdasarkan tinggi header + buffer 20px.
      // Ini membuat deteksi lebih akurat, tidak peduli tinggi headernya.
      const activationOffset = headerRef.current ? headerRef.current.offsetHeight + 20 : 150;

      let newActiveMenu = '';

      // Iterasi dari section terakhir ke yang pertama.
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const section = document.getElementById(sectionId);

        if (section) {
          // Jika bagian atas section berada di atas posisi scroll kita (ditambah offset)
          if (section.offsetTop <= scrollPosition + activationOffset) {
            newActiveMenu = sectionId;
            break; // Section saat ini ditemukan, tidak perlu cek ke atas lagi.
          }
        }
      }

      // Pengecekan khusus untuk bagian paling bawah halaman untuk memastikan item terakhir terpilih.
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        newActiveMenu = sections[sections.length - 1];
      }

      setActiveMenu(newActiveMenu || 'home');
    };

    handleScroll();

    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  /**
   * Menangani klik pada item menu untuk melakukan smooth scroll ke posisi yang benar,
   * dengan memperhitungkan tinggi header yang sticky.
   * @param {React.MouseEvent} e - Event object
   * @param {string} id - ID dari elemen tujuan
   */
  const handleMenuClick = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target && headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      // Kalkulasi posisi target: posisi section dari atas - tinggi header - sedikit spasi
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition < 0 ? 0 : targetPosition,
        behavior: 'smooth'
      });

      // Tutup menu mobile jika sedang terbuka
      if (menuOpen) setMenuOpen(false);
    }
  };
  const menuItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: Home, 
      href: '#home',
      description: 'Welcome to our store'
    },
    { 
      id: 'features', 
      label: 'Features', 
      icon: Layers, 
      href: '#features',
      description: 'Our key features'
    },
    { 
      id: 'games', 
      label: 'Games', 
      icon: Gamepad2, 
      href: '#games',
      description: 'Browse all games'
    },
    { 
      id: 'faq', 
      label: 'FAQ', 
      icon: HelpCircle, 
      href: '#faq',
      description: 'Get your answers'
    },
    { 
      id: 'contact', 
      label: 'Contact', 
      icon: Mail, 
      href: '#contact',
      description: 'Reach out to us'
    }
  ];

  return (
    <nav ref={headerRef} className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-dark-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
        : 'bg-dark-950/90 backdrop-blur-md'
    }`}>
      {/* Top Bar - Promo Banner */}
      <div className="relative bg-gradient-to-r from-accent-gold via-accent-gold to-accent-gold/95 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
        }} />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shine_3s_ease-in-out_infinite]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-9 text-sm font-semibold text-dark-950 relative">
            <div className="flex items-center gap-2 px-3 py-1 bg-black/10 rounded-full">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span className="hidden sm:inline text-xs">New Year Sale:</span>
              <span className="font-bold">20% OFF</span>
              <span className="hidden sm:inline text-xs">🎉</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleMenuClick(e, 'home')} 
            className="flex items-center gap-3 group cursor-pointer flex-shrink-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-accent-gold/30 rounded-full blur-lg group-hover:blur-xl transition-all" />
              <img 
                src={logoImage} 
                alt="Neverland Games Store" 
                className="relative w-10 h-10 object-cover rounded-full ring-2 ring-accent-gold/50 group-hover:ring-accent-gold transition-all"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold text-white group-hover:text-accent-gold transition-colors">
                Neverland Store
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">Premium Gaming</span>
            </div>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = activeMenu === item.id;
              
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleMenuClick(e, item.id)}
                  className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-lg
                    font-medium text-sm transition-all duration-200
                    ${isActive 
                      ? 'text-white bg-white/10' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <item.icon className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-accent-gold' : ''
                  }`} />
                  <span>{item.label}</span>
                  
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-accent-gold rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1">
              {/* Promo */}
              <button aria-label="Special Offers" className="relative p-2 rounded-lg hover:bg-white/5 transition-all group">
                <Gift className="w-5 h-5 text-slate-400 group-hover:text-accent-gold transition-colors" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-accent-gold rounded-full animate-pulse" />
              </button>
              
              {/* Cart & Notifications */}
              <div className="flex items-center gap-2">
                <button onClick={onCartClick} aria-label={`Shopping Cart (${cartItemCount} items)`} className="relative p-2 rounded-lg hover:bg-white/5 transition-all group">
                  <ShoppingBag className="w-5 h-5 text-slate-400 group-hover:text-accent-gold transition-colors" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-accent-gold rounded-full text-[9px] flex items-center justify-center text-dark-950 font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </button>
                <div className="relative">
                  <button ref={notificationButtonRef} onClick={() => setShowNotifications(!showNotifications)} aria-label={`Notifications (${notifications} new)`} className="relative p-2 rounded-lg hover:bg-white/5 transition-all group">
                    <Bell className="w-5 h-5 text-slate-400 group-hover:text-accent-gold transition-colors" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-accent-gold rounded-full text-[10px] flex items-center justify-center text-dark-950 font-bold animate-pulse">
                        {notifications}
                      </span>
                    )}
                  </button>
                  <NotificationPopover isOpen={showNotifications} onClose={() => setShowNotifications(false)} triggerRef={notificationButtonRef} />
                </div>
              </div>
            </div>

            <div className="w-px h-6 bg-white/10" />

            {/* Login Button */}
            <button 
              onClick={() => {
                setAuthMode('signin');
                setShowAuthModal(true);
              }}
              className="px-4 py-2 rounded-lg font-medium text-sm transition-all bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white"
            >
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </span>
            </button>

            {/* Get Started Button */}
            <button 
              onClick={() => {
                setAuthMode('signup');
                setShowAuthModal(true);
              }}
              className="relative group px-5 py-2 rounded-lg font-semibold text-sm transition-all bg-accent-gold hover:bg-accent-gold/90 text-dark-950 shadow-lg shadow-accent-gold/20 hover:shadow-accent-gold/30"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Cart */}
            <button onClick={onCartClick} aria-label={`Shopping Cart (${cartItemCount} items)`} className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
              <ShoppingBag className="w-5 h-5 text-slate-400" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-accent-gold rounded-full text-[9px] flex items-center justify-center text-dark-950 font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Notifications */}
            <button
              onClick={() => setShowNotifications((v) => !v)}
              aria-label={`Notifications (${notifications} new)`}
              className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
            >
              <Bell className="w-5 h-5 text-slate-400" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-accent-gold rounded-full text-[9px] flex items-center justify-center text-dark-950 font-bold animate-pulse">
                  {notifications}
                </span>
              )}
            </button>
            
            {/* Hamburger */}
            <button 
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-slate-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div id="mobile-menu" className="lg:hidden bg-dark-900/98 backdrop-blur-xl border-t border-white/5">
          <div className="px-4 py-6 space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
            {/* Menu Items */}
            {menuItems.map((item, index) => {
              const isActive = activeMenu === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleMenuClick(e, item.id)}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-lg
                    transition-all animate-fade-in-up
                    ${isActive
                      ? 'bg-white/10 text-white'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 ${
                      isActive ? 'text-accent-gold' : 'text-slate-500'
                    }`} />
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-sm">{item.label}</span>
                      <span className="text-xs text-slate-500">{item.description}</span>
                    </div>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-accent-gold" />
                  )}
                </a>
              );
            })}
            
            {/* Actions */}
            <div className="pt-4 mt-4 border-t border-white/5 space-y-2">
              {/* Promo */}
              <button className="w-full flex items-center justify-between px-4 py-3 bg-accent-gold/10 hover:bg-accent-gold/20 rounded-lg transition-all">
                <div className="flex items-center gap-3">
                  <Gift className="w-5 h-5 text-accent-gold" />
                  <span className="text-sm font-medium text-white">Special Offers</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
              </button>

              {/* Login */}
              <button 
                onClick={() => {
                  setAuthMode('signin');
                  setShowAuthModal(true);
                  setMenuOpen(false);
                }}
                className="w-full px-6 py-3 rounded-lg font-semibold transition-all bg-accent-gold hover:bg-accent-gold/90 text-dark-950 shadow-lg shadow-accent-gold/20"
              >
                <span className="flex items-center justify-center gap-2">
                  <User className="w-5 h-5" />
                  <span>Sign In</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
        showToast={showToast}
      />
    </nav>
  );
};

export default Header;