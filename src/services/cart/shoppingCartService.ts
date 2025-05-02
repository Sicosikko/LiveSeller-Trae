
import { supabase } from '@/services/auth/authService';
import { Product } from '../catalog/productService';

export interface CartItem {
  id: string;
  productId: string;
  product?: Product;
  quantity: number;
  price: number;
  cartId: string;
}

export interface ShoppingCart {
  id: string;
  customerId: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'abandoned' | 'completed';
}

class ShoppingCartService {
  // Get active cart for a customer
  async getActiveCart(customerId: string): Promise<ShoppingCart | null> {
    try {
      // Get the active cart
      let { data: cart, error } = await supabase
        .from('shopping_carts')
        .select('*')
        .eq('customerId', customerId)
        .eq('status', 'active')
        .single();
      
      if (error) {
        // If no active cart, create a new one
        if (error.code === 'PGRST116') {
          return await this.createCart(customerId);
        }
        throw error;
      }
      
      // Get cart items
      const { data: items, error: itemsError } = await supabase
        .from('cart_items')
        .select(`
          *,
          product:productId (*)
        `)
        .eq('cartId', cart.id);
      
      if (itemsError) throw itemsError;
      
      return {
        ...cart,
        items: items || [],
        total: this.calculateTotal(items || [])
      };
    } catch (error) {
      console.error('Error fetching active cart:', error);
      return null;
    }
  }
  
  // Create a new cart
  async createCart(customerId: string): Promise<ShoppingCart | null> {
    try {
      const now = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('shopping_carts')
        .insert({
          customerId,
          status: 'active',
          createdAt: now,
          updatedAt: now
        })
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        ...data,
        items: [],
        total: 0
      };
    } catch (error) {
      console.error('Error creating new cart:', error);
      return null;
    }
  }
  
  // Add item to cart
  async addToCart(cartId: string, productId: string, quantity: number, price: number): Promise<CartItem | null> {
    try {
      // Check if item already exists in cart
      const { data: existingItem, error: fetchError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('cartId', cartId)
        .eq('productId', productId)
        .single();
      
      if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;
      
      let result;
      
      if (existingItem) {
        // Update existing item
        const newQuantity = existingItem.quantity + quantity;
        
        const { data, error } = await supabase
          .from('cart_items')
          .update({
            quantity: newQuantity,
            price: price
          })
          .eq('id', existingItem.id)
          .select()
          .single();
        
        if (error) throw error;
        result = data;
      } else {
        // Add new item
        const { data, error } = await supabase
          .from('cart_items')
          .insert({
            cartId,
            productId,
            quantity,
            price
          })
          .select()
          .single();
        
        if (error) throw error;
        result = data;
      }
      
      // Update cart's updated_at timestamp
      await supabase
        .from('shopping_carts')
        .update({ updatedAt: new Date().toISOString() })
        .eq('id', cartId);
      
      return result;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      return null;
    }
  }
  
  // Remove item from cart
  async removeFromCart(cartItemId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId);
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      return false;
    }
  }
  
  // Update item quantity
  async updateItemQuantity(cartItemId: string, quantity: number): Promise<CartItem | null> {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', cartItemId)
        .select()
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      return null;
    }
  }
  
  // Clear cart
  async clearCart(cartId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('cartId', cartId);
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
  }
  
  // Complete cart (checkout)
  async completeCart(cartId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('shopping_carts')
        .update({
          status: 'completed',
          updatedAt: new Date().toISOString()
        })
        .eq('id', cartId);
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error completing cart:', error);
      return false;
    }
  }
  
  // Helper method to calculate total
  private calculateTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}

export const shoppingCartService = new ShoppingCartService();
