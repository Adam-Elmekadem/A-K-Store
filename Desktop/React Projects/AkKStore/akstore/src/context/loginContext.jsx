import { createContext, useState } from 'react';

const LoginConsumer = createContext({
  showLoginPopup: false,
  isLogin: true
});

const LoginEditor = createContext({
  setShowLoginPopup: () => {},
  setIsLogin: () => {}
});

function LoginProvider({ children }) {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const loginContextValue = {
    showLoginPopup,
    isLogin
  };

  const loginEditorValue = {
    setShowLoginPopup,
    setIsLogin
  };

  return (
    <LoginConsumer.Provider value={loginContextValue}>
      <LoginEditor.Provider value={loginEditorValue}>
        {children}
      </LoginEditor.Provider>
    </LoginConsumer.Provider>
  );
}

export { LoginConsumer, LoginEditor, LoginProvider };
