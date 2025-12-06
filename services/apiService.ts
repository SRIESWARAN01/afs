
import { GOOGLE_SHEET_API_URL } from '../constants';
import { ApiResponse } from '../types';

/**
 * Helper to perform POST requests to Google Apps Script.
 */
const apiCall = async (action: string, payload: any = {}): Promise<ApiResponse> => {
  if (!GOOGLE_SHEET_API_URL) {
    console.error("API URL is missing");
    return { result: 'error', error: 'API URL missing' };
  }

  try {
    const body = JSON.stringify({ action, ...payload });
    
    const response = await fetch(GOOGLE_SHEET_API_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', 
      },
      body: body
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Error (${action}):`, error);
    return { result: 'error', error: String(error) };
  }
};

// Check Health with GET to avoid CORS preflight issues on simple checks
export const apiCheckHealth = async () => {
  if (!GOOGLE_SHEET_API_URL) return { result: 'error', error: 'URL Missing' };
  try {
    const response = await fetch(GOOGLE_SHEET_API_URL);
    const data = await response.json();
    return data;
  } catch (e) {
    return { result: 'error', error: String(e) };
  }
};

export const fetchDatabase = async () => {
  return apiCall('GET_ALL');
};

export const apiLogin = async (mobile: string) => {
  return apiCall('LOGIN', { mobile });
};

export const apiAddProduct = async (product: any) => {
  return apiCall('ADD_PRODUCT', { data: product });
};

export const apiUpdateProduct = async (product: any) => {
  return apiCall('UPDATE_PRODUCT', { data: product });
};

export const apiDeleteProduct = async (id: string) => {
  return apiCall('DELETE_PRODUCT', { id: id }); 
};

export const apiRegisterUser = async (user: any) => {
  return apiCall('REGISTER_USER', { data: user });
};

export const apiApproveUser = async (id: string) => {
  return apiCall('APPROVE_USER', { id });
};

export const apiUpdateUserRole = async (id: string, role: string) => {
  return apiCall('UPDATE_USER_ROLE', { id, role });
};

export const apiRejectUser = async (id: string) => {
  return apiCall('REJECT_USER', { id });
};

export const apiGetWishlist = async (mobile: string) => {
  return apiCall('GET_WISHLIST', { mobile });
};

export const apiToggleWishlist = async (mobile: string, productId: string, isAdding: boolean) => {
  const action = isAdding ? 'ADD_WISHLIST' : 'REMOVE_WISHLIST';
  return apiCall(action, { mobile, productId });
};

export const apiTrackOrder = async (orderId: string) => {
  return apiCall('GET_ORDER_STATUS', { orderId });
};

// --- ORDER MANAGEMENT API ---
export const apiAddOrder = async (order: any) => {
  return apiCall('ADD_ORDER', { data: order });
};

export const apiUpdateOrder = async (order: any) => {
  return apiCall('UPDATE_ORDER', { data: order });
};

export const apiDeleteOrder = async (id: string) => {
  return apiCall('DELETE_ORDER', { id });
};
