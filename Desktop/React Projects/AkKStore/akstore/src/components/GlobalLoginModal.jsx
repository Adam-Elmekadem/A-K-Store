import React, { useContext } from 'react';
import LoginPopup from '../components/useraccount/LoginPopup';
import { LoginConsumer, LoginEditor } from '../context/loginContext';

export default function GlobalLoginModal() {
  const { showLoginPopup, isLogin } = useContext(LoginConsumer);
  const { setShowLoginPopup } = useContext(LoginEditor);

  const handleClose = () => {
    setShowLoginPopup(false);
  };

  return (
    <LoginPopup 
      open={showLoginPopup} 
      onClose={handleClose}
      initialMode={isLogin ? 'login' : 'signup'}
    />
  );
}
