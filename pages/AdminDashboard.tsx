
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Users, LogOut, Plus, 
  Edit, Trash2, CheckCircle, XCircle, X, Loader2, Wifi, WifiOff, ShoppingBag, Truck, Shield
} from 'lucide-react';
import { 
  getProducts, addProduct, updateProduct, deleteProduct, 
  getPendingUsers, getApprovedUsers, approveUser, rejectUser, loadDatabase, checkSystemHealth,
  getOrders, addOrder, updateOrder, deleteOrder, updateUserRole
} from '../services/dataService';
import { Product, User, Order } from '../types';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'users' | 'orders'>('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  // Data State
  const [products, setProducts] = useState<Product[]>([]);
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [approvedUsers, setApprovedUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  
  // Product Form State
  const [productForm, setProductForm] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
    description: '',
    badge: ''
  });

  // Order Form State
  const [orderForm, setOrderForm] = useState({
    userMobile: '',
    items: '',
    totalAmount: '',
    status: 'Processing',
    date: ''
  });

  useEffect(() => {
    // Auth Check
    const isAdmin = localStorage.getItem('afs_admin_auth');
    if (!isAdmin) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    const status = await checkSystemHealth();
    setIsConnected(status);
    await loadDatabase();
    setProducts(getProducts());
    setPendingUsers(getPendingUsers());
    setApprovedUsers(getApprovedUsers());
    setOrders(getOrders());
    setIsLoading(false);
  };

  const refreshLocalState = () => {
    setProducts(getProducts());
    setPendingUsers(getPendingUsers());
    setApprovedUsers(getApprovedUsers());
    setOrders(getOrders());
  };

  const handleLogout = () => {
    localStorage.removeItem('afs_admin_auth');
    localStorage.removeItem('afs_user_mobile');
    navigate('/login');
  };

  // --- PRODUCT HANDLERS ---
  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductForm({ name: '', category: '', price: '', image: '', description: '', badge: '' });
    setShowProductModal(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      image: product.image,
      description: product.description,
      badge: product.badge || ''
    });
    setShowProductModal(true);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsActionLoading(true);
    const productData = {
      name: productForm.name,
      category: productForm.category,
      price: Number(productForm.price),
      image: productForm.image || 'https://via.placeholder.com/400',
      description: productForm.description,
      badge: productForm.badge || undefined
    };

    try {
      if (editingProduct) {
        await updateProduct({ ...productData, id: editingProduct.id });
      } else {
        await addProduct(productData);
      }
      setShowProductModal(false);
      refreshLocalState();
    } catch (error) {
      alert('Failed to save product. Check console.');
      console.error(error);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteProduct = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); 
    if (window.confirm('Delete this product?')) {
      setIsActionLoading(true);
      try {
        await deleteProduct(id);
        refreshLocalState();
      } catch (err) {
        console.error(err);
        alert('Failed to delete product. Try again.');
      } finally {
        setIsActionLoading(false);
      }
    }
  };

  // --- ORDER HANDLERS ---
  const openAddOrderModal = () => {
    setEditingOrder(null);
    const today = new Date().toLocaleDateString('en-GB'); // DD/MM/YYYY
    setOrderForm({ userMobile: '', items: '', totalAmount: '', status: 'Processing', date: today });
    setShowOrderModal(true);
  };

  const openEditOrderModal = (order: Order) => {
    setEditingOrder(order);
    setOrderForm({
      userMobile: order.userMobile,
      items: order.items,
      totalAmount: order.totalAmount.toString(),
      status: order.status,
      date: order.date
    });
    setShowOrderModal(true);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsActionLoading(true);
    const orderData = {
      userMobile: orderForm.userMobile,
      items: orderForm.items,
      totalAmount: Number(orderForm.totalAmount),
      status: orderForm.status as any,
      date: orderForm.date
    };

    try {
      if (editingOrder) {
        await updateOrder({ ...orderData, id: editingOrder.id });
      } else {
        await addOrder(orderData);
      }
      setShowOrderModal(false);
      refreshLocalState();
    } catch (error) {
      alert('Failed to save order.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteOrder = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Delete this order?')) {
      setIsActionLoading(true);
      try {
        await deleteOrder(id);
        refreshLocalState();
      } catch (err) {
        alert('Failed to delete order.');
      } finally {
        setIsActionLoading(false);
      }
    }
  };

  // --- USER HANDLERS ---
  const handleApproveUser = async (id: string) => {
    setIsActionLoading(true);
    try {
      await approveUser(id);
      refreshLocalState();
    } catch (err) {
      alert('Failed to approve user');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleRejectUser = async (id: string) => {
    if (window.confirm('Reject this user registration?')) {
      setIsActionLoading(true);
      try {
        await rejectUser(id);
        refreshLocalState();
      } catch (err) {
        alert('Failed to reject user');
      } finally {
        setIsActionLoading(false);
      }
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    if(window.confirm(`Change user role to ${newRole}?`)) {
      setIsActionLoading(true);
      try {
        await updateUserRole(userId, newRole as 'admin' | 'farmer');
        refreshLocalState();
      } catch(err) {
        alert("Failed to update role");
      } finally {
        setIsActionLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e2329] text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold">AFS Admin</h1>
          <p className="text-xs text-gray-400 mt-1">Management Portal</p>
          <div className="mt-4 flex items-center gap-2 text-xs">
            {isConnected ? (
              <span className="flex items-center gap-1 text-green-400"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> DB Connected</span>
            ) : (
              <span className="flex items-center gap-1 text-red-400"><div className="w-2 h-2 rounded-full bg-red-500"></div> DB Disconnected</span>
            )}
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-afs-green' : 'hover:bg-white/10'}`}
          >
            <LayoutDashboard size={20} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'products' ? 'bg-afs-green' : 'hover:bg-white/10'}`}
          >
            <Package size={20} /> Products
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-afs-green' : 'hover:bg-white/10'}`}
          >
            <ShoppingBag size={20} /> Orders
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'users' ? 'bg-afs-green' : 'hover:bg-white/10'}`}
          >
            <Users size={20} /> Users
          </button>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 w-full px-4 py-2">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Loading Overlay */}
        {(isLoading || isActionLoading) && (
          <div className="absolute inset-0 bg-white/50 z-30 flex items-center justify-center">
            <Loader2 className="animate-spin text-afs-green" size={40} />
          </div>
        )}

        {/* Mobile Header */}
        <div className="md:hidden bg-[#1e2329] text-white p-4 flex justify-between items-center sticky top-0 z-20">
           <span className="font-bold">AFS Admin</span>
           <button onClick={handleLogout}><LogOut size={20} /></button>
        </div>
        <div className="md:hidden flex bg-white border-b overflow-x-auto">
           {['overview', 'products', 'orders', 'users'].map((tab) => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`flex-1 py-3 px-4 text-sm font-bold uppercase ${activeTab === tab ? 'text-afs-green border-b-2 border-afs-green' : 'text-gray-500'}`}
             >
               {tab}
             </button>
           ))}
        </div>

        <div className="p-6 md:p-10">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
                <div className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium flex items-center gap-2">
                   {isConnected ? <Wifi size={16} className="text-green-600"/> : <WifiOff size={16} className="text-red-600"/>}
                   Status: {isConnected ? 'Online' : 'Offline'}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm">Products</p>
                      <h3 className="text-3xl font-bold text-gray-900 mt-1">{products.length}</h3>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                      <Package size={24} />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm">Orders</p>
                      <h3 className="text-3xl font-bold text-gray-900 mt-1">{orders.length}</h3>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
                      <ShoppingBag size={24} />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm">Users</p>
                      <h3 className="text-3xl font-bold text-gray-900 mt-1">{approvedUsers.length}</h3>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg text-green-600">
                      <Users size={24} />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm">Pending</p>
                      <h3 className="text-3xl font-bold text-orange-600 mt-1">{pendingUsers.length}</h3>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
                      <CheckCircle size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS TAB */}
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
                <button 
                  onClick={openAddProductModal}
                  className="bg-afs-green text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <Plus size={20} /> Add Product
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Image</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Category</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Price</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg bg-gray-100" />
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                          <td className="px-6 py-4 text-gray-600">{product.category}</td>
                          <td className="px-6 py-4 font-bold text-gray-900">₹{product.price}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => openEditProductModal(product)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              >
                                <Edit size={18} />
                              </button>
                              <button 
                                onClick={(e) => handleDeleteProduct(e, product.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Manage Orders</h2>
                <button 
                  onClick={openAddOrderModal}
                  className="bg-afs-green text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <Plus size={20} /> Create Order
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Order ID</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">User Mobile</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-bold text-gray-900">{order.id}</td>
                          <td className="px-6 py-4 text-gray-600">{order.userMobile}</td>
                          <td className="px-6 py-4">
                            <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-gray-900">₹{order.totalAmount}</td>
                          <td className="px-6 py-4 text-gray-500 text-sm">{order.date}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => openEditOrderModal(order)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              >
                                <Edit size={18} />
                              </button>
                              <button 
                                onClick={(e) => handleDeleteOrder(e, order.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {orders.length === 0 && (
                        <tr><td colSpan={6} className="p-6 text-center text-gray-500">No orders found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* USERS TAB */}
          {activeTab === 'users' && (
            <div className="space-y-8">
              {/* Users content same as before... */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                   Pending Approvals 
                   <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">{pendingUsers.length}</span>
                </h3>
                {pendingUsers.length > 0 ? (
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {pendingUsers.map(user => (
                       <div key={user.id} className="bg-white p-4 rounded-xl shadow-sm border border-l-4 border-l-orange-500">
                         <div className="flex justify-between items-start mb-2">
                           <div>
                             <h4 className="font-bold text-gray-900">{user.name}</h4>
                             <p className="text-sm text-gray-500">{user.mobile}</p>
                           </div>
                           <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{user.date}</span>
                         </div>
                         <div className="flex gap-2">
                           <button onClick={() => handleApproveUser(user.id)} className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-bold">Approve</button>
                           <button onClick={() => handleRejectUser(user.id)} className="flex-1 bg-red-100 text-red-600 py-2 rounded-lg text-sm font-bold">Reject</button>
                         </div>
                       </div>
                     ))}
                   </div>
                ) : (
                  <div className="bg-white p-6 rounded-xl border border-dashed border-gray-300 text-center text-gray-500">No pending registrations.</div>
                )}
              </div>
              
               <div>
                 <h3 className="text-xl font-bold text-gray-800 mb-4">Registered Users</h3>
                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Name</th>
                          <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Mobile</th>
                          <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Crop</th>
                          <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Status</th>
                          <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Role</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {approvedUsers.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-3 font-medium text-gray-900">{user.name}</td>
                            <td className="px-6 py-3 text-gray-600">{user.mobile}</td>
                            <td className="px-6 py-3 text-gray-600">{user.crop}</td>
                            <td className="px-6 py-3"><span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">Active</span></td>
                            <td className="px-6 py-3">
                              <select 
                                value={user.role || 'farmer'} 
                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                className={`text-xs px-2 py-1 rounded-full font-bold border-none outline-none cursor-pointer ${
                                  user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                }`}
                              >
                                <option value="farmer">Farmer</option>
                                <option value="admin">Admin</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                 </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* PRODUCT MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-gray-800">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setShowProductModal(false)}><X size={24} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleProductSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div><label className="block text-sm font-medium mb-1">Name</label><input type="text" required value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full border rounded-lg p-2" /></div>
              <div className="grid grid-cols-2 gap-4">
                 <div><label className="block text-sm font-medium mb-1">Category</label><select required value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} className="w-full border rounded-lg p-2 bg-white"><option value="">Select</option><option value="Fertilizers">Fertilizers</option><option value="Pesticides">Pesticides</option></select></div>
                 <div><label className="block text-sm font-medium mb-1">Price</label><input type="number" required value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} className="w-full border rounded-lg p-2" /></div>
              </div>
              <div><label className="block text-sm font-medium mb-1">Image URL</label><input type="url" required value={productForm.image} onChange={e => setProductForm({...productForm, image: e.target.value})} className="w-full border rounded-lg p-2" /></div>
              <div><label className="block text-sm font-medium mb-1">Description</label><textarea required value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} className="w-full border rounded-lg p-2" /></div>
              <div><label className="block text-sm font-medium mb-1">Badge</label><input type="text" value={productForm.badge} onChange={e => setProductForm({...productForm, badge: e.target.value})} className="w-full border rounded-lg p-2" /></div>
              <div className="pt-4 flex gap-3"><button type="button" onClick={() => setShowProductModal(false)} className="flex-1 py-3 bg-gray-100 rounded-xl">Cancel</button><button type="submit" className="flex-1 py-3 bg-afs-green text-white rounded-xl">Save</button></div>
            </form>
          </div>
        </div>
      )}

      {/* ORDER MODAL */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-gray-800">{editingOrder ? 'Edit Order' : 'Create New Order'}</h3>
              <button onClick={() => setShowOrderModal(false)}><X size={24} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleOrderSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User Mobile</label>
                <input type="tel" required value={orderForm.userMobile} onChange={e => setOrderForm({...orderForm, userMobile: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-afs-green outline-none" placeholder="e.g. 9363734905" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Items (Description)</label>
                <textarea required value={orderForm.items} onChange={e => setOrderForm({...orderForm, items: e.target.value})} rows={3} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-afs-green outline-none" placeholder="e.g. 2x Neem Oil, 1x Urea" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount (₹)</label>
                   <input type="number" required value={orderForm.totalAmount} onChange={e => setOrderForm({...orderForm, totalAmount: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-afs-green outline-none" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                   <select value={orderForm.status} onChange={e => setOrderForm({...orderForm, status: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-afs-green outline-none bg-white">
                     <option value="Processing">Processing</option>
                     <option value="Shipped">Shipped</option>
                     <option value="Delivered">Delivered</option>
                   </select>
                </div>
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Date (DD/MM/YYYY)</label>
                 <input type="text" required value={orderForm.date} onChange={e => setOrderForm({...orderForm, date: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-afs-green outline-none" placeholder="25/12/2023" />
              </div>
              <div className="pt-4 flex gap-3">
                 <button type="button" onClick={() => setShowOrderModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200">Cancel</button>
                 <button type="submit" className="flex-1 py-3 bg-afs-green text-white font-bold rounded-xl hover:bg-green-700">Save Order</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
