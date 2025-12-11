import React from 'react';
import { Zap, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowRight, Heart, Shield, Award } from 'lucide-react';
import LogoBCA from '../../assets/Logo BCA.webp';
import LogoBRI from '../../assets/Logo BRI.webp';
import LogoDANA from '../../assets/Logo DANA.webp';
import LogoOVO from '../../assets/Logo OVO.webp';
import LogoMandiri from '../../assets/Logo Mandiri.webp';
import LogoGopay from '../../assets/Logo Gopay.webp';


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative bg-dark-900/50 border-t border-white/10 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl bottom-0 left-0 animate-pulse-slow" />
        <div className="absolute w-96 h-96 bg-accent-silver/10 rounded-full blur-3xl top-0 right-0 animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4 group cursor-pointer">
              <div className="bg-accent-gold/20 p-2 rounded-lg">
                <Zap className="w-6 h-6 text-accent-gold" />
              </div>
              <div>
                <span className="text-xl font-bold text-white block">Neverland Store</span>
                <span className="text-xs text-slate-500">Your Gaming Paradise</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Your trusted partner for instant game top-ups. Fast, secure, and reliable service for gamers worldwide.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-xs text-slate-300">Secure</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-slate-300">Trusted</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                <Zap className="w-4 h-4 text-accent-gold" />
                <span className="text-xs text-slate-300">Instant</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-accent-gold rounded-full" />
              <span>Quick Links</span>
            </h4>
            <div className="space-y-3">
              {['Home', 'Browse Games', 'Features', 'Testimonials', 'FAQ', 'About Us'].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  className="flex items-center gap-2 text-slate-400 hover:text-accent-gold transition-colors text-sm group"
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>{link}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-accent-gold rounded-full" />
              <span>Support</span>
            </h4>
            <div className="space-y-3">
              {[
                'Help Center',
                'How to Top Up',
                'Payment Methods',
                'Terms of Service',
                'Privacy Policy',
                'Refund Policy'
              ].map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center gap-2 text-slate-400 hover:text-accent-gold transition-colors text-sm group"
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>{link}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white flex items-center space-x-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-accent-purple rounded-full" />
              <span>Contact Us</span>
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-sm">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-300 font-medium">Email</p>
                  <a href="mailto:support@neverlandstore.com" className="text-slate-400 hover:text-primary-400 transition-colors">
                    support@neverlandstore.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-300 font-medium">WhatsApp</p>
                  <a href="https://wa.me/6281234567890" className="text-slate-400 hover:text-green-400 transition-colors">
                    +62 812-3456-7890
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-accent-purple flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-300 font-medium">Location</p>
                  <p className="text-slate-400">Jakarta, Indonesia</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="glass-card p-3 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Customer Service</p>
                <p className="text-sm font-semibold text-green-400">24/7 Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Payment Methods */}
        <div className="border-t border-slate-800/50 pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Media */}
            <div>
              <p className="text-sm text-slate-400 mb-3 text-center md:text-left">Follow Us</p>
              <div className="flex items-center space-x-3">
                {[
                  { icon: Facebook, color: 'hover:bg-blue-600', link: '#' },
                  { icon: Instagram, color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600', link: '#' },
                  { icon: Twitter, color: 'hover:bg-sky-600', link: '#' },
                  { icon: Youtube, color: 'hover:bg-red-600', link: '#' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 glass-card flex items-center justify-center rounded-lg transition-all hover:scale-110 ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <p className="text-sm text-slate-400 mb-3 text-center md:text-right">We Accept</p>
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
                {/* Payment method with icon */}
                {/* GoPay */}
                <div className="glass-card px-3 py-2 rounded-lg text-xs font-medium text-slate-300 flex items-center gap-2">
                  <img src={LogoGopay} alt="Logo GoPay" className="w-8 h-8 object-contain bg-white rounded p-0.5" />
                  <span>GoPay</span>
                </div>
                {/* OVO */}
                <div className="glass-card px-3 py-2 rounded-lg text-xs font-medium text-slate-300 flex items-center gap-2">
                  <img src={LogoOVO} alt="Logo OVO" className="w-8 h-8 object-contain bg-white rounded p-0.5" />
                  <span>OVO</span>
                </div>
                {/* DANA */}
                <div className="glass-card px-3 py-2 rounded-lg text-xs font-medium text-slate-300 flex items-center gap-2">
                  <img src={LogoDANA} alt="Logo DANA" className="w-8 h-8 object-contain bg-white rounded p-0.5" />
                  <span>DANA</span>
                </div>
                {/* BCA */}
                <div className="glass-card px-3 py-2 rounded-lg text-xs font-medium text-slate-300 flex items-center gap-2">
                  <img src={LogoBCA} alt="Logo BCA" className="w-8 h-8 object-contain bg-white rounded p-0.5" />
                  <span>BCA</span>
                </div>
                {/* BRI */}
                <div className="glass-card px-3 py-2 rounded-lg text-xs font-medium text-slate-300 flex items-center gap-2">
                  <img src={LogoBRI} alt="Logo BRI" className="w-8 h-8 object-contain bg-white rounded p-0.5" />
                  <span>BRI</span>
                </div>
                {/* Mandiri */}
                <div className="glass-card px-3 py-2 rounded-lg text-xs font-medium text-slate-300 flex items-center gap-2">
                  <img src={LogoMandiri} alt="Logo Mandiri" className="w-8 h-8 object-contain bg-white rounded p-0.5" />
                  <span>Mandiri</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-slate-400 text-center md:text-left">
              &copy; {currentYear} Neverland Store. All rights reserved.
            </p>
            <p className="text-slate-400 flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              <span>for gamers by</span>
              <span className="text-primary-400 font-semibold">Muhammad Isaki Prananda</span>
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
    </footer>
  );
};

export default Footer;