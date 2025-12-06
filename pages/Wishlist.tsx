
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, Loader2, ShoppingBag } from 'lucide-react';
import { getProducts, fetchUserWishlist } from '../services/dataService';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const userMobile = localStorage.getItem('afs_user_mobile');

  useEffect(() => {
    if (!userMobile) {
      setLoading(false);
      return;
    }

    const loadWishlist = async () => {
      try {
        const productIds = await fetchUserWishlist(userMobile);
        const allProducts = getProducts();
        const filtered = allProducts.filter(p => productIds.includes(p.id));
        setWishlistProducts(filtered);
      } catch (err) {
        console.error("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, [userMobile]);

  if (!userMobile) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <Heart size={64} className="text-gray-200 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Sign In</h2>
        <p className="text-gray-500 mb-6">You need to log in to view your wishlist.</p>
        <Link to="/login" className="bg-afs-green text-white px-6 py-2 rounded-full font-bold">
          Sign In Now
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-afs-green" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Link to="/account" className="inline-flex items-center text-gray-500 hover:text-afs-green mb-6">
          <ArrowLeft size={20} className="mr-2" /> Back to Account
        </Link>
        
        <div className="flex items-center gap-3 mb-8">
          <Heart className="text-red-500 fill-red-500" size={32} />
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        </div>

        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">Explore our products and save your favorites here.</p>
            <Link to="/shop" className="text-afs-green font-bold hover:underline">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
