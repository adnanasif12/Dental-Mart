/**
 * Cart Vendor - Handles cart operations
 */

const API_BASE_URL = import.meta.env.VITE_API_URL?.trim() ||
  (import.meta.env.MODE === 'development' ? '/api' : 'https://dental-mart-backend.vercel.app/api');

class CartVendor {
  static async getCart() {
    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  }

  static async addToCart(productId, quantity) {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  static async removeFromCart(productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  }
}

export default CartVendor;
