
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search, Phone, MapPin, Facebook, Instagram, Youtube, MessageCircle, Heart, Wifi, WifiOff } from 'lucide-react';
import { COMPANY_NAME, PHONE_NUMBER, DISPLAY_PHONE, ADDRESS, LOGO_URL, SOCIAL_LINKS } from '../constants';
import { checkSystemHealth } from '../services/dataService';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dbConnected, setDbConnected] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check connection on mount and every 30 seconds
    const checkStatus = async () => {
      const isOnline = await checkSystemHealth();
      setDbConnected(isOnline);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/shop' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Nearby Store', path: '/contact' },
    { name: 'Order Tracking', path: '/tracking' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white font-sans shadow-sm">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          
          {/* Top Row for Mobile: Logo + Actions */}
          <div className="w-full md:w-auto flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
               <img src={LOGO_URL} alt={COMPANY_NAME} className="h-12 md:h-16 object-contain" />
               {/* Database Status Indicator (Mobile) */}
               <div className="md:hidden flex items-center" title={dbConnected ? "Database Connected" : "Disconnected"}>
                  <div className={`w-2.5 h-2.5 rounded-full ${dbConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
               </div>
            </Link>

            {/* Mobile Actions */}
            <div className="flex items-center gap-4 md:hidden">
              <button className="text-gray-700 relative">
                 <ShoppingCart size={22} />
                 <span className="absolute -top-1 -right-1 bg-afs-earth text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Navigation & Search - Desktop */}
          <div className="hidden xl:flex flex-col items-end gap-3 flex-1 w-full">
             {/* Top Utility Bar */}
             <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                   <div className={`w-2 h-2 rounded-full ${dbConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                   <span>{dbConnected ? 'System Online' : 'System Offline'}</span>
                </div>
                <span>{DISPLAY_PHONE}</span>
             </div>

             {/* Main Nav Links */}
             <nav className="flex items-center space-x-6 w-full justify-end">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    className={`text-sm font-bold text-gray-800 hover:text-afs-green transition-colors uppercase tracking-tight ${isActive(link.path) ? 'text-afs-green' : ''}`}
                  >
                    {link.name}
                  </Link>
                ))}
             </nav>
          </div>

          {/* Search Bar & Icons - Desktop & Tablet */}
          <div className="w-full md:w-auto flex items-center gap-4 flex-shrink-0">
             {/* Search Bar */}
             <div className="relative flex-1 md:w-80">
                <input 
                  type="text" 
                  placeholder="Search for products..." 
                  className="w-full border-2 border-gray-800 rounded-md py-2 px-4 text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:border-afs-green"
                />
                <Search className="absolute right-3 top-2.5 text-gray-800 cursor-pointer" size={18} />
             </div>

             {/* Desktop Icons */}
             <div className="hidden md:flex items-center space-x-4">
                <Link to="/account" className="text-gray-700 hover:text-afs-green transition-colors">
                  <User size={22} />
                </Link>
                <Link to="/wishlist" className="text-gray-700 hover:text-afs-green transition-colors">
                  <Heart size={22} />
                </Link>
                <button className="text-gray-700 hover:text-afs-green transition-colors relative">
                  <ShoppingCart size={22} />
                  <span className="absolute -top-2 -right-2 bg-afs-green text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
                </button>
             </div>
          </div>
        </div>
        
        {/* Tablet/Desktop Nav Row (if screen is smaller than XL but bigger than mobile, simplify) */}
        <div className="hidden md:flex xl:hidden justify-center mt-4 border-t pt-4 relative">
             <div className="absolute left-0 top-5 flex items-center gap-1 text-[10px] text-gray-400">
                   <div className={`w-2 h-2 rounded-full ${dbConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                   <span>DB</span>
             </div>
            <nav className="flex items-center space-x-4 text-xs font-bold uppercase text-gray-800">
               {navLinks.map((link) => (
                  <Link key={link.name} to={link.path} className="hover:text-afs-green">{link.name}</Link>
               ))}
            </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg z-50">
          <div className="flex flex-col p-4 space-y-3">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-gray-800 font-medium py-2 hover:text-afs-green border-b border-gray-50 last:border-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex gap-4 pt-2">
               <Link to="/account" className="flex items-center gap-2 text-sm text-gray-600" onClick={() => setIsMenuOpen(false)}>
                  <User size={16}/> Account
               </Link>
               <Link to="/wishlist" className="flex items-center gap-2 text-sm text-gray-600" onClick={() => setIsMenuOpen(false)}>
                  <Heart size={16}/> Wishlist
               </Link>
            </div>
            {/* Status in Mobile Menu */}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-100 text-sm text-gray-500">
               {dbConnected ? <Wifi size={16} className="text-green-500" /> : <WifiOff size={16} className="text-red-500" />}
               Status: {dbConnected ? 'Connected' : 'Disconnected'}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
               <img src={LOGO_URL} alt={COMPANY_NAME} className="h-12 object-contain" />
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Your trusted partner for high-quality fertilizers, seeds, and expert agricultural guidance in Theni.
            </p>
            <div className="flex space-x-4 text-gray-400">
               <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="hover:text-afs-green transition-colors" aria-label="Facebook">
                 <Facebook size={20} />
               </a>
               <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="hover:text-afs-green transition-colors" aria-label="Instagram">
                 <Instagram size={20} />
               </a>
               <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" className="hover:text-afs-green transition-colors" aria-label="YouTube">
                 <Youtube size={20} />
               </a>
            </div>
          </div>
          <div>
            <h3 className="text-gray-900 text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-afs-green">Home</Link></li>
                <li><Link to="/shop" className="hover:text-afs-green">Shop</Link></li>
                <li><Link to="/contact" className="hover:text-afs-green">Contact Us</Link></li>
                <li><Link to="/about" className="hover:text-afs-green">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-900 text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
                <li><Link to="/tracking" className="hover:text-afs-green">Order Tracking</Link></li>
                <li><Link to="/services" className="hover:text-afs-green">Services</Link></li>
                <li><a href="#" className="hover:text-afs-green">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-afs-green">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-900 text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                    <MapPin size={16} className="mt-0.5 text-afs-green" />
                    {ADDRESS}
                </li>
                <li className="flex items-center gap-2">
                    <Phone size={16} className="text-afs-green" />
                    {DISPLAY_PHONE}
                </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
             © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${PHONE_NUMBER.replace('+', '')}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-110 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
};
