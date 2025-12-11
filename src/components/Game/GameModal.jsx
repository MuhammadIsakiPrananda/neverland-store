import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Gift, Shield, Zap, Info, User, Package, CreditCard, Star } from 'lucide-react';

// --- Sub-komponen untuk setiap langkah ---

const Step1 = ({ userId, setUserId, serverId, setServerId }) => (
  <div className="max-w-2xl mx-auto animate-fade-in-up">
    <h3 className="text-2xl font-bold mb-2 gradient-text">Enter Your Game ID</h3>
    <p className="text-slate-400 mb-6">Please enter your user ID and server ID (if applicable)</p>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          User ID / Game ID *
        </label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter your User ID"
          className="w-full px-4 py-3 bg-dark-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Server ID (Optional)
        </label>
        <input
          type="text"
          value={serverId}
          onChange={(e) => setServerId(e.target.value)}
          placeholder="Enter your Server ID (if applicable)"
          className="w-full px-4 py-3 bg-dark-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
        />
      </div>
      <div className="flex items-start space-x-2 glass-card p-4 rounded-xl">
        <Info className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-slate-300">
          You can find your User ID in the game profile section. Make sure to enter the correct ID to avoid issues.
        </p>
      </div>
    </div>
  </div>
);

const Step2 = ({ game, selectedPackage, setSelectedPackage, formatPrice }) => (
  <div className="animate-fade-in-up">
    <h3 className="text-2xl font-bold mb-2 gradient-text text-center">Choose Your Package</h3>
    <p className="text-slate-400 mb-6 text-center">Select the diamond/currency package you want</p>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {game.packages.map((pkg) => (
        <div
          key={pkg.id}
          onClick={() => setSelectedPackage(pkg)}
          className={`relative glass-card p-5 rounded-xl cursor-pointer transition-all duration-300 ${
            selectedPackage?.id === pkg.id
              ? 'border-2 border-primary-500 ring-4 ring-primary-500/20 shadow-lg shadow-primary-500/50'
              : 'border border-slate-700 hover:border-primary-500/50'
          }`}
        >
          {pkg.popular && (
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg flex items-center space-x-1">
              <Gift className="w-3 h-3" />
              <span>BEST DEAL</span>
            </div>
          )}
          
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">{pkg.amount}</div>
            {pkg.bonus !== '0' && (
              <div className="text-green-400 text-sm font-semibold mb-2 flex items-center justify-center space-x-1">
                <Gift className="w-4 h-4" />
                <span>+{pkg.bonus} Bonus</span>
              </div>
            )}
            <div className="text-primary-400 font-bold text-xl">{formatPrice(pkg.price)}</div>
          </div>
          
          {selectedPackage?.id === pkg.id && (
            <div className="absolute top-3 left-3 bg-primary-500 rounded-full p-1">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      ))}
    </div>

    {/* Features */}
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="glass-card p-4 rounded-xl flex items-center space-x-3">
        <Zap className="w-8 h-8 text-yellow-400" />
        <div>
          <div className="font-semibold text-white text-sm">Instant Delivery</div>
          <div className="text-xs text-slate-400">Within 30 seconds</div>
        </div>
      </div>
      <div className="glass-card p-4 rounded-xl flex items-center space-x-3">
        <Shield className="w-8 h-8 text-green-400" />
        <div>
          <div className="font-semibold text-white text-sm">100% Safe</div>
          <div className="text-xs text-slate-400">Secure transaction</div>
        </div>
      </div>
      <div className="glass-card p-4 rounded-xl flex items-center space-x-3">
        <Gift className="w-8 h-8 text-primary-400" />
        <div>
          <div className="font-semibold text-white text-sm">Bonus Rewards</div>
          <div className="text-xs text-slate-400">Extra currency</div>
        </div>
      </div>
    </div>
  </div>
);

const Step3 = ({ paymentMethods, selectedPayment, setSelectedPayment }) => (
  <div className="animate-fade-in-up">
    <h3 className="text-2xl font-bold mb-2 gradient-text text-center">Select Payment Method</h3>
    <p className="text-slate-400 mb-6 text-center">Choose your preferred payment option</p>
    
    <div className="space-y-4 max-w-3xl mx-auto">
      {paymentMethods.map((method, index) => (
        <div key={index} className="glass-card rounded-xl overflow-hidden">
          <div className="p-4 bg-white/5">
            <div className="flex items-center space-x-3">
              <div className="text-primary-400">{method.icon}</div>
              <span className="font-semibold text-lg">{method.name}</span>
            </div>
          </div>
          <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {method.methods.map((m, i) => (
              <button
                key={i}
                onClick={() => setSelectedPayment(`${method.name}-${m}`)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedPayment === `${method.name}-${m}`
                    ? 'bg-gradient-to-r from-primary-600 to-accent-purple text-white shadow-lg'
                    : 'bg-dark-900/50 text-slate-300 hover:bg-dark-900 border border-slate-700'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const GameModal = ({ game, onClose, paymentMethods, formatPrice }) => {
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [userId, setUserId] = useState('');
  const [serverId, setServerId] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Reset when game changes
  useEffect(() => {
    setStep(1);
    setSelectedPackage(null);
    setSelectedPayment(null);
    setUserId('');
    setServerId('');
    setAgreeTerms(false);
  }, [game]);

  if (!game) return null;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    if (step === 1) return userId.length > 0;
    if (step === 2) return selectedPackage !== null;
    if (step === 3) return selectedPayment !== null;
    return false;
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <Step1 userId={userId} setUserId={setUserId} serverId={serverId} setServerId={setServerId} />;
      case 2:
        return <Step2 game={game} selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage} formatPrice={formatPrice} />;
      case 3:
        return <Step3 paymentMethods={paymentMethods} selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment} />;
      case 4:
        return <Step4Summary game={game} userId={userId} serverId={serverId} selectedPackage={selectedPackage} selectedPayment={selectedPayment} formatPrice={formatPrice} agreeTerms={agreeTerms} setAgreeTerms={setAgreeTerms} />;
      default:
        return null;
    }
  };

  const steps = [
    { num: 1, label: 'User ID', Icon: User },
    { num: 2, label: 'Package', Icon: Package },
    { num: 3, label: 'Payment', Icon: CreditCard },
    { num: 4, label: 'Confirm', Icon: Check }
  ];

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in custom-scrollbar">
      <div className="glass-card border border-slate-700 rounded-3xl max-w-5xl w-full max-h-[90vh] shadow-2xl shadow-primary-500/20 flex flex-col">
        {/* Header */}
        <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
          <img src={game.image} alt={`${game.name} banner`} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/70 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-slate-200 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative h-full flex flex-col justify-end p-6">
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">{game.name}</h2>
            <p className="text-slate-300 text-sm drop-shadow-md">{game.description}</p>
            <div className="flex items-center space-x-3 mt-2">
              <span className="text-xs bg-primary-500/30 text-primary-300 px-2 py-0.5 rounded-full font-medium">
                {game.category}
              </span>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={14} className="fill-current" />
                <span className="text-xs text-white font-semibold">{game.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-y border-slate-700/50 flex-shrink-0">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                      step >= s.num
                        ? 'bg-gradient-to-br from-primary-500 to-accent-purple text-white shadow-lg shadow-primary-500/50'
                        : 'bg-dark-900 text-slate-500 border border-slate-700'
                    }`}
                  >
                    {step > s.num ? <Check className="w-6 h-6" /> : <s.Icon className="w-6 h-6" />}
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium ${
                      step >= s.num ? 'text-primary-400' : 'text-slate-500'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${
                      step > s.num ? 'bg-gradient-to-r from-primary-500 to-accent-purple' : 'bg-slate-700'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-grow">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700/50 bg-gradient-to-r from-dark-900/50 to-dark-800/50 flex-shrink-0">
          <div className="flex items-center justify-between">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 px-6 py-3 glass-card hover:bg-white/10 rounded-xl font-semibold transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            )}
            {step < 4 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`ml-auto flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                  canProceed()
                    ? 'btn-neon'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Next Step</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                disabled={!agreeTerms}
                className={`ml-auto px-8 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all ${
                  agreeTerms
                    ? 'btn-neon'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                  <span>Complete Payment</span>
                  <Check className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Step4Summary = ({ game, userId, serverId, selectedPackage, selectedPayment, formatPrice, agreeTerms, setAgreeTerms }) => (
  <div className="max-w-2xl mx-auto animate-fade-in-up">
    <h3 className="text-2xl font-bold mb-2 gradient-text text-center">Order Summary</h3>
    <p className="text-slate-400 mb-6 text-center">Please review your order before proceeding</p>
    
    <div className="space-y-4">
      <div className="glass-card p-6 rounded-xl">
        <h4 className="font-semibold text-white mb-4 flex items-center space-x-2">
          <Package className="w-5 h-5" />
          <span>Order Details</span>
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-400">Game</span>
            <span className="text-white font-medium">{game.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">User ID</span>
            <span className="text-white font-medium">{userId}</span>
          </div>
          {serverId && (
            <div className="flex justify-between">
              <span className="text-slate-400">Server ID</span>
              <span className="text-white font-medium">{serverId}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-slate-400">Package</span>
            <span className="text-white font-medium">{selectedPackage?.amount}</span>
          </div>
          {selectedPackage?.bonus !== '0' && (
            <div className="flex justify-between">
              <span className="text-slate-400">Bonus</span>
              <span className="text-green-400 font-medium">+{selectedPackage?.bonus}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-slate-400">Payment Method</span>
            <span className="text-white font-medium">{selectedPayment}</span>
          </div>
          <div className="border-t border-slate-700 pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-white">Total Payment</span>
              <span className="text-2xl font-bold gradient-text">
                {formatPrice(selectedPackage?.price)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Terms */}
      <div className="glass-card p-4 rounded-xl space-y-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-white mb-1">Secure Transaction</p>
            <p className="text-sm text-slate-300">Your payment is protected. Items will be delivered instantly after payment confirmation.</p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-4">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500/50 focus:ring-offset-dark-900 cursor-pointer"
            />
            <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
              I agree to the <a href="#" className="text-primary-400 hover:underline">Terms of Service</a> and confirm that the User ID is correct.
            </span>
          </label>
        </div>
      </div>
    </div>
  </div>
);

export default GameModal;