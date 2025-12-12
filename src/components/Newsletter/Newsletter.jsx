import React, { useState } from 'react';
import { Send, Mail, CheckCircle, Gift, Sparkles } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-950">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/20 via-indigo-900/20 to-slate-900/20" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-sky-500/10 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-sky-600/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl shadow-sky-900/10">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sky-500/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-500/5 to-transparent rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* Icon */}
            <div className="inline-flex items-center justify-center mb-6 animate-bounce-slow">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full blur-xl animate-pulse" />
                <div className="relative bg-gradient-to-r from-sky-500 to-indigo-500 p-4 rounded-2xl">
                  <Mail className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-sky-200">Subscribe to Our Newsletter</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Get exclusive deals, special promotions, and be the first to know about new games and features!
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center space-x-2 bg-slate-800/50 border border-slate-700/50 px-4 py-2 rounded-full">
                <Gift className="w-5 h-5 text-sky-400" />
                <span className="text-sm text-slate-300">Exclusive Discounts</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-800/50 border border-slate-700/50 px-4 py-2 rounded-full">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <span className="text-sm text-slate-300">Early Access</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-800/50 border border-slate-700/50 px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm text-slate-300">Weekly Updates</span>
              </div>
            </div>

            {/* Subscribe Form */}
            {!isSubscribed ? (
              <form
                onSubmit={handleSubscribe}
                className="max-w-md mx-auto animate-fade-in-up"
                style={{ animationDelay: '0.3s' }}
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 rounded-xl px-6 py-4 font-semibold transition-all whitespace-nowrap flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                </p>
              </form>
            ) : (
              <div className="max-w-md mx-auto animate-fade-in-up">
                <div className="flex items-center justify-center space-x-3 bg-slate-800/50 border border-green-500/30 px-6 py-4 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-400 animate-bounce" />
                  <p className="text-green-400 font-semibold">
                    Successfully subscribed! Check your inbox for confirmation.
                  </p>
                </div>
              </div>
            )}

            {/* Social Proof */}
            <div className="mt-8 flex items-center justify-center space-x-2 text-sm text-slate-400 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex -space-x-2">
                {['👨', '👩', '👨‍💼', '👩‍🦰', '👨‍🎓'].map((avatar) => (
                  <div
                    key={avatar}
                    className="w-8 h-8 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-full flex items-center justify-center border-2 border-slate-800"
                  >
                    {avatar}
                  </div>
                ))}
              </div>
              <span>Join 50,000+ subscribers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
