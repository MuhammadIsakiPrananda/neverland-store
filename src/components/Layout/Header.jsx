import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ShoppingBag, User, Bell, Sparkles, Gift, Home, Gamepad2, Layers, HelpCircle, Mail } from 'lucide-react';
import logoImage from '../../assets/Neverland Games Store.png';
import AuthModal from '../Auth/AuthModal';
import NotificationPopover from './NotificationPopover';
// SpecialOfferModal is now handled globally in App.jsx

const Header = (props) => {
  const { menuOpen, setMenuOpen, onCartClick, showToast, cartItemCount = 0, onSpecialOfferClick } = props;
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const [notifications, setNotifications] = useState(3);
  const [activeMenu, setActiveMenu] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationButtonRef = useRef(null);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });
  // Listen to login/logout changes
  useEffect(() => {
    const syncUser = () => {
      try {
        setUser(JSON.parse(localStorage.getItem('user')));
      } catch {
        setUser(null);
      }
    };
    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    if (showToast) showToast('Berhasil logout', 'success');
  };

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
        ? 'bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl' 
        : 'bg-slate-950/90 backdrop-blur-md'
    }`}>
      {/* Top Bar - Promo Banner */}
      <div className="relative bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-600/95 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
        }} />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shine_3s_ease-in-out_infinite]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-9 text-sm font-semibold text-white relative">
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
              <div className="absolute inset-0 bg-sky-500/30 rounded-full blur-lg group-hover:blur-xl transition-all" />
              <img 
                src={logoImage} 
                alt="Neverland Games Store" 
                className="relative w-10 h-10 object-cover rounded-full ring-2 ring-sky-500/50 group-hover:ring-sky-500 transition-all"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">
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
                      ? 'text-white bg-slate-800/50' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }
                  `}
                >
                  <item.icon className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-sky-400' : ''
                  }`} />
                  <span>{item.label}</span>
                  
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-sky-500 rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1">
              {/* Promo */}
              <button 
                aria-label="Special Offers" 
                className="relative p-2 rounded-lg hover:bg-slate-800/50 transition-all group"
                onClick={onSpecialOfferClick}
              >
                <Gift className="w-5 h-5 text-slate-400 group-hover:text-sky-400 transition-colors" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
              </button>
              
              {/* Cart & Notifications */}
              <div className="flex items-center gap-2">
                <button onClick={onCartClick} aria-label={`Shopping Cart (${cartItemCount} items)`} className="relative p-2 rounded-lg hover:bg-slate-800/50 transition-all group">
                  <ShoppingBag className="w-5 h-5 text-slate-400 group-hover:text-sky-400 transition-colors" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-sky-500 rounded-full text-[9px] flex items-center justify-center text-white font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </button>
                <div className="relative">
                  <button ref={notificationButtonRef} onClick={() => setShowNotifications(!showNotifications)} aria-label={`Notifications (${notifications} new)`} className="relative p-2 rounded-lg hover:bg-slate-800/50 transition-all group">
                    <Bell className="w-5 h-5 text-slate-400 group-hover:text-sky-400 transition-colors" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-sky-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold animate-pulse">
                        {notifications}
                      </span>
                    )}
                  </button>
                  <NotificationPopover isOpen={showNotifications} onClose={() => setShowNotifications(false)} triggerRef={notificationButtonRef} />
                </div>
              </div>
            </div>

            <div className="w-px h-6 bg-slate-700/50" />
            {/* Profile Dropdown jika login, else tombol Sign In/Get Started */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 text-white transition-all" tabIndex={0}>
                  <User className="w-4 h-4" />
                  <span>{user.name || user.email}</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-700/50 rounded-xl shadow-lg py-2 z-50 hidden group-focus-within:block group-hover:block">
                  <div className="px-4 py-2 text-xs text-slate-400">{user.email}</div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-800/50">Logout</button>
                </div>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => {
                    setAuthMode('signin');
                    setShowAuthModal(true);
                  }}
                  className="px-4 py-2 rounded-lg font-medium text-sm transition-all bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 text-white"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Sign In</span>
                  </span>
                </button>
                <button 
                  onClick={() => {
                    setAuthMode('signup');
                    setShowAuthModal(true);
                  }}
                  className="relative group px-5 py-2 rounded-lg font-semibold text-sm transition-all bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Cart */}
            <button onClick={onCartClick} aria-label={`Shopping Cart (${cartItemCount} items)`} className="relative p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-all">
              <ShoppingBag className="w-5 h-5 text-slate-400" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-sky-500 rounded-full text-[9px] flex items-center justify-center text-white font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Notifications */}
            <button
              onClick={() => setShowNotifications((v) => !v)}
              aria-label={`Notifications (${notifications} new)`}
              className="relative p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-all"
            >
              <Bell className="w-5 h-5 text-slate-400" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-sky-500 rounded-full text-[9px] flex items-center justify-center text-white font-bold animate-pulse">
                  {notifications}
                </span>
              )}
            </button>
            
            {/* Hamburger */}
            <button 
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-all"
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
        <div id="mobile-menu" className="lg:hidden bg-slate-900/98 backdrop-blur-xl border-t border-slate-700/50">
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
                      ? 'bg-slate-800/50 text-white'
                      : 'bg-slate-800/30 text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 ${
                      isActive ? 'text-sky-400' : 'text-slate-500'
                    }`} />
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-sm">{item.label}</span>
                      <span className="text-xs text-slate-500">{item.description}</span>
                    </div>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-sky-500" />
                  )}
                </a>
              );
            })}
            
            {/* Actions */}
            <div className="pt-4 mt-4 border-t border-slate-700/50 space-y-2">
              {/* Promo */}
              <button 
                className="w-full flex items-center justify-between px-4 py-3 bg-sky-500/10 hover:bg-sky-500/20 rounded-lg transition-all"
                onClick={onSpecialOfferClick}
              >
                <div className="flex items-center gap-3">
                  <Gift className="w-5 h-5 text-sky-400" />
                  <span className="text-sm font-medium text-white">Special Offers</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              </button>

              {/* Login */}
              <button 
                onClick={() => {
                  setAuthMode('signin');
                  setShowAuthModal(true);
                  setMenuOpen(false);
                }}
                className="w-full px-6 py-3 rounded-lg font-semibold transition-all bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20"
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

      {/* SpecialOfferModal is now rendered globally in App.jsx */}
    </nav>
  );
};

export default Header;