
import { Product, User, WishlistItem, Order } from '../types';
import { 
  fetchDatabase, 
  apiAddProduct, 
  apiUpdateProduct, 
  apiDeleteProduct,
  apiRegisterUser,
  apiApproveUser,
  apiRejectUser,
  apiLogin,
  apiGetWishlist,
  apiToggleWishlist,
  apiTrackOrder,
  apiCheckHealth,
  apiAddOrder,
  apiUpdateOrder,
  apiDeleteOrder,
  apiUpdateUserRole
} from './apiService';

// In-Memory Cache
let cachedProducts: Product[] = [];
let cachedUsers: User[] = [];
let cachedOrders: Order[] = [];
let cachedWishlist: string[] = []; // Product IDs

// Check Connection Status
export const checkSystemHealth = async (): Promise<boolean> => {
  const response = await apiCheckHealth();
  return response.result === 'success';
};

// Initialize: Load data from Google Sheet
export const loadDatabase = async (): Promise<boolean> => {
  const response = await fetchDatabase();
  if (response.result === 'success' && response.data) {
    cachedProducts = response.data.products || [];
    cachedUsers = response.data.users || [];
    cachedOrders = response.data.orders || [];
    return true;
  }
  return false;
};

// --- AUTH OPERATIONS ---
export const verifyLogin = async (mobile: string): Promise<{ success: boolean; user?: User }> => {
  const response = await apiLogin(mobile);
  if (response.result === 'success' && response.data.status === 'success') {
    return { success: true, user: response.data.user };
  }
  return { success: false };
};

// --- PRODUCT OPERATIONS ---

export const getProducts = (): Product[] => {
  return [...cachedProducts];
};

export const addProduct = async (product: Omit<Product, 'id'>) => {
  // Optimistic Update
  const tempId = 'temp_' + Date.now();
  const newProduct = { ...product, id: tempId };
  cachedProducts.unshift(newProduct);

  const response = await apiAddProduct(product);
  if (response.result === 'success') {
    // Update with real ID from server or refresh
    await loadDatabase(); 
  } else {
    // Revert on failure
    cachedProducts = cachedProducts.filter(p => p.id !== tempId);
    throw new Error('Failed to save product');
  }
  return newProduct;
};

export const updateProduct = async (product: Product) => {
  // Optimistic Update
  const index = cachedProducts.findIndex(p => p.id === product.id);
  const oldProduct = cachedProducts[index];
  if (index !== -1) {
    cachedProducts[index] = product;
  }

  const response = await apiUpdateProduct(product);
  if (response.result !== 'success') {
     // Revert
     if (index !== -1) cachedProducts[index] = oldProduct;
     throw new Error('Failed to update product');
  }
};

export const deleteProduct = async (id: string) => {
  // Optimistic Update
  const oldList = [...cachedProducts];
  cachedProducts = cachedProducts.filter(p => p.id !== id);

  const response = await apiDeleteProduct(id);
  if (response.result !== 'success') {
    cachedProducts = oldList;
    throw new Error('Failed to delete product');
  }
};

// --- USER OPERATIONS ---

export const getPendingUsers = (): User[] => {
  return cachedUsers.filter(u => u.status === 'pending');
};

export const getApprovedUsers = (): User[] => {
  return cachedUsers.filter(u => u.status === 'approved');
};

export const registerUser = async (user: Omit<User, 'id' | 'status' | 'date'>) => {
  const response = await apiRegisterUser(user);
  if (response.result !== 'success') {
    throw new Error('Registration failed');
  }
  await loadDatabase(); 
};

export const approveUser = async (id: string) => {
  const user = cachedUsers.find(u => u.id === id);
  if (user) user.status = 'approved';

  const response = await apiApproveUser(id);
  if (response.result !== 'success') {
     if (user) user.status = 'pending'; 
     throw new Error('Failed to approve user');
  }
};

export const updateUserRole = async (id: string, role: 'admin' | 'farmer') => {
  const user = cachedUsers.find(u => u.id === id);
  const oldRole = user?.role;
  if (user) user.role = role;

  const response = await apiUpdateUserRole(id, role);
  if (response.result !== 'success') {
    if (user && oldRole) user.role = oldRole;
    throw new Error('Failed to update role');
  }
};

export const rejectUser = async (id: string) => {
  const oldList = [...cachedUsers];
  cachedUsers = cachedUsers.filter(u => u.id !== id);

  const response = await apiRejectUser(id);
  if (response.result !== 'success') {
    cachedUsers = oldList;
    throw new Error('Failed to reject user');
  }
};

// --- WISHLIST OPERATIONS ---
export const fetchUserWishlist = async (mobile: string) => {
  const response = await apiGetWishlist(mobile);
  if (response.result === 'success' && response.data.items) {
    cachedWishlist = response.data.items.map((i: WishlistItem) => i.productId);
  }
  return cachedWishlist;
};

export const isInWishlist = (productId: string) => {
  return cachedWishlist.includes(productId);
};

export const toggleWishlist = async (mobile: string, productId: string) => {
  const exists = cachedWishlist.includes(productId);
  if (exists) {
    cachedWishlist = cachedWishlist.filter(id => id !== productId);
  } else {
    cachedWishlist.push(productId);
  }
  
  await apiToggleWishlist(mobile, productId, !exists);
  return !exists;
};

// --- TRACKING & ORDER OPERATIONS ---
export const trackOrder = async (orderId: string) => {
  // Force fetch from API to get latest
  const response = await apiTrackOrder(orderId);
  if (response.result === 'success' && response.data.found) {
    return response.data.order;
  }
  return null;
};

export const getOrders = (): Order[] => {
  return [...cachedOrders];
};

export const addOrder = async (order: Omit<Order, 'id'>) => {
  const response = await apiAddOrder(order);
  if (response.result === 'success') {
    await loadDatabase(); // Refresh to get ID
  } else {
    throw new Error('Failed to add order');
  }
};

export const updateOrder = async (order: Order) => {
  const index = cachedOrders.findIndex(o => o.id === order.id);
  const oldOrder = cachedOrders[index];
  if (index !== -1) cachedOrders[index] = order;

  const response = await apiUpdateOrder(order);
  if (response.result !== 'success') {
    if (index !== -1) cachedOrders[index] = oldOrder;
    throw new Error('Failed to update order');
  }
};

export const deleteOrder = async (id: string) => {
  const oldList = [...cachedOrders];
  cachedOrders = cachedOrders.filter(o => o.id !== id);

  const response = await apiDeleteOrder(id);
  if (response.result !== 'success') {
    cachedOrders = oldList;
    throw new Error('Failed to delete order');
  }
};
