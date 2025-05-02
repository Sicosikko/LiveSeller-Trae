
import { supabase } from '@/services/auth/authService';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
}

class ProductService {
  // Fetch all products
  async getProducts(): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');
        
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }
  
  // Fetch product by ID
  async getProductById(id: string): Promise<Product | null> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      return null;
    }
  }
  
  // Fetch products by category
  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', categoryId)
        .order('name');
        
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error(`Error fetching products in category ${categoryId}:`, error);
      return [];
    }
  }
  
  // Create or update product
  async saveProduct(product: Partial<Product>): Promise<Product | null> {
    try {
      const isNewProduct = !product.id;
      const now = new Date().toISOString();
      
      const productData = {
        ...product,
        updatedAt: now,
        ...(isNewProduct && { createdAt: now })
      };
      
      const { data, error } = await supabase
        .from('products')
        .upsert(productData)
        .select()
        .single();
        
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error saving product:', error);
      return null;
    }
  }
  
  // Delete product
  async deleteProduct(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      return false;
    }
  }
  
  // Get product categories
  async getCategories(): Promise<ProductCategory[]> {
    try {
      const { data, error } = await supabase
        .from('product_categories')
        .select('*')
        .order('name');
        
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Error fetching product categories:', error);
      return [];
    }
  }
  
  // Create product category
  async saveCategory(category: Partial<ProductCategory>): Promise<ProductCategory | null> {
    try {
      const { data, error } = await supabase
        .from('product_categories')
        .upsert(category)
        .select()
        .single();
        
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error saving product category:', error);
      return null;
    }
  }
}

export const productService = new ProductService();
