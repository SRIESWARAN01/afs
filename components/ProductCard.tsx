
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types';
import { PHONE_NUMBER } from '../constants';
import { toggleWishlist, isInWishlist } from '../services/dataService';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const whatsappLink = `https://wa.me/${PHONE_NUMBER.replace('+', '')}?text=Hi, I am interested in buying ${encodeURIComponent(product.name)} - Price: ₹${product.price}`;

  useEffect(() => {
    setIsLiked(isInWishlist(product.id));
  }, [product.id]);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    const mobile = localStorage.getItem('afs_user_mobile');
    if (!mobile) {
      if (window.confirm("Please login to save items to wishlist. Login now?")) {
        navigate('/login');
      }
      return;
    }

    // Optimistic toggle
    const newState = !isLiked;
    setIsLiked(newState);
    
    try {
      await toggleWishlist(mobile, product.id);
    } catch (err) {
      setIsLiked(!newState); // Revert
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden group flex flex-col relative">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-afs-earth text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            {product.badge}
          </span>
        )}
        <button 
          onClick={handleLike}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-colors"
        >
          <Heart size={18} className={`transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500 hover:text-red-500'}`} />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-gray-500 mb-1">{product.category}</div>
        <h3 className="font-semibold text-gray-800 mb-2 truncate">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-afs-dark">₹{product.price}</span>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-600 hover:text-white transition-colors"
          >
            <ShoppingBag size={16} />
            Order
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
