
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, Loader2 } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { getProducts, loadDatabase } from '../services/dataService';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const categoryParam = query.get('category');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'All');

  useEffect(() => {
    // Load products from DB
    const init = async () => {
      // Ensure data is loaded
      const data = getProducts();
      if (data.length === 0) {
        await loadDatabase();
        setProducts(getProducts());
      } else {
        setProducts(data);
      }
      setLoading(false);
    };
    init();
  }, []);

  // Derive unique categories from products + 'All'
  const productCategories = useMemo(() => {
    return ['All', ...Array.from(new Set(products.map(p => p.category)))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter(p => p.category === selectedCategory || (categoryParam && categoryParam !== 'All' && p.name.includes(categoryParam)));
  }, [selectedCategory, categoryParam, products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-afs-green" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shop Agriculture Products</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center gap-2 mb-4 font-semibold text-lg border-b pb-2">
                <Filter size={20} /> Filters
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Categories</h3>
                {productCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat ? 'bg-afs-green text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Crop Types</h3>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map(c => (
                     <div key={c.id} className="text-xs text-gray-600 bg-gray-100 p-2 rounded text-center">
                        {c.name}
                     </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 text-sm">Showing {filteredProducts.length} results</span>
              <select className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-afs-green">
                <option>Sort by: Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500">No products found in this category.</p>
                <button 
                  onClick={() => setSelectedCategory('All')} 
                  className="mt-4 text-afs-green font-medium hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
