import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Mail, Lock, User, Eye, EyeOff, Github, Chrome, Facebook, Sparkles, Shield, Zap } from 'lucide-react';

import useScrollLock from './useScrollLock';

const AuthModal = ({ isOpen, onClose, initialMode = 'signin' }) => {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Prevent body scroll and layout shift when modal is open
  useScrollLock(isOpen);

  // Sync mode with initialMode when modal opens
  // Also resets the entire form state for a clean slate
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrors({});
      setShowPassword(false);
      setShowConfirmPassword(false);
      // Reset form data to ensure the modal is always fresh
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
      });
    }
  }, [isOpen, initialMode]);

  // Handle keyboard interactions (focus trapping only)
  useEffect(() => {
    if (!isOpen) return;

    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) { // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else { // Tab
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    const modalElement = modalRef.current;
    modalElement?.addEventListener('keydown', handleTabKey);
    return () => modalElement?.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (mode === 'signup' && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'signup') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'You must agree to the terms';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsLoading(false);
      onClose();
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
      });
    }, 2000);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setErrors({});
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      
      <div ref={modalRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gradient-to-br from-dark-900 to-dark-950 rounded-3xl border border-white/10 shadow-2xl animate-scale-in custom-scrollbar z-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-silver/5 rounded-full blur-3xl" />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 group"
            >
              <X className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            </button>

            <div className="relative p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 border border-accent-gold/20 mb-4">
                  {mode === 'signup' ? (
                    <Sparkles className="w-8 h-8 text-accent-gold" />
                  ) : (
                    <Shield className="w-8 h-8 text-accent-gold" />
                  )}
                </div>
                <h2 id="auth-modal-title" className="text-2xl font-bold text-white mb-2">
                  {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p className="text-sm text-slate-400">
                  {mode === 'signup' 
                    ? 'Join Neverland Store and start your gaming journey' 
                    : 'Sign in to access your account and continue shopping'
                  }
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 group"
                >
                  <Chrome className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                    Continue with Google
                  </span>
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleSocialLogin('github')}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 group"
                  >
                    <Github className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                      Github
                    </span>
                  </button>
                  
                  <button
                    onClick={() => handleSocialLogin('facebook')}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 group"
                  >
                    <Facebook className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                      Facebook
                    </span>
                  </button>
                </div>
              </div>

              <div className="relative flex items-center justify-center mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative px-4 bg-dark-900 text-xs text-slate-500 font-medium">
                  OR CONTINUE WITH EMAIL
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full pl-10 pr-4 py-3 bg-white/5 border ${
                          errors.name ? 'border-red-500/50' : 'border-white/10'
                        } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-accent-gold/50 focus:bg-white/10 transition-all duration-200`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`w-full pl-10 pr-4 py-3 bg-white/5 border ${
                        errors.email ? 'border-red-500/50' : 'border-white/10'
                      } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-accent-gold/50 focus:bg-white/10 transition-all duration-200`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-12 py-3 bg-white/5 border ${
                        errors.password ? 'border-red-500/50' : 'border-white/10'
                      } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-accent-gold/50 focus:bg-white/10 transition-all duration-200`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-400">{errors.password}</p>
                  )}
                </div>

                {mode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className={`w-full pl-10 pr-12 py-3 bg-white/5 border ${
                          errors.confirmPassword ? 'border-red-500/50' : 'border-white/10'
                        } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-accent-gold/50 focus:bg-white/10 transition-all duration-200`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-400">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}

                {mode === 'signin' ? (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-accent-gold focus:ring-accent-gold/50 focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                        Remember me
                      </span>
                    </label>
                    <button
                      type="button"
                      className="text-sm text-accent-gold hover:text-accent-gold/80 transition-colors font-medium"
                    >
                      Forgot Password?
                    </button>
                  </div>
                ) : (
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className={`mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-accent-gold focus:ring-accent-gold/50 focus:ring-offset-0 cursor-pointer ${
                          errors.agreeTerms ? 'border-red-500/50' : ''
                        }`}
                      />
                      <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                        I agree to the{' '}
                        <a href="#" className="text-accent-gold hover:underline">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-accent-gold hover:underline">
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                    {errors.agreeTerms && (
                      <p className="mt-1 text-xs text-red-400">{errors.agreeTerms}</p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative group px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 bg-accent-gold hover:bg-accent-gold/90 text-dark-950 overflow-hidden shadow-lg shadow-accent-gold/20 hover:shadow-accent-gold/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  <span className="relative flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-dark-950/30 border-t-dark-950 rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        {mode === 'signup' ? 'Create Account' : 'Sign In'}
                      </>
                    )}
                  </span>
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-400">
                  {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    onClick={switchMode}
                    className="text-accent-gold hover:text-accent-gold/80 font-semibold transition-colors"
                  >
                    {mode === 'signup' ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>

              {mode === 'signup' && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-accent-gold" />
                      </div>
                      <span className="text-xs text-slate-400">Secure</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-accent-gold" />
                      </div>
                      <span className="text-xs text-slate-400">Fast</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-accent-gold" />
                      </div>
                      <span className="text-xs text-slate-400">Premium</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
    </div>
  , document.body);
};

export default AuthModal;
