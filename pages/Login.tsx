
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Phone, ArrowLeft, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { ADMIN_MOBILE } from '../constants';
import { verifyLogin } from '../services/dataService';

const Login = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);

    try {
      // Admin Check
      if (mobile === ADMIN_MOBILE) {
        localStorage.setItem('afs_admin_auth', 'true');
        localStorage.setItem('afs_user_mobile', mobile);
        navigate('/admin');
        return;
      }

      // Check DB for User
      const result = await verifyLogin(mobile);
      
      if (result.success && result.user) {
        if (result.user.status === 'pending') {
          setError('Your account is waiting for approval. Please contact support.');
        } else {
          localStorage.setItem('afs_user_mobile', mobile);
          navigate('/account');
        }
      } else {
        setError('Number not found. Please create an account first.');
      }
    } catch (err) {
      setError('Login failed. Please check internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-4 font-sans">
      <div className="w-full max-w-md">
        <Link to="/account" className="flex items-center text-gray-500 hover:text-afs-green transition-colors mb-8">
          <ArrowLeft size={20} className="mr-2"/> Back to Account
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-green-50 text-afs-green rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
             <Phone size={32} strokeWidth={2} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Enter your mobile number to sign in</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 pl-1">Mobile Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <span className="font-bold text-gray-500">+91</span>
              </div>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  if (val.length <= 10) setMobile(val);
                }}
                className="w-full pl-14 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-afs-green focus:border-transparent outline-none text-lg tracking-widest font-medium transition-all bg-gray-50 focus:bg-white"
                placeholder="00000 00000"
                autoFocus
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm mt-2 ml-1 animate-pulse">
                <AlertCircle size={14} /> {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || mobile.length !== 10}
            className="w-full bg-afs-dark text-white font-bold py-4 rounded-xl hover:bg-green-900 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 size={24} className="animate-spin" />
            ) : (
              <>
                Continue <ShieldCheck size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-afs-green font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
