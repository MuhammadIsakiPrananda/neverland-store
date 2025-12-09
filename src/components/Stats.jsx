import React from 'react';

const Stats = ({ stats }) => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 relative -mt-16 z-20 bg-dark-850/30">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-gradient-radial from-primary-500/12 to-transparent rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse-slow" />
        <div className="absolute w-[400px] h-[400px] bg-accent-gold/8 rounded-full bottom-0 right-0 blur-3xl animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Stats Container with Better Shadow */}
        <div className="bg-gradient-to-r from-dark-900/90 via-dark-850/90 to-dark-900/90 backdrop-blur-2xl border border-slate-800/70 rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/40">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative group"
              >
                {/* Divider between stats (not on last item in row) */}
                {index < stats.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 w-px h-16 bg-gradient-to-b from-transparent via-slate-600 to-transparent transform -translate-y-1/2" />
                )}
                
                <div className="text-center space-y-3 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Icon with Enhanced Glow */}
                  <div className="inline-flex items-center justify-center mb-2">
                    <div className="relative">
                      {/* Outer Glow Ring */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-accent-purple/30 rounded-full blur-2xl scale-150 group-hover:scale-[2] group-hover:blur-3xl transition-all duration-500" />
                      
                      {/* Icon Container */}
                      <div className="relative bg-gradient-to-br from-primary-600/20 to-accent-purple/20 p-4 rounded-2xl border border-primary-500/30 group-hover:border-primary-400/50 transition-all duration-300 group-hover:scale-110">
                        <div className="text-primary-400 group-hover:text-primary-300 transition-colors">
                          {stat.icon}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Value with Counter Effect */}
                  <div className="text-5xl md:text-6xl font-black mb-2 group-hover:scale-110 transition-transform duration-300">
                    <span className="bg-gradient-to-r from-primary-400 via-accent-purple to-primary-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                      {stat.value}
                    </span>
                  </div>

                  {/* Label */}
                  <div className="text-base md:text-lg text-white font-bold mb-1 group-hover:text-primary-400 transition-colors">
                    {stat.label}
                  </div>

                  {/* Description */}
                  <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    {stat.description}
                  </div>

                  {/* Progress Bar Animation */}
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-4">
                    <div 
                      className="h-full bg-gradient-to-r from-primary-500 to-accent-purple rounded-full group-hover:animate-pulse"
                      style={{ 
                        width: '100%',
                        animation: `slide-in-left 1s ease-out ${index * 0.2}s forwards`,
                        transformOrigin: 'left'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;