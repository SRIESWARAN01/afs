
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Phone, MapPin, Sprout, Loader2, CheckCircle, ArrowLeft, Clock } from 'lucide-react';
import { registerUser } from '../services/dataService';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    crop: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Mobile Number Validation: Only allow digits, max 10
    if (name === 'mobile') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

    try {
      // Save to Google Sheet DB via dataService
      await registerUser(formData);

      setLoading(false);
      setSuccess(true);
      // Reset form
      setFormData({ name: '', mobile: '', address: '', crop: '' });
      // Redirect after delay
      setTimeout(() => {
        navigate('/login'); // Redirect to Login instead of Account
      }, 5000);
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Registration failed. Please check your internet connection.");
    }
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center animation-fade-in border-t-4 border-orange-500">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-6 font-medium">
            Your account is currently <span className="text-orange-600 font-bold">Pending Approval</span>.
          </p>
          <p className="text-sm text-gray-500 mb-8 bg-gray-50 p-4 rounded-lg">
            Please wait for the Admin to approve your request. You will be able to log in with your mobile number once approved.
          </p>
          <Link to="/login" className="inline-block bg-afs-dark text-white px-6 py-2 rounded-lg font-medium hover:bg-black transition-colors">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 font-sans">
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
            <Link to="/account" className="flex items-center text-gray-500 hover:text-afs-green transition-colors mb-4">
                <ArrowLeft size={20} className="mr-2"/> Back to Account
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-500 mt-2">Enter your farming details to get started with AFS.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="h-2 bg-afs-green w-full"></div>
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afs-green focus:border-transparent outline-none transition-all"
                  placeholder="Ex: M. Ramesh"
                />
              </div>
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Phone size={20} />
                </div>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afs-green focus:border-transparent outline-none transition-all"
                  placeholder="Ex: 9363734905"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">We will use this for order updates.</p>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
              <div className="relative">
                 <div className="absolute top-3 left-3 pointer-events-none text-gray-400">
                  <MapPin size={20} />
                </div>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afs-green focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Village, Taluk, District..."
                />
              </div>
            </div>

            {/* Crop */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Crop</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Sprout size={20} />
                </div>
                <select
                  name="crop"
                  value={formData.crop}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afs-green focus:border-transparent outline-none bg-white transition-all appearance-none"
                >
                  <option value="" disabled>Select your main crop</option>
                  <option value="Banana">Banana (வாழை)</option>
                  <option value="Coconut">Coconut (தென்னை)</option>
                  <option value="Cardamom">Cardamom (ஏலக்காய்)</option>
                  <option value="Grapes">Grapes (திராட்சை)</option>
                  <option value="Vegetables">Vegetables (காய்கறிகள்)</option>
                  <option value="Paddy">Paddy (நெல்)</option>
                  <option value="Other">Other (பிற)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                   <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-afs-earth text-white font-bold py-4 rounded-xl hover:bg-yellow-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> Saving...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
