// Type definitions for Cantate Kitchen

export interface Product {
  id: string;
  name: string;
  description: string;
  price?: number;
  image: string;
  category: 'main' | 'side' | 'special';
  available: boolean;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  deliveryMethod: 'pickup' | 'delivery';
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order extends CustomerInfo {
  items: OrderItem[];
  specialInstructions?: string;
  totalAmount?: number;
  orderDate: Date;
}

export interface OrderFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  deliveryMethod: 'pickup' | 'delivery';
  items: {
    [key: string]: number; // productId: quantity
  };
  specialInstructions?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface EmailData {
  to: string;
  subject: string;
  html: string;
}
