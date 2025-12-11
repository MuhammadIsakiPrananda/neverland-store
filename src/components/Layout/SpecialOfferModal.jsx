import React from 'react';
import PropTypes from 'prop-types';


// Komponen modal modern untuk Special Offer
// SpecialOfferModal now supports multiple promo coupons
const SpecialOfferModal = ({ isOpen, onClose, offers = [] }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl mx-4 rounded-2xl shadow-2xl border border-white/10 bg-gradient-to-br from-dark-900/90 via-dark-800/90 to-dark-950/95 backdrop-blur-xl overflow-hidden animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-red-500/80 text-white hover:text-white transition-all shadow-lg"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Decorative Gradient Top */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-gradient-to-br from-accent-gold/40 via-accent-purple/30 to-transparent rounded-full blur-2xl opacity-70 pointer-events-none" />

        {/* Content */}
        <div className="relative flex flex-col items-center px-6 pt-10 pb-8 sm:px-10">
          {/* Icon & Title */}
          <div className="mb-2 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent-gold via-accent-purple to-accent-gold/80 shadow-lg animate-bounce-slow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7m16-2V7a2 2 0 00-2-2h-2.586a1 1 0 01-.707-.293l-1.414-1.414a1 1 0 00-.707-.293h-2.172a1 1 0 00-.707.293L8.293 4.707A1 1 0 017.586 5H5a2 2 0 00-2 2v3m16 0H4" /></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-accent-gold text-center drop-shadow mb-6 tracking-tight">
            Promo & Kupon Spesial
          </h2>
          {/* Promo List */}
          <div className="w-full max-h-[60vh] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            {offers.length === 0 && (
              <div className="col-span-2 text-center text-slate-400 py-8">Belum ada promo aktif saat ini.</div>
            )}
            {offers.map((promo, idx) => (
              <div key={idx} className="relative flex flex-col bg-gradient-to-br from-dark-800/80 via-dark-900/80 to-dark-950/90 border border-white/10 rounded-xl shadow-lg p-5 group hover:scale-[1.03] hover:shadow-2xl transition-all">
                {/* Promo Image */}
                {promo.image && (
                  <img src={promo.image} alt={promo.title} className="w-full h-28 object-cover object-center rounded-lg mb-3 border border-white/10" />
                )}
                {/* Promo Title */}
                <h3 className="text-xl font-bold text-accent-gold mb-1 group-hover:text-accent-purple transition-colors">
                  {promo.title}
                </h3>
                {/* Promo Description */}
                <p className="text-slate-200 text-sm mb-2 line-clamp-3 min-h-[48px]">{promo.description}</p>
                {/* Promo Code */}
                {promo.code && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-accent-gold/20 text-accent-gold font-mono px-3 py-1 rounded-lg text-xs tracking-wider select-all border border-accent-gold/30">
                      {promo.code}
                    </span>
                    <button
                      className="text-xs text-accent-purple hover:underline"
                      onClick={() => {navigator.clipboard.writeText(promo.code)}}
                    >
                      Salin
                    </button>
                  </div>
                )}
                {/* CTA Button */}
                {promo.cta && (
                  <a
                    href={promo.cta.link}
                    className="block w-full text-center bg-gradient-to-r from-accent-gold via-accent-purple to-accent-gold/80 hover:from-accent-purple hover:to-accent-gold/90 text-dark-950 font-bold py-2.5 px-4 rounded-lg shadow-md transition-all text-base tracking-wide mt-auto"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {promo.cta.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Gradient Bottom */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tr from-accent-purple/40 via-accent-gold/30 to-transparent rounded-full blur-2xl opacity-60 pointer-events-none" />
      </div>
    </div>
  );
};

SpecialOfferModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  offer: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    cta: PropTypes.shape({
      label: PropTypes.string,
      link: PropTypes.string,
    }),
  }),
};

export default SpecialOfferModal;
