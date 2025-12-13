import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-slate-950">

      <div className="absolute inset-0 -z-10">
        <div className="absolute w-96 h-96 bg-sky-700/10 rounded-full blur-3xl top-20 left-20 animate-pulse-slow" />
        <div className="absolute w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl bottom-20 right-20 animate-pulse-slow" />
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-sky-500/5 border border-indigo-500/20 rounded-2xl mb-6 animate-bounce-slow">
            <HelpCircle className="w-8 h-8 text-indigo-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-sky-200">Frequently Asked Questions</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Got questions? We've got answers!
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-slate-900/70 border border-slate-700/50 rounded-2xl overflow-hidden animate-fade-in-up hover:border-sky-500/30 transition-colors duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-xl"
                aria-expanded={openIndex === index}
                aria-controls={`faq-content-${index}`}
              >
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-500/20 border border-indigo-500/30 rounded-lg flex items-center justify-center text-indigo-400 font-bold text-sm transition-colors duration-300 group-hover:bg-indigo-500/30 group-hover:border-indigo-500/50">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-white text-lg pr-8">
                    {faq.question}
                  </h3>
                </div>
                <div className="flex-shrink-0 text-slate-400 transition-transform duration-300" style={{
                  transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                }}>
                  <ChevronDown className="w-6 h-6 text-indigo-400" />
                </div>
              </button >

              <div
                id={`faq-content-${index}`}
                role="region"
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openIndex === index ? '500px' : '0',
                  opacity: openIndex === index ? '1' : '0'
                }}
              >
                <div className="px-6 pb-6">
                  <div className="ml-12 pl-6 border-l-2 border-indigo-500/30">
                    <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support CTA */}
        <div className="mt-16 text-center p-8 bg-slate-900/70 border border-slate-700/50 rounded-2xl animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-slate-300 mb-4">
            Still have questions? Our support team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-indigo-500/20"
            >
              <span>Contact Support</span>
            </a>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-emerald-500/20"
            >
              <span>💬</span>
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
