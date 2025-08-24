import { Link } from 'react-router-dom';

import { cartConsumer } from '../context/cartContext';
import { LoginConsumer, LoginEditor } from '../context/loginContext';
import { isLoggedIn, logout, getUserName, isAdmin } from '../utils/auth';
import { useToast } from '../hooks/useToast';
import ToastContainer from './ui/ToastContainer';

import logo from '../assets/images/AKlogo-8.png';

import { X, AlignRight, ShoppingBag, UserPen, LogOut, Settings } from 'lucide-react'

import { useState, useContext, useEffect } from 'react';


export default function Navbar() {
    const [isMobile, setisMobile] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [userIsAdmin, setUserIsAdmin] = useState(false);

    const cart = useContext(cartConsumer);
    const loginState = useContext(LoginConsumer);
    const loginActions = useContext(LoginEditor);
    
    const { toasts, showToast, removeToast } = useToast();

    useEffect(() => {
        const loggedIn = isLoggedIn();
        const adminStatus = isAdmin();
        setUserLoggedIn(loggedIn);
        setUserIsAdmin(adminStatus);
        if (loggedIn) {
            setUserName(getUserName() || 'User');
        }
    }, [loginState.showLoginPopup]);

    const handleLogout = () => {
        logout();
        setUserLoggedIn(false);
        setUserIsAdmin(false);
        setUserName('');
        showToast('Logged out successfully!', 'success');
    };

    return (
        <header className="fixed top-0 left-0 w-full z-3000 text-white backdrop-blur-lg font-poppins">
            <nav className="max-w-6xl mx-auto flex justify-between items-center py-3 px-6 rounded-b-2xl">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logo} alt="Logo" className="h-12 w-auto shadow" />
                        <span className="text-2xl font-extrabold text-gray-100 tracking-wide font-Guardian">Ak-Store</span>
                    </Link>
                </div>
                <ul className="hidden md:flex space-x-8 text-sm font-medium">
                    <li className="hover:red-AKred transition cursor-pointer">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="hover:red-AKred transition cursor-pointer">
                        <Link to="/shop" className="font-poppins text-gray-300 hover:red-AKred transition">Shop</Link>
                    </li>
                    <Link to="/about">
                        <li className="hover:red-AKred transition cursor-pointer">About</li>
                    </Link>
                    <li className="hover:red-AKred transition cursor-pointer">
                        <Link to="/contact">Contact</Link>
                    </li>
                    {userIsAdmin && (
                        <li className="hover:red-AKred transition cursor-pointer">
                            <Link to="/admin/dashboard" className="flex items-center gap-1">
                                <Settings className="h-4 w-4" />
                                Dashboard
                            </Link>
                        </li>
                    )}
                </ul>

                <div className="relative flex items-center space-x-8">
                    <span className="relative">
                        <Link to="/cart">
                            <ShoppingBag className="h-6 w-6 hover:red-AKred transition cursor-pointer" />
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-lg font-bold rounded-full h-5 w-5 flex items-center justify-center font-galvaniez">
                                    {cart.length}
                                </span>
                            )}
                        </Link>
                    </span>
                    <div className="relative group">
                        {userLoggedIn ? (
                            <div className="hidden sm:flex items-center gap-3">
                                <span className="text-white font-poppins font-medium">Hello, <span className="font-semibold text-red-500">{userName.toUpperCase()}</span></span>
                                <button 
                                    type="button" 
                                    onClick={handleLogout}
                                    className="h-6 w-6 transition cursor-pointer hover:text-red-500"
                                    title="Logout"
                                >
                                    <LogOut className="h-6 w-6" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <UserPen className="hidden sm:block h-6 w-6 transition cursor-pointer hover:red-AKred" />
                                <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2 bg-gray-100 text-black text-sm font-bold rounded-md px-4 py-3 whitespace-nowrap z-10 shadow-lg min-w-[140px] flex flex-col items-center border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-gray-100"></div>
                                    <div className="flex space-x-4 font-poppins">
                                        <button 
                                            type="button" 
                                            onClick={() => {
                                                loginActions.setIsLogin(true);
                                                loginActions.setShowLoginPopup(true);
                                            }} 
                                            className="block hover:cursor-pointer w-full text-center py-1 hover:red-AKred transition bg-transparent border-none"
                                        >
                                            Login
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => {
                                                loginActions.setIsLogin(false);
                                                loginActions.setShowLoginPopup(true);
                                            }} 
                                            className="block hover:cursor-pointer w-full text-center py-1 hover:red-AKred transition bg-transparent border-none"
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <button
                    className="md:hidden flex items-center px-3 py-2 text-white hover:red-AKred hover:cursor-pointer z-100"
                    onClick={() => setisMobile(!isMobile)}
                    aria-label="Toggle menu"
                >
                    {isMobile ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <AlignRight className="h-6 w-6" />
                    )}
                </button>
            </nav>
            {/* Mobile menu */}
            {isMobile && (
                <>
                    {/* Overlay */}
                    <div className="sm:hidden fixed inset-0 bg-black/20 bg-opacity-50 z-40" onClick={() => setisMobile(false)}></div>
                    {/* Sidebar */}
                    <div className="sm:hidden fixed top-18 right-0 h-full w-72  text-black shadow-lg z-50 transform transition-transform duration-300">
                        <div className="flex flex-col h-full bg-white">
                            
                            <ul className="flex flex-col space-y-6 text-sm font-medium px-6 py-3 bg-white">
                                <li className="hover:red-AKred transition cursor-pointer">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="hover:red-AKred transition cursor-pointer">
                                    <Link to="/shop" className="font-poppins text-gray-300 hover:red-AKred transition">Shop</Link>
                                </li>
                                <li className="hover:red-AKred transition cursor-pointer">
                                    <Link to="/about" onClick={() => setisMobile(false)}>About</Link>
                                </li>
                                <li className="hover:red-AKred transition cursor-pointer">
                                    <Link to="/contact" onClick={() => setisMobile(false)}>Contact</Link>
                                </li>
                                {userIsAdmin && (
                                    <li className="hover:red-AKred transition cursor-pointer">
                                        <Link to="/admin/dashboard" className="flex items-center gap-2" onClick={() => setisMobile(false)}>
                                            <Settings className="h-4 w-4" />
                                            Dashboard
                                        </Link>
                                    </li>
                                )}
                                <hr className="border-gray-300" />
                                
                                {userLoggedIn ? (
                                    <div className='text-sm flex justify-center font-poppins'>
                                        <li>
                                            <div className="bg-red-AKred px-5 py-2 text-gray-100 mb-2 text-center">
                                                Hello, {userName}!
                                            </div>
                                            <button 
                                                type="button" 
                                                onClick={() => {
                                                    handleLogout();
                                                    setisMobile(false);
                                                }} 
                                                className="flex items-center gap-2 hover:text-gray-100 hover:bg-[#111111] transition cursor-pointer bg-red-AKred px-5 py-2 w-full text-center text-gray-100"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                Logout
                                            </button>
                                        </li>
                                    </div>
                                ) : (
                                    <div className='text-sm flex justify-center space-x-4 font-poppins text-gray-100'>
                                        <li>
                                            <button 
                                                type="button" 
                                                onClick={() => {
                                                    loginActions.setIsLogin(true);
                                                    loginActions.setShowLoginPopup(true);
                                                    setisMobile(false);
                                                }} 
                                                className="hover:text-gray-100 hover:bg-[#111111] transition cursor-pointer bg-red-AKred px-5 py-2 w-full text-left"
                                            >
                                                Login
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                type="button" 
                                                onClick={() => {
                                                    loginActions.setIsLogin(false);
                                                    loginActions.setShowLoginPopup(true);
                                                    setisMobile(false);
                                                }} 
                                                className="hover:text-gray-100 hover:bg-[#111111] transition cursor-pointer bg-red-AKred px-5 py-2 w-full text-left"
                                            >
                                                Sign Up
                                            </button>
                                        </li>
                                    </div>
                                )}
                            </ul>
                        </div>
                    </div>
                </>
            )}
            
            {/* Toast Container */}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
    </header>
    );
}