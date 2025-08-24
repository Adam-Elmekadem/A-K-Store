import React from 'react';
import Toast from './Toast';

export default function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[10001] space-y-4">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => removeToast(toast.id)}
          duration={0} 
        />
      ))}
    </div>
  );
}
