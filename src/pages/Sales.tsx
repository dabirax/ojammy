import { useState } from "react";
import { ShoppingCart, Trash2, CreditCard } from "lucide-react";
import { useStore } from "@/context/UseStore";
import { toast } from "sonner";

export default function Sales() {
  const {
    products,
    cart,
    addToCart,
    removeFromCart,
    checkout,
    cartTotal,
    cartProfit,
  } = useStore();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("1");

  const availableProducts = products.filter((p) => p.quantity > 0);

  const handleAddToCart = () => {
    if (!selectedProduct) {
      toast.error("Select a product");
      return;
    }
    const qty = Number(quantity);
    if (qty < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }
    const error = addToCart(selectedProduct, qty);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Added to cart");
    setSelectedProduct("");
    setQuantity("1");
  };

  const handleCheckout = () => {
    const error = checkout();
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Sale completed successfully!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Add to cart */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-card rounded-xl border border-border card-shadow p-5">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <ShoppingCart size={18} /> Add to Cart
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Product
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select product...</option>
                {availableProducts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (${p.sellingPrice} · {p.quantity} left)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Cart */}
      <div className="lg:col-span-2">
        <div className="bg-card rounded-xl border border-border card-shadow">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-foreground">
              Cart ({cart.length} items)
            </h2>
          </div>
          {cart.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground text-sm">
              Cart is empty. Add products to get started.
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                        Product
                      </th>
                      <th className="text-right px-5 py-3 font-medium text-muted-foreground">
                        Qty
                      </th>
                      <th className="text-right px-5 py-3 font-medium text-muted-foreground">
                        Price
                      </th>
                      <th className="text-right px-5 py-3 font-medium text-muted-foreground">
                        Subtotal
                      </th>
                      <th className="text-right px-5 py-3 font-medium text-muted-foreground"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr
                        key={item.productId}
                        className="border-b border-border last:border-0"
                      >
                        <td className="px-5 py-3 font-medium text-foreground">
                          {item.productName}
                        </td>
                        <td className="px-5 py-3 text-right text-foreground">
                          {item.quantity}
                        </td>
                        <td className="px-5 py-3 text-right text-muted-foreground">
                          ${item.unitPrice.toFixed(2)}
                        </td>
                        <td className="px-5 py-3 text-right font-medium text-foreground">
                          ${item.subtotal.toFixed(2)}
                        </td>
                        <td className="px-5 py-3 text-right">
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-5 border-t border-border space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Estimated Profit
                  </span>
                  <span className="font-medium text-success">
                    ${cartProfit.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-foreground">
                    Total
                  </span>
                  <span className="text-lg font-bold text-foreground">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                >
                  <CreditCard size={18} /> Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
