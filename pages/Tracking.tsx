
import React, { useState } from 'react';
import { Package, Search, CheckCircle, Circle, Truck, AlertTriangle, Loader2 } from 'lucide-react';
import { trackOrder } from '../services/dataService';
import { Order } from '../types';

const Tracking = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState<Order | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const result = await trackOrder(orderId.trim());
      if (result) {
        setOrder(result);
      } else {
        setError('Order ID not found. Please check and try again.');
      }
    } catch (err) {
      setError('Failed to track order. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getSteps = (status: string) => {
    // Determine step completion based on status
    const isShipped = status === 'Shipped' || status === 'Delivered';
    const isDelivered = status === 'Delivered';

    const steps = [
      { label: 'Order Placed', completed: true, date: order?.date },
      { label: 'Processing', completed: true, date: '' },
      { label: 'Shipped', completed: isShipped, date: '' },
      { label: 'Delivered', completed: isDelivered, date: '' }
    ];
    return steps;
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-green-100 rounded-full text-afs-green mb-4">
            <Truck size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Track Your Order</h1>
          <p className="text-gray-600 mt-2">Enter your Order ID to see the current status</p>
        </div>

        {/* Input Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <form onSubmit={handleTrack} className="flex gap-4">
            <div className="relative flex-grow">
              <Package className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Ex: ord_12345"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-afs-green focus:border-transparent outline-none"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="bg-afs-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />} Track
            </button>
          </form>
          {error && (
            <div className="mt-3 text-red-500 text-sm flex items-center gap-2 justify-center">
              <AlertTriangle size={16} /> {error}
            </div>
          )}
        </div>

        {/* Results */}
        {order && (
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-afs-green animation-fade-in">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-bold text-lg">{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-bold text-afs-green">₹{order.totalAmount}</p>
              </div>
            </div>

            <div className="space-y-8 relative">
              {/* Vertical Line */}
              <div className="absolute left-4 top-2 bottom-6 w-0.5 bg-gray-200"></div>

              {getSteps(order.status).map((step, index) => (
                <div key={index} className="relative flex items-start gap-4">
                  <div className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${step.completed ? 'bg-afs-green text-white' : 'bg-gray-200 text-gray-400'}`}>
                    {step.completed ? <CheckCircle size={16} /> : <Circle size={16} />}
                  </div>
                  <div className={`${step.completed ? 'text-gray-900' : 'text-gray-400'} pt-1`}>
                    <h4 className="font-bold leading-none">{step.label}</h4>
                    {step.date && <p className="text-xs text-gray-500 mt-1">{step.date}</p>}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
               <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Order Items</p>
               <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100">{order.items}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracking;
