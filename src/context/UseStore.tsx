import { useContext, createContext } from "react"
import type { Product, Sale, CartItem } from "@/data/types";

interface StoreContextType {
  products: Product[];
  sales: Sale[];
  cart: CartItem[];
  addProduct: (product: Omit<Product, "id" | "createdAt">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addToCart: (productId: string, quantity: number) => string | null;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  checkout: () => string | null;
  updateSale: (id: string, updates: Partial<Sale>) => void;
  deleteSale: (id: string) => void;
  cartTotal: number;
  cartProfit: number;
}


export const StoreContext = createContext<StoreContextType | undefined>(undefined);


export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
