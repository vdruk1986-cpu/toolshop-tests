import { Product } from './product';

export interface CartItem {
    id: string;
    quantity: number;
    discount_percentage: number | null;
    cart_id: string;
    product_id: string;
    product: Product;
}

export interface Cart {
    id: string;
    additional_discount_percentage: number | null;
    cart_items: CartItem[];
}
