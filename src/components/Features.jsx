import React from 'react';
import { ArrowRight } from 'lucide-react';

const SectionHeader = ({ badgeText, titleLine1, titleLine2, subtitle }) => (
  <div className="text-center mb-16 animate-fade-in-up space-y-4">
    {/* Badge */}
    <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
      <div className="w-2 h-2 bg-accent-gold rounded-full animate-pulse" />
      <span className="text-sm font-semibold text-accent-gold">{badgeText}</span>
    </div>

    {/* Main Title */}
    <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
      <span className="bg-gradient-to-r from-accent-gold via-accent-silver to-accent-gold bg-clip-text text-transparent">
        {titleLine1}
      </span>
      <br />
      <span className="text-white">{titleLine2}</span>
    </h2>

    {/* Subtitle */}
    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
      {subtitle}
    </p>
  </div>
);

const FeatureCard = ({ feature, index }) => (
  <div
    className="group relative animate-fade-in-up"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    {/* Card Container with refined styling */}
    <div className="relative h-full bg-dark-900/50 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-white/20">
      {/* Glowing Border Effect */}
      <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-accent-gold/50 transition-all duration-300`} style={{ mask: 'radial-gradient(transparent, black), linear-gradient(white, white)', maskComposite: 'intersect' }} />
      
      {/* Content */}
      <div className="relative p-8 space-y-5">
        {/* Icon */}
        <div className="inline-flex">
          <div className={`bg-gradient-to-br ${feature.color} p-4 rounded-xl text-white text-2xl shadow-lg shadow-black/20`}>
            {feature.icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 leading-relaxed">
          {feature.desc}
        </p>
      </div>
    </div>
  </div>
);

const Features = ({ features }) => {
  return (
    <div id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-silver/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          badgeText="Why Choose Us"
          titleLine1="Unmatched Features"
          titleLine2="For Your Gaming Needs"
          subtitle="Experience the best gaming top-up service with cutting-edge features designed for gamers."
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;