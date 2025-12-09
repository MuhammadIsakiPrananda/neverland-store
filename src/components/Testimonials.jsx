import React from 'react';
import { Star, Quote } from 'lucide-react';

const SectionHeader = () => (
  <div className="text-center mb-16 animate-fade-in-up space-y-4">
    <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
      <span className="bg-gradient-to-r from-accent-gold via-accent-silver to-accent-gold bg-clip-text text-transparent">
        Loved by Gamers
      </span>
      <br />
      <span className="text-white">Like You</span>
    </h2>
    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
      Join thousands of satisfied players who trust us for their gaming needs.
    </p>
  </div>
);

const TestimonialCard = ({ testimonial, index }) => (
  <figure
    className="group relative h-full flex flex-col animate-fade-in-up"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="relative h-full flex-grow flex flex-col bg-dark-900/50 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-white/20">
      {/* Glowing Border Effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-accent-purple/50 transition-all duration-300" style={{ mask: 'radial-gradient(transparent, black), linear-gradient(white, white)', maskComposite: 'intersect' }} />
      
      {/* Large Quote Icon in background */}
      <Quote className="absolute top-6 right-6 w-20 h-20 text-white/5 transform transition-transform duration-300 group-hover:scale-110" />

      {/* Content */}
      <div className="relative p-8 flex-grow">
        <div className="flex items-center gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-accent-gold text-accent-gold" />
          ))}
        </div>
        <blockquote className="text-slate-200 leading-relaxed">
          <p>"{testimonial.comment}"</p>
        </blockquote>
      </div>

      {/* Author Info Footer */}
      <figcaption className="relative flex items-center gap-4 p-6 bg-black/20 border-t border-white/10 mt-auto">
        <div className="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center text-2xl shrink-0">
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-bold text-white">{testimonial.name}</div>
          <div className="text-sm text-slate-400">Played: <span className="font-medium text-accent-purple">{testimonial.game}</span></div>
        </div>
      </figcaption>
    </div>
  </figure>
);

const Testimonials = ({ testimonials }) => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -top-20 -left-20 animate-pulse-slow" />
        <div className="absolute w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        <SectionHeader />

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;