
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Heart, Package, LogOut, CheckCircle } from 'lucide-react';

const Account = () => {
  const navigate = useNavigate();
  const [userMobile, setUserMobile] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('afs_user_mobile');
    if (storedUser) {
      setUserMobile(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('afs_user_mobile');
    setUserMobile(null);
    navigate('/login');
  };

  return (
    <div className="min-h-[80vh] bg-white pt-10 px-6 font-sans">
      <div className="max-w-md mx-auto mt-8 md:mt-12">
        {/* Header Section */}
        <div className="flex items-center gap-5 mb-16">
          <div className="bg-[#1e2329] text-white w-20 h-20 rounded-full flex items-center justify-center shrink-0 shadow-sm relative">
            <User size={36} strokeWidth={2} />
            {userMobile && (
              <div className="absolute bottom-0 right-0 bg-green-500 border-2 border-white w-6 h-6 rounded-full flex items-center justify-center">
                <CheckCircle size={14} className="text-white" />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[#1e2329] tracking-tight">Account</h1>
            {userMobile && <p className="text-gray-500 mt-1 font-medium">+91 {userMobile}</p>}
          </div>
        </div>

        {/* Menu Options */}
        <nav className="flex flex-col space-y-10">
          
          {!userMobile && (
            <>
              <Link to="/login" className="flex items-center gap-6 group hover:translate-x-1 transition-transform duration-200">
                <User size={28} strokeWidth={2} className="text-[#1e2329]" />
                <span className="text-xl font-semibold text-[#1e2329] group-hover:text-afs-green transition-colors">Sign In</span>
              </Link>

              <Link to="/register" className="flex items-center gap-6 group hover:translate-x-1 transition-transform duration-200">
                <User size={28} strokeWidth={2} className="text-[#1e2329]" />
                <span className="text-xl font-semibold text-[#1e2329] group-hover:text-afs-green transition-colors">Create Account</span>
              </Link>
            </>
          )}

          <Link to="/wishlist" className="flex items-center gap-6 group hover:translate-x-1 transition-transform duration-200">
            <Heart size={28} strokeWidth={2} className="text-[#1e2329]" />
            <span className="text-xl font-semibold text-[#1e2329] group-hover:text-afs-green transition-colors">Wishlist</span>
          </Link>

          <Link to="/tracking" className="flex items-center gap-6 group hover:translate-x-1 transition-transform duration-200">
            <Package size={28} strokeWidth={2} className="text-[#1e2329]" />
            <span className="text-xl font-semibold text-[#1e2329] group-hover:text-afs-green transition-colors">Order Tracking</span>
          </Link>

          {userMobile && (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-6 group hover:translate-x-1 transition-transform duration-200 text-left"
            >
              <LogOut size={28} strokeWidth={2} className="text-red-500" />
              <span className="text-xl font-semibold text-red-500 group-hover:text-red-700 transition-colors">Sign Out</span>
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Account;
