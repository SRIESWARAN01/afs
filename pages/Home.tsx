
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, X, ChevronRight, Instagram, Award, UserCheck, Warehouse, Zap, Banknote, Wrench, MapPin, Smile, Star, Leaf } from 'lucide-react';
import { CATEGORIES, SHOP_CATEGORIES, VIDEOS, LOGO_URL, CUSTOMER_REVIEWS } from '../constants';
import { getProducts } from '../services/dataService';
import ProductCard from '../components/ProductCard';
import { VideoItem, Product } from '../types';

const Home = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from data service
    setProducts(getProducts());
  }, []);

  // Filter only some products for homepage
  const featuredProducts = products.slice(0, 4);

  const handleVideoClick = (video: VideoItem) => {
    setCurrentVideo(video);
    setIsVideoOpen(true);
  };

  // Duplicate videos to create seamless loop for marquee
  const marqueeVideos = [...VIDEOS, ...VIDEOS, ...VIDEOS];
  
  // Duplicate reviews for seamless loop
  const marqueeReviews = [...CUSTOMER_REVIEWS, ...CUSTOMER_REVIEWS];

  const WHY_CHOOSE_US = [
    {
      title: "Trusted by Farmers",
      desc: "We deliver reliable, on-time farm support that farmers can depend on every season.",
      icon: <Award className="text-yellow-500" size={32} />
    },
    {
      title: "Experienced Field Team",
      desc: "Our trained field officers (Officer: Ramesh) provide expert guidance for all types of farming needs.",
      icon: <UserCheck className="text-blue-500" size={32} />
    },
    {
      title: "Complete Farm Solutions",
      desc: "From tractor service to fertilizer delivery — everything you need is available under one roof.",
      icon: <Warehouse className="text-green-500" size={32} />
    },
    {
      title: "Fast Booking & Quick Response",
      desc: "Simple online/phone booking with fast service confirmation and doorstep support.",
      icon: <Zap className="text-orange-500" size={32} />
    },
    {
      title: "Affordable Pricing",
      desc: "We offer cost-effective farming services without compromising on quality.",
      icon: <Banknote className="text-purple-500" size={32} />
    },
    {
      title: "Modern Tools & Technology",
      desc: "We use updated equipment and digital tools to improve farm productivity.",
      icon: <Wrench className="text-gray-600" size={32} />
    },
    {
      title: "On-Field Support",
      desc: "We reach your farmland to check, guide, and solve issues directly at the field.",
      icon: <MapPin className="text-red-500" size={32} />
    },
    {
      title: "100% Customer Satisfaction",
      desc: "Your farming success is our priority — we make sure every service meets your expectations.",
      icon: <Smile className="text-teal-500" size={32} />
    }
  ];

  return (
    <div className="flex flex-col gap-10 pb-12 bg-white">
      
      {/* Hero / Farming Categories Section */}
      <section className="container mx-auto px-4 mt-8">
        <h2 className="text-center text-xl md:text-2xl font-bold text-gray-900 mb-8">
          What Kind of Farming you're Involved
        </h2>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} to={`/shop?category=${cat.name}`} className="group flex flex-col items-center">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full p-1 border-2 border-green-500 hover:border-green-600 transition-colors">
                 <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                 </div>
              </div>
              <span className="mt-3 text-sm font-bold text-gray-500 group-hover:text-green-600">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="container mx-auto px-4 mt-8">
        <h2 className="text-center text-xl md:text-2xl font-bold text-gray-900 mb-8">
          Shop by Category
        </h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {SHOP_CATEGORIES.map((cat) => (
             <Link key={cat.id} to="/shop" className="group flex flex-col items-center max-w-[150px] text-center">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:shadow-xl transition-all relative">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Green Ring Effect on Hover */}
                  <div className="absolute inset-0 border-4 border-transparent group-hover:border-green-500 rounded-full transition-colors duration-300 pointer-events-none"></div>
                </div>
                <span className="mt-4 text-sm font-bold text-gray-500 group-hover:text-green-600 leading-tight">
                  {cat.name}
                </span>
             </Link>
          ))}
        </div>
      </section>

      {/* Shop by Videos Section (Marquee) */}
      <section className="mt-12 mb-8 overflow-hidden bg-gray-50 py-8">
         <h2 className="text-center text-xl md:text-2xl font-bold text-gray-900 mb-8">
           Shop by Videos
         </h2>
         
         <div className="relative w-full">
            <div className="flex animate-marquee hover-pause w-max">
              {marqueeVideos.map((video, index) => (
                 <div 
                   key={`${video.id}-${index}`} 
                   className="flex-shrink-0 w-48 md:w-56 aspect-[9/16] relative rounded-xl overflow-hidden cursor-pointer group mx-3 shadow-lg bg-black"
                   onClick={() => handleVideoClick(video)}
                 >
                   <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-700" 
                   />
                   
                   {/* Top Logo Branding overlay */}
                   <div className="absolute top-2 right-2 bg-white/90 p-1 rounded-md shadow-sm z-10">
                      <img src={LOGO_URL} className="h-3 object-contain" alt="brand" />
                   </div>

                   {/* Slight gradient at bottom only, keeping main image clear */}
                   <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
                   
                   {/* Play Button - appears on hover */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                      <div className="bg-white/30 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform">
                        <Play size={28} fill="white" className="text-white" />
                      </div>
                   </div>

                   {/* Bottom Info */}
                   <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-xs font-bold line-clamp-2 leading-snug drop-shadow-md">{video.title}</p>
                   </div>
                 </div>
              ))}
            </div>
         </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Why Choose Arasupandian Farm Service?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We are dedicated to your farming success with comprehensive support and expert guidance.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {WHY_CHOOSE_US.map((feature, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center border border-gray-100 group">
                   <div className="mb-4 bg-gray-50 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                   </div>
                   <h3 className="font-bold text-lg mb-2 text-gray-800">{feature.title}</h3>
                   <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-12 bg-white overflow-hidden">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-12">
          Customer Reviews
        </h2>
        <div className="relative w-full">
           <div className="flex animate-marquee hover-pause w-max">
             {marqueeReviews.map((review, idx) => (
               <div 
                 key={`${review.id}-${idx}`} 
                 className="flex-shrink-0 w-80 md:w-96 mx-4 p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
               >
                 <div className="mb-4">
                   <p className="text-gray-700 text-sm leading-relaxed italic">{review.text}</p>
                 </div>
                 
                 <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                    <div className="bg-green-100 p-2 rounded-full">
                       <Leaf className="text-afs-green" size={20} />
                    </div>
                    <div>
                       <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                       <p className="text-xs text-gray-500">{review.location}</p>
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Best Selling Products</h2>
            <Link to="/shop" className="text-green-600 font-bold hover:underline flex items-center text-sm">View All <ChevronRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {featuredProducts.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-10">No products available at the moment.</div>
            )}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoOpen && currentVideo && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4">
          <div className="w-full max-w-[350px] md:max-w-[400px] aspect-[9/16] relative rounded-xl overflow-hidden shadow-2xl bg-black flex flex-col">
            
            {/* Modal Header */}
            <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-start pointer-events-none">
               <span className="bg-black/40 text-white text-xs px-2 py-1 rounded backdrop-blur-md pointer-events-auto">
                 Watching: {currentVideo.title}
               </span>
               <button 
                onClick={() => setIsVideoOpen(false)}
                className="text-white hover:text-red-500 bg-black/50 rounded-full p-2 backdrop-blur-md pointer-events-auto transition-colors"
               >
                 <X size={24} />
               </button>
            </div>

            {/* Video Content */}
            <div className="flex-1 w-full h-full bg-black relative">
              <iframe 
                src={`${currentVideo.videoUrl}embed`}
                className="w-full h-full"
                frameBorder="0"
                scrolling="no"
                allowTransparency={true}
                allow="encrypted-media"
                title={currentVideo.title}
              ></iframe>
              
              {/* Fallback overlay in case embed is refused (common with Instagram) */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
                 <a 
                   href={currentVideo.videoUrl} 
                   target="_blank" 
                   rel="noreferrer"
                   className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform pointer-events-auto"
                 >
                   <Instagram size={18} />
                   Watch on Instagram
                 </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
