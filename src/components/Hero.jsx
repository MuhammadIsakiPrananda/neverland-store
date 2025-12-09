import React, { useState, useRef } from 'react';
import { TrendingUp, Zap, ArrowRight, Play, Shield, Clock, Award, Twitter, Instagram, Youtube, Twitch } from 'lucide-react';
 
// Komponen Floating Particles dengan animasi lebih smooth
const FloatingParticle = ({ delay, duration, size, position }) => (
  <div
    className="absolute rounded-full bg-gradient-to-r from-primary-400/30 to-accent-purple/30 blur-md animate-float"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
      left: position.x,
      top: position.y,
    }}
  />
);

// --- Sub-komponen untuk Kerapian ---

const PremiumBadge = () => (
  <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 animate-fade-in-down">
    <Award className="w-5 h-5 text-accent-gold" />
    <span className="text-sm font-semibold text-slate-200">Trusted by 2M+ Gamers Worldwide</span>
  </div>
);

const FeaturePill = ({ icon, text, color }) => (
  <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2.5 rounded-lg border border-white/10 hover:border-white/20 transition-all hover:scale-105 cursor-pointer group">
    <div className={`bg-gradient-to-r ${color} p-1.5 rounded-md text-white`}>
      {icon}
    </div>
    <span className="text-sm font-medium text-white">{text}</span>
  </div>
);

const socialLinks = [
  { icon: <Twitter size={20} />, href: '#', name: 'Twitter' },
  { icon: <Instagram size={20} />, href: '#', name: 'Instagram' },
  { icon: <Youtube size={20} />, href: '#', name: 'Youtube' },
  { icon: <Twitch size={20} />, href: '#', name: 'Twitch' },
];

const SocialMediaLinks = () => (
  <div className="flex items-center justify-center lg:justify-start gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
    <span className="text-sm font-semibold text-slate-400">Follow us on:</span>
    <div className="flex items-center gap-4">
      {socialLinks.map((link) => (
        <a 
          key={link.name}
          href={link.href}
          aria-label={`Follow us on ${link.name}`}
          className="text-slate-400 hover:text-white hover:scale-110 transition-all"
        >
          {link.icon}
        </a>
      ))}
    </div>
  </div>
);

const Hero = () => {
  const [imageStyle, setImageStyle] = useState({});
  const [glowStyle, setGlowStyle] = useState({});
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate subtle pan and scale effect
    const panX = (x / rect.width - 0.5) * -15; // Reduced movement for subtlety
    const panY = (y / rect.height - 0.5) * -15;

    setImageStyle({
      transform: `scale(1.05) translateX(${panX}px) translateY(${panY}px)`,
      transition: 'transform 0.1s ease-out',
    });

    // Calculate glow effect
    setGlowStyle({
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.1), transparent 35%)`,
      opacity: 1,
      transition: 'opacity 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setImageStyle({
      transform: 'scale(1) translateX(0) translateY(0)',
      transition: 'transform 0.5s ease-in-out',
    });
    setGlowStyle({ opacity: 0, transition: 'opacity 0.5s ease-in-out' });
  };

  return (
    <div className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
        <FloatingParticle delay={0} duration={15} size={60} position={{ top: '10%', left: '5%' }} />
        <FloatingParticle delay={1} duration={20} size={80} position={{ top: '50%', left: '20%' }} />
        <FloatingParticle delay={2} duration={18} size={40} position={{ top: '20%', left: '80%' }} />
        <FloatingParticle delay={3} duration={22} size={70} position={{ top: '80%', left: '60%' }} />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-silver/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Content */}
          <div className="text-center lg:text-left">
            <div className="max-w-xl mx-auto lg:mx-0 space-y-8">
              {/* Premium Badge */}
              <PremiumBadge />

              {/* Main Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tighter animate-fade-in-up">
                <span className="bg-gradient-to-r from-accent-gold via-accent-silver to-accent-gold bg-clip-text text-transparent">
                  Level Up Your <br /> Gaming
                </span>{' '}
                <span className="text-white">Experience</span>
              </h1>

              {/* Subheading */}
              <p className="text-lg text-slate-300 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Get instant top-ups for your favorite games. Enjoy fast delivery, unbeatable prices, and dedicated 24/7 support.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <FeaturePill icon={<Zap size={16} />} text="Instant Delivery" color="from-yellow-500 to-orange-500" />
                <FeaturePill icon={<Shield size={16} />} text="100% Secure" color="from-green-500 to-emerald-500" />
                <FeaturePill icon={<Clock size={16} />} text="24/7 Support" color="from-blue-500 to-cyan-500" />
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <a href="#games" className="group bg-accent-gold hover:bg-accent-gold/90 px-8 py-4 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-accent-gold/20 hover:shadow-accent-gold/40">
                  <span className="flex items-center justify-center gap-2 text-dark-950">
                    <Play size={20} fill="currentColor" />
                    <span>Browse Games</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <a 
                  href="#features" 
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-md hover:bg-white/10 rounded-lg font-bold transition-all hover:scale-105 border border-white/10 hover:border-white/20 text-white"
                >
                  <span>How It Works</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Social Proof */}
              <SocialMediaLinks />
            </div>
          </div>

          {/* Right Column: Image */}
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative group animate-fade-in-up lg:mt-0 mt-16" 
            style={{ animationDelay: '0.4s' }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-accent-purple/20">
              <img 
                  src="/src/assets/Neverland Games Store.png"
                  alt="Neverland Games Store Showcase"
                  style={imageStyle}
                  className="w-full max-w-lg lg:max-w-none transition-transform duration-500 cursor-pointer"
              />
              {/* Interactive Glow Effect */}
              <div className="absolute inset-0 pointer-events-none" style={glowStyle} />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-accent-purple/20 to-transparent rounded-full blur-xl -z-10"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-accent-gold/10 to-transparent rounded-full blur-xl -z-10"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <span className="text-xs font-medium">Scroll to explore</span>
          <div className="w-6 h-9 border-2 border-white/20 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-accent-gold rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;