import React from 'react';
import { createPortal } from 'react-dom';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import useScrollLock from './useScrollLock';

const CartModal = ({ isOpen, onClose }) => {
  useScrollLock(isOpen);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
    >
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-br from-dark-900 to-dark-950 rounded-3xl border border-white/10 shadow-2xl animate-scale-in custom-scrollbar z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/5 rounded-full blur-3xl" />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 group"
        >
          <X className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
        </button>

        <div className="relative p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-purple/20 to-accent-purple/5 border border-accent-purple/20 mb-4">
              <ShoppingBag className="w-8 h-8 text-accent-purple" />
            </div>
            <h2 id="cart-modal-title" className="text-2xl font-bold text-white mb-2">
              Shopping Cart
            </h2>
            <p className="text-sm text-slate-400">
              Your selected items will appear here.
            </p>
          </div>

          {/* Cart Content */}
          <div className="text-center py-10 border-y border-white/10">
            <p className="text-slate-500">Your cart is currently empty.</p>
          </div>

          {/* Cart Footer */}
          <div className="mt-6 pt-6">
            <button
              disabled
              className="w-full relative group px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 bg-accent-gold text-dark-950 overflow-hidden shadow-lg shadow-accent-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative flex items-center justify-center gap-2">
                Proceed to Checkout <ArrowRight size={16} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  , document.body);
};

export default CartModal;