import { useState } from "react";
import type { ReactNode } from "react";
import type { Product, Sale, CartItem } from "@/data/types";
import { mockProducts, mockSales } from "@/data/mockData";

import { StoreContext } from "./UseStore";


export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addProduct = (product: Omit<Product, "id" | "createdAt">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((c) => c.productId !== id));
  };

  const addToCart = (productId: string, quantity: number): string | null => {
    const product = products.find((p) => p.id === productId);
    if (!product) return "Product not found";

    const existingItem = cart.find((c) => c.productId === productId);
    const currentQty = existingItem ? existingItem.quantity : 0;

    if (currentQty + quantity > product.quantity) {
      return `Only ${product.quantity - currentQty} units available`;
    }

    if (existingItem) {
      setCart((prev) =>
        prev.map((c) =>
          c.productId === productId
            ? {
                ...c,
                quantity: c.quantity + quantity,
                subtotal: (c.quantity + quantity) * c.unitPrice,
              }
            : c,
        ),
      );
    } else {
      setCart((prev) => [
        ...prev,
        {
          productId,
          productName: product.name,
          quantity,
          unitPrice: product.sellingPrice,
          costPrice: product.costPrice,
          subtotal: quantity * product.sellingPrice,
        },
      ]);
    }
    return null;
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((c) => c.productId !== productId));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const cartProfit = cart.reduce(
    (sum, item) => sum + (item.unitPrice - item.costPrice) * item.quantity,
    0,
  );

  const checkout = (): string | null => {
    if (cart.length === 0) return "Cart is empty";

    for (const item of cart) {
      const product = products.find((p) => p.id === item.productId);
      if (!product || product.quantity < item.quantity) {
        return `Insufficient stock for ${item.productName}`;
      }
    }

    const sale: Sale = {
      id: Date.now().toString(),
      items: cart.map((c) => ({
        productId: c.productId,
        productName: c.productName,
        quantity: c.quantity,
        priceAtSale: c.unitPrice,
      })),
      totalAmount: cartTotal,
      totalProfit: cartProfit,
      createdAt: new Date().toISOString(),
    };

    setSales((prev) => [sale, ...prev]);

    setProducts((prev) =>
      prev.map((p) => {
        const cartItem = cart.find((c) => c.productId === p.id);
        if (cartItem) {
          return { ...p, quantity: p.quantity - cartItem.quantity };
        }
        return p;
      }),
    );

    clearCart();
    return null;
  };

  const updateSale = (id: string, updates: Partial<Sale>) => {
    setSales((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    );
  };

  const deleteSale = (id: string) => {
    setSales((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        sales,
        cart,
        addProduct,
        updateProduct,
        deleteProduct,
        addToCart,
        removeFromCart,
        clearCart,
        checkout,
        updateSale,
        deleteSale,
        cartTotal,
        cartProfit,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

