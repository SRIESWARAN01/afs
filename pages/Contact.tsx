
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Star, Send } from 'lucide-react';
import { ADDRESS, DISPLAY_PHONE, EMAIL, PHONE_NUMBER } from '../constants';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { firstName, lastName, email, phone, message } = formData;
    
    // Construct the WhatsApp message
    const text = `*New Inquiry from Website Contact Form*
    
*Name:* ${firstName} ${lastName}
*Email:* ${email}
*Phone:* ${phone}

*Message:*
${message}`;

    // Encode the text for URL
    const encodedText = encodeURIComponent(text);
    // Clean the phone number (remove + and spaces)
    const targetNumber = PHONE_NUMBER.replace(/[^0-9]/g, '');
    
    // Open WhatsApp
    window.open(`https://wa.me/${targetNumber}?text=${encodedText}`, '_blank');
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Get In Touch</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg text-afs-green">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Our Location</h3>
                    <p className="text-gray-600">{ADDRESS}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg text-afs-green">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone Number</h3>
                    <p className="text-gray-600">{DISPLAY_PHONE}</p>
                    <p className="text-sm text-gray-500">Mon-Sat 9am to 6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg text-afs-green">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Address</h3>
                    <p className="text-gray-600">{EMAIL}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg text-afs-green">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Business Hours</h3>
                    <p className="text-gray-600">Monday - Saturday: 09:00 AM - 08:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nearest Store UI */}
            <div className="bg-afs-dark text-white p-8 rounded-2xl shadow-sm relative overflow-hidden">
               <div className="relative z-10">
                 <h2 className="text-xl font-bold mb-4">Nearest Store</h2>
                 <p className="text-green-200 mb-6 text-sm">Based on your current location (Theni)</p>
                 
                 {/* Branch 1 */}
                 <div className="bg-white/10 p-5 rounded-lg backdrop-blur-sm border border-white/20 mb-4 hover:bg-white/20 transition-colors">
                   <div className="flex items-center gap-2 mb-2">
                      <span className="bg-green-600 text-[10px] font-bold px-2 py-0.5 rounded text-white uppercase tracking-wider">Branch 1</span>
                      <p className="font-bold text-sm text-white">Farm Shop</p>
                   </div>
                   <p className="font-bold text-sm text-green-100 mb-1">ARASUPANDIAN FARM SERVICE</p>
                   <p className="text-xs text-gray-300 leading-relaxed">
                     📍 ricemil Street,<br/>
                     Chinnaovulapuram,<br/>
                     Tamil Nadu – 625515.
                   </p>
                   <a 
                     href="https://share.google/UfCgXOmEO02JgfXRH" 
                     target="_blank" 
                     rel="noreferrer" 
                     className="inline-block mt-3 text-xs bg-white text-afs-dark px-3 py-1.5 rounded font-bold hover:bg-gray-100 transition"
                   >
                     Get Directions
                   </a>
                 </div>

                 {/* Branch 2 */}
                 <div className="bg-white/10 p-5 rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-orange-600 text-[10px] font-bold px-2 py-0.5 rounded text-white uppercase tracking-wider">Branch 2</span>
                      <p className="font-bold text-sm text-white">Agricultural Service Center</p>
                   </div>
                   
                   <p className="font-bold text-sm text-green-100 mb-1">ARASUPANDIAN FARM SERVICE</p>
                   
                   <div className="flex items-center gap-2 mb-2 text-xs">
                      <span className="flex items-center bg-yellow-500 text-black px-1.5 py-0.5 rounded font-bold">4.7 <Star size={10} className="ml-0.5 fill-black"/></span>
                      <span className="text-gray-300">15 Reviews</span>
                   </div>
                   
                   <p className="text-xs text-gray-300 leading-relaxed">
                     📍 128/1, L.F Main Road,<br/>
                     Gudalur, Theni,<br/>
                     Tamil Nadu – 625518.
                   </p>
                   <a 
                     href="https://share.google/wlZTxosBlGztIR7VC" 
                     target="_blank" 
                     rel="noreferrer"
                     className="inline-block mt-3 text-xs bg-white text-afs-dark px-3 py-1.5 rounded font-bold hover:bg-gray-100 transition"
                   >
                     Directions
                   </a>
                 </div>

               </div>
               <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                 <MapPin size={150} />
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-afs-green focus:border-transparent outline-none" 
                    placeholder="John" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-afs-green focus:border-transparent outline-none" 
                    placeholder="Doe" 
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-afs-green focus:border-transparent outline-none" 
                  placeholder="john@example.com" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-afs-green focus:border-transparent outline-none" 
                  placeholder="+91 98765 43210" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-afs-green focus:border-transparent outline-none" 
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-afs-green text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                <Send size={18} /> Send Message via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
