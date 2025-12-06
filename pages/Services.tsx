import React from 'react';
import { Truck, Sprout, ClipboardList, ShieldCheck, Users, Droplets } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: 'Fertilizer Supply',
      description: 'We supply high-grade organic and chemical fertilizers tailored to your soil needs.',
      icon: <Sprout size={40} className="text-afs-green" />
    },
    {
      title: 'Pest Control Solutions',
      description: 'Identify and eliminate pests with our wide range of pesticides and biological controls.',
      icon: <ShieldCheck size={40} className="text-red-500" />
    },
    {
      title: 'Expert Field Visits',
      description: 'Our agronomists visit your farm to analyze crop health and suggest improvements.',
      icon: <Users size={40} className="text-blue-500" />
    },
    {
      title: 'Crop Guidance',
      description: 'End-to-end guidance from sowing to harvesting for maximum yield.',
      icon: <ClipboardList size={40} className="text-amber-500" />
    },
    {
      title: 'Delivery Support',
      description: 'Reliable delivery of bulk orders directly to your farm location.',
      icon: <Truck size={40} className="text-purple-500" />
    },
    {
      title: 'Irrigation Planning',
      description: 'Consultation on drip irrigation and water management systems.',
      icon: <Droplets size={40} className="text-cyan-500" />
    },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-gray-600">
            Arasupandian Farm Service goes beyond just selling products. We provide a comprehensive ecosystem to support farmers in every step of their journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-8 rounded-2xl border border-gray-100 hover:border-afs-green hover:shadow-xl transition-all duration-300 group bg-gray-50 hover:bg-white">
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-afs-earth rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Need a specialized service?</h2>
          <p className="mb-8 opacity-90">Contact us to schedule a field visit or discuss bulk requirements.</p>
          <a href="/contact" className="bg-white text-afs-earth px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
            Contact Us Today
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;