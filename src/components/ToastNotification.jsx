import React, { useState, useEffect } from 'react';
import { CheckCircle, X, AlertCircle, Info, AlertTriangle } from 'lucide-react';

// Konfigurasi untuk setiap tipe notifikasi agar lebih mudah dikelola dan diperluas.
const toastConfig = {
  success: {
    Icon: <CheckCircle className="w-5 h-5 text-green-400" />,
    style: 'bg-green-500/10 border-green-500/20',
  },
  error: {
    Icon: <AlertCircle className="w-5 h-5 text-red-400" />,
    style: 'bg-red-500/10 border-red-500/20',
  },
  info: {
    Icon: <Info className="w-5 h-5 text-blue-400" />,
    style: 'bg-blue-500/10 border-blue-500/20',
  },
  warning: {
    Icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
    style: 'bg-yellow-500/10 border-yellow-500/20',
  },
};

const ToastNotification = ({ message, type = 'success', onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Efek untuk animasi masuk dan keluar
  useEffect(() => {
    // Animasikan saat komponen muncul
    setIsVisible(true);

    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]); // sengaja onClose tidak dimasukkan agar tidak reset timer jika prop berubah

  const handleClose = () => {
    setIsVisible(false);
    // Tunggu animasi selesai sebelum memanggil onClose dari parent
    const animationDuration = 300; // Sesuaikan dengan `duration-300` dari Tailwind
    setTimeout(() => {
      onClose();
    }, animationDuration);
  };

  const { Icon, style } = toastConfig[type] || toastConfig.success;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`fixed top-4 right-4 z-[200] flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-lg transition-all duration-300 ease-in-out ${style} ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      }`}
    >
      {Icon}
      <span className="text-white text-sm font-medium">{message}</span>
      <button
        onClick={handleClose}
        aria-label="Close notification"
        className="ml-2 p-1 rounded-lg hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4 text-white/70" />
      </button>
    </div>
  );
};

export default ToastNotification;