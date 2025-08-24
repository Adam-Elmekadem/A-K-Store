import React, { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { loginUser, signupUser, setUserInfo } from '../../utils/auth';
import { useToast } from '../../hooks/useToast';
import ToastContainer from '../ui/ToastContainer';

export default function LoginPopup({ open, onClose, initialMode = 'login' }) {
  if (!open) return null;

  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 4;

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Invalid email";

    if (!password.trim()) newErrors.password = "Password is required";
    else if (!validatePassword(password))
      newErrors.password = "Password must be at least 6 characters";

    if (!isLogin && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    
    try {
      let data;
      
      if (isLogin) {
        data = await loginUser(email, password);
      } else {
        data = await signupUser(email, password, subscribe);
      }

      // Only proceed if we have a valid token
      if (data && data.token) {
        setUserInfo(email, data.token);
        if (keepLoggedIn) {
          localStorage.setItem('keepLoggedIn', 'true');
        }
        
        showToast(`${isLogin ? 'Login' : 'Signup'} successful!`, 'success');
        // debug
        console.log(`${isLogin ? 'Login' : 'Signup'} successful:`, data);

        // Close after a brief delay to show the toast
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        // No valid token received
        throw new Error(`${isLogin ? 'Login' : 'Signup'} failed - no valid token received`);
      }
    } catch (error) {
      console.error('Authentication Error:', error);

      let errorMsg;
      if (error && typeof error === 'object' && error.message) {
        errorMsg = error.message;
      } else if (typeof error === 'string') {
        errorMsg = error;
      } else {
        errorMsg = isLogin
          ? "Invalid email or password. Please try again."
          : "Signup failed. Please check your information and try again.";
      }

      showToast(errorMsg, 'error');
      setErrors({ 
        submit: errorMsg
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-gray-500/10 z-[9999]"
        onClick={onClose}
        aria-label="Close modal"
      ></div>
      
      <div className="fixed inset-0 z-[10000] flex justify-center items-center px-2">
        <div
          className={`bg-white w-400 max-w-100 sm:max-w-md  relative mx-2 md:mx-0 ${
            !isLogin ? "max-h-[80vh]" : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 hover:cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div
          className={`p-8 pt-12 ${!isLogin ? "max-h-[80vh] overflow-y-auto" : ""}`}
        >
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            {isLogin ? "Log in" : "Sign up"}
          </h2>
          <p className="mb-6 text-gray-700">
            {isLogin
              ? "Welcome back! Please sign in to your account."
              : "Create an account to enjoy exclusive products, experiences, and offers."}
          </p>

          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.submit}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                EMAIL ADDRESS <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border rounded px-3 py-2 focus:outline-none text-black focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                PASSWORD <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full border rounded px-3 py-2 pr-10 focus:outline-none text-black focus:ring-2 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder={isLogin ? "Enter your password" : "Create a password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm */}
            {!isLogin && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  CONFIRM PASSWORD <span className="text-red-500">*</span>
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full border rounded px-3 py-2 focus:outline-none text-black focus:ring-2 ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Keep me */}
            <div className="flex items-center">
              <input
                id="keepLoggedIn"
                type="checkbox"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                className="mr-2 accent-red-500"
              />
              <label
                htmlFor="keepLoggedIn"
                className="text-sm font-semibold text-gray-700"
              >
                Keep me logged in
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`hover:cursor-pointer w-full py-2 rounded font-bold transition ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-red-500"
              }`}
            >
              {isLoading ? "Processing..." : isLogin ? "Log In" : "Create Account"}
            </button>

            {/* Subscribe */}
            {!isLogin && (
              <div className="flex items-center mt-2">
                <input
                  id="subscribe"
                  type="checkbox"
                  checked={subscribe}
                  onChange={(e) => setSubscribe(e.target.checked)}
                  className="mr-2 accent-red-500"
                />
                <label htmlFor="subscribe" className="text-sm text-gray-700">
                  Sign me up for exclusive offers and news
                </label>
              </div>
            )}

            {/* Toggle */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-red-500 hover:underline font-medium hover:cursor-pointer"
                >
                  {isLogin ? "Sign up" : "Log in"}
                </button>
              </p>
            </div>
          </form>
        </div>
        </div>
      </div>
      
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}
