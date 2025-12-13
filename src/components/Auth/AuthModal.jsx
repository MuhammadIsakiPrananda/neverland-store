  // Password strength requirements
  const passwordRequirements = [
    {
      label: 'At least 8 characters',
      test: (pw) => pw.length >= 8,
    },
    {
      label: 'Uppercase letter',
      test: (pw) => /[A-Z]/.test(pw),
    },
    {
      label: 'Lowercase letter',
      test: (pw) => /[a-z]/.test(pw),
    },
    {
      label: 'Number',
      test: (pw) => /\d/.test(pw),
    },
    {
      label: 'Symbol',
      test: (pw) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pw),
    },
  ];
import React, { useState, useEffect, useRef } from 'react';
// Tambah fetch polyfill jika perlu
import { createPortal } from 'react-dom';
import { X, Mail, Lock, User, Eye, EyeOff, Github, Chrome, Facebook, Sparkles, Shield, Zap } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, initialMode = 'signin', showToast }) => {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState("");
  const [forgotError, setForgotError] = useState("");
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

  // Prevent body scroll and layout shift when modal is open.
  // This effect calculates the scrollbar width and adds padding to the body
  // and the fixed header to prevent them from shifting when the scrollbar is hidden.
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const originalBodyPaddingRight = document.body.style.paddingRight;
      const originalBodyOverflow = document.body.style.overflow;

      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      // Apply padding to the fixed header as well
      const header = document.querySelector('nav.fixed');
      if (header) header.style.paddingRight = `${scrollbarWidth}px`;

      return () => {
        // Restore body styles
        document.body.style.overflow = originalBodyOverflow;
        document.body.style.paddingRight = originalBodyPaddingRight;

        // For the header, temporarily disable transitions to prevent the "slide" effect on close.
        if (header) {
          header.style.transition = 'none';
          header.style.paddingRight = originalBodyPaddingRight;
          // Re-enable transitions on the next frame so other effects (like scroll) work again.
          requestAnimationFrame(() => {
            header.style.transition = ''; // Let the CSS class's transition take over.
          });
        }
      };
    }
  }, [isOpen]);

  // Sync mode with initialMode when modal opens
  // Also resets the entire form state for a clean slate
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrors({});
      setShowPassword(false);
      setShowConfirmPassword(false);
      setShowForgot(false);
      setForgotEmail("");
      setForgotSuccess("");
      setForgotError("");
      setForgotLoading(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    // --- SIMULATION MODE (Fix for 405 Method Not Allowed) ---
    // Menggunakan simulasi login/register agar demo tetap berjalan lancar
    // meskipun backend belum siap atau hosting statis menolak POST request.
    setTimeout(() => {
      const mockUser = {
        name: formData.name || 'Demo User',
        email: formData.email,
        token: 'mock-jwt-token-demo-123'
      };

      if (mode === 'signup') {
        if (showToast) showToast('Akun berhasil dibuat! Silakan login.', 'success');
      } else {
        localStorage.setItem('token', mockUser.token);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setTimeout(() => {
          window.dispatchEvent(new Event('user-login'));
        }, 10);
        if (showToast) showToast('Login berhasil! Selamat datang kembali.', 'success');
      }

      setIsLoading(false);
      onClose();
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
      });
    }, 1500);

    /* KODE API ASLI (Dinonaktifkan sementara untuk demo)
    if (mode === 'signup') {
      try {
        const apiBase = import.meta.env.PROD ? 'https://store.neverlandstudio.my.id' : '';
        const res = await fetch(`${apiBase}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
          })
        });
        const data = await res.json();
        if (!res.ok) {
          setErrors(prev => ({ ...prev, email: data.message || 'Registration failed' }));
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
        onClose();
        if (showToast) showToast('Akun berhasil dibuat! Silakan login.', 'success');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          agreeTerms: false
        });
      } catch (err) {
        setIsLoading(false);
        setErrors(prev => ({ ...prev, email: 'Registration failed. Try again.' }));
      }
    } else {
      try {
        const apiBase = import.meta.env.PROD ? 'https://store.neverlandstudio.my.id' : '';
        const res = await fetch(`${apiBase}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });
        const data = await res.json();
        if (!res.ok) {
          setErrors(prev => ({ ...prev, password: data.message || 'Login failed' }));
          setIsLoading(false);
          return;
        }
        // Simpan token/user ke localStorage jika perlu
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        // Trigger custom event for login (with delay to ensure localStorage is set)
        setTimeout(() => {
          window.dispatchEvent(new Event('user-login'));
        }, 10);
        setIsLoading(false);
        onClose();
        if (showToast) showToast('Login berhasil! Selamat datang kembali.', 'success');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          agreeTerms: false
        });
      } catch (err) {
        setIsLoading(false);
        setErrors(prev => ({ ...prev, password: 'Login failed. Try again.' }));
      }
    }
    */
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setErrors({});
  };

  // Handler for forgot password
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSuccess("");
    setForgotError("");
    setForgotLoading(true);
    // Simulasi request
    setTimeout(() => {
      if (!forgotEmail.trim()) {
        setForgotError("Email wajib diisi.");
      } else if (!/\S+@\S+\.\S+/.test(forgotEmail)) {
        setForgotError("Format email tidak valid.");
      } else {
        setForgotSuccess("Link reset password telah dikirim ke email Anda.");
      }
      setForgotLoading(false);
    }, 1500);
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
      <div ref={modalRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl border border-slate-700/50 shadow-2xl shadow-sky-900/20 animate-scale-in custom-scrollbar z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-700/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all duration-200 group"
        >
          <X className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
        </button>
        <div className="relative p-8">
          {showForgot ? (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500/20 to-sky-500/5 border border-sky-500/20 mb-4">
                  <Lock className="w-8 h-8 text-purple-400" />
                </div>
                  <h2 id="auth-modal-title" className="text-2xl font-bold text-white mb-2">
                    Forgot Password
                  </h2>
                  <p className="text-sm text-gray-400">
                    Enter your Neverland Store account email. We will send a password reset link to your email.
                  </p>
              </div>
              <form onSubmit={handleForgotSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      name="forgotEmail"
                      value={forgotEmail}
                      onChange={e => setForgotEmail(e.target.value)}
                      placeholder="your@email.com"
                      className={`w-full pl-10 pr-4 py-3 bg-slate-900/50 border ${forgotError ? 'border-red-500/50' : 'border-slate-700'} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:bg-slate-900 transition-all duration-200`}
                      autoFocus
                      disabled={forgotLoading} 
                    />
                  </div>
                  {forgotError && <p className="mt-1 text-xs text-red-400">{forgotError}</p>}
                  {forgotSuccess && <p className="mt-1 text-xs text-green-400">{forgotSuccess}</p>}
                </div>
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full relative group px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white overflow-hidden shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  <span className="relative flex items-center justify-center gap-2">
                    {forgotLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Zap className="w-5 h-5 text-white" />
                    )}
                    Kirim Link Reset
                  </span>
                </button>
                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="text-sm text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                    onClick={() => setShowForgot(false)}
                  >
                    Kembali ke Login
                  </button>
                  <button
                    type="button" 
                    className="text-sm text-slate-400 hover:text-sky-400 font-semibold transition-colors"
                    onClick={() => { setShowForgot(false); setMode('signup'); }}
                  >
                    Register
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              {/* ...existing code... */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500/20 to-sky-500/5 border border-sky-500/20 mb-4">
                  {mode === 'signup' ? ( 
                    <Sparkles className="w-8 h-8 text-purple-400" />
                  ) : (
                    <Shield className="w-8 h-8 text-purple-400" />
                  )}
                </div>
                <h2 id="auth-modal-title" className="text-2xl font-bold text-white mb-2">
                  {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p className="text-sm text-gray-400">
                  {mode === 'signup' 
                    ? 'Join Neverland Store and start your gaming journey' 
                    : 'Sign in to access your account and continue shopping'
                  }
                </p>
              </div>
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all duration-200 group"
                > 
                  <Chrome className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    Continue with Google
                  </span>
                </button> 
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleSocialLogin('github')}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all duration-200 group"
                  >
                    <Github className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                      Github
                    </span>
                  </button>
                  <button
                    onClick={() => handleSocialLogin('facebook')}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all duration-200 group"
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
                  <div className="w-full border-t border-slate-700" />
                </div>
                <div className="relative px-4 bg-slate-900 text-xs text-slate-500 font-medium">
                  OR CONTINUE WITH EMAIL
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full pl-10 pr-4 py-3 bg-slate-900/50 border ${errors.name ? 'border-red-500/50' : 'border-slate-700'} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:bg-slate-900 transition-all duration-200`}
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`w-full pl-10 pr-4 py-3 bg-slate-900/50 border ${errors.email ? 'border-red-500/50' : 'border-slate-700'} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:bg-slate-900 transition-all duration-200`}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-12 py-3 bg-slate-900/50 border ${errors.password ? 'border-red-500/50' : 'border-slate-700'} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:bg-slate-900 transition-all duration-200`}
                    />
                    <button
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {/* Password strength indicator */}
                  {mode === 'signup' && (
                    <ul className="mt-2 mb-1 text-xs space-y-1">
                      {passwordRequirements.map((req, idx) => {
                        const met = req.test(formData.password);
                        return (
                          <li key={idx} className={met ? 'text-green-400 flex items-center gap-1' : 'text-slate-500 flex items-center gap-1'}>
                            <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ background: met ? '#22c55e' : '#64748b' }}></span>
                            {req.label}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
                </div>
                {mode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className={`w-full pl-10 pr-12 py-3 bg-slate-900/50 border ${errors.confirmPassword ? 'border-red-500/50' : 'border-slate-700'} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:bg-slate-900 transition-all duration-200`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="mt-1 text-xs text-red-400">{errors.confirmPassword}</p>}
                  </div>
                )}
                {mode === 'signin' ? (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-700 bg-slate-900/50 text-sky-500 focus:ring-sky-500/50 focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
                    </label>
                    <button
                      type="button" 
                      className="text-sm text-sky-400 hover:text-sky-300 transition-colors font-medium"
                      onClick={() => setShowForgot(true)}
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
                        className={`mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-900/50 text-sky-500 focus:ring-sky-500/50 focus:ring-offset-0 cursor-pointer ${errors.agreeTerms ? 'border-red-500/50' : ''}`}
                      />
                      <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                        I agree to the{' '}
                        <a href="#" className="text-sky-400 hover:underline">Terms of Service</a>{' '}and{' '}
                        <a href="#" className="text-sky-400 hover:underline">Privacy Policy</a>
                      </span>
                    </label>
                    {errors.agreeTerms && <p className="mt-1 text-xs text-red-400">{errors.agreeTerms}</p>}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative group px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white overflow-hidden shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  <span className="relative flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                  {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
                  <button
                    onClick={switchMode}
                    className="text-sky-400 hover:text-sky-300 font-semibold transition-colors"
                  >
                    {mode === 'signup' ? 'Sign In' : 'Create one'}
                  </button>
                </p>
              </div>
              {mode === 'signup' && (
                <div className="mt-6 pt-6 border-t border-slate-700">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-sky-400" />
                      </div>
                      <span className="text-xs text-slate-400">Secure</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-sky-400" />
                      </div>
                      <span className="text-xs text-slate-400">Fast</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-sky-400" />
                      </div>
                      <span className="text-xs text-slate-400">Premium</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  , document.body);

};

export default AuthModal;
