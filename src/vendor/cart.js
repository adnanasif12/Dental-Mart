/**
 * Cart Vendor - Handles cart operations
 */

class CartVendor {
  static async getCart() {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3000/api'}/cart`, {
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
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3000/api'}/cart/add`, {
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
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3000/api'}/cart/remove/${productId}`, {
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
