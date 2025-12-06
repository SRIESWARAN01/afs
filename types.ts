
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  badge?: string;
}

export interface User {
  id: string;
  name: string;
  mobile: string;
  address: string;
  crop: string;
  date: string;
  status: 'pending' | 'approved';
  role?: 'admin' | 'farmer';
}

export interface Order {
  id: string;
  userMobile: string;
  items: string; // JSON string or text description
  totalAmount: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  date: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  image: string;
}

export interface ShopCategory {
  id: string;
  name: string;
  image: string;
}

export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  videoUrl: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: any; // Lucide icon type
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string; // base64
  timestamp: Date;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export interface WishlistItem {
  id: string;
  userMobile: string;
  productId: string;
}

export interface ApiResponse {
  result: 'success' | 'error';
  data?: any;
  error?: any;
}