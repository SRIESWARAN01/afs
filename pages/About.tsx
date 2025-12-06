
import React from 'react';
import { COMPANY_NAME, ESTABLISHED_DATE, GST_NO } from '../constants';
import { CheckCircle, Award, Users, Wrench, Smile, Briefcase } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white">
      {/* Banner */}
      <div className="bg-gray-900 py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Serving the agricultural community of Theni with dedication and integrity.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose lg:prose-xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{COMPANY_NAME}</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Established on <strong>{ESTABLISHED_DATE}</strong>, Arasupandian Farm Service has grown from a small local store to a trusted name in Theni's agricultural sector. As a sole proprietorship, we maintain a personal connection with every farmer who walks through our doors, treating their harvest success as our own.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our mission is to empower farmers by providing access to world-class fertilizers, seeds, and biological products, backed by scientific advice tailored to local conditions.
            </p>
          </div>

          {/* Leadership Profile Section */}
          <div className="mb-16 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
              <div className="md:w-2/5 relative h-80 md:h-auto">
                <img 
                  src="https://mrkagro.in/wp-content/uploads/2025/09/IMG_20221217_090234-scaled-e1756716625911.jpg" 
                  alt="Senthil Kumar" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                <div className="absolute bottom-4 left-4 text-white md:hidden">
                  <h3 className="text-xl font-bold">Senthil Kumar</h3>
                  <p className="text-sm opacity-90">Agronomist & R&D Head</p>
                </div>
              </div>
              <div className="p-8 md:w-3/5 flex flex-col justify-center bg-gray-50/50">
                <div className="hidden md:block mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Senthil Kumar</h3>
                  <p className="text-afs-green font-bold uppercase tracking-wider text-sm mt-1">Agronomist & R&D Head</p>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed italic">
                    "With a passion for sustainable farming, I strive to bring the latest agricultural research directly to the field to help our farmers succeed."
                  </p>
                  
                  <div className="flex flex-col gap-3 mt-4">
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="bg-green-100 p-2 rounded-full text-afs-green">
                        <Briefcase size={18} />
                      </div>
                      <span className="font-medium">20+ Years in Agri Input Industry</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                        <Award size={18} />
                      </div>
                      <span className="font-medium">Expertise in Cash Crops</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-afs-green">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Company Details</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium">Type</span>
                  <span>Sole Proprietorship</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium">GSTIN</span>
                  <span className="font-mono">{GST_NO}</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium">Headquarters</span>
                  <span>Theni, Tamil Nadu</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-afs-earth">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Users size={20} className="text-afs-green flex-shrink-0" />
                  <span>Experienced Field Team (Officer: Ramesh)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Award size={20} className="text-afs-green flex-shrink-0" />
                  <span>Trusted by Farmers for Quality Service</span>
                </li>
                <li className="flex items-center gap-3">
                  <Wrench size={20} className="text-afs-green flex-shrink-0" />
                  <span>Modern Tools & On-Field Support</span>
                </li>
                 <li className="flex items-center gap-3">
                  <Smile size={20} className="text-afs-green flex-shrink-0" />
                  <span>100% Customer Satisfaction Focus</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Vision */}
          <div className="text-center bg-green-50 p-10 rounded-2xl">
            <h3 className="text-2xl font-bold text-afs-dark mb-4">Our Vision</h3>
            <p className="text-lg text-gray-700 italic">
              "To be the backbone of sustainable agriculture in Theni, bridging the gap between traditional farming wisdom and modern agricultural technology."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
