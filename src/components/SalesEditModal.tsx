import { useState } from "react";
import { X } from "lucide-react";
import type { Sale } from "@/data/types";

interface SaleEditModalProps {
  open: boolean;
  sale: Sale | null;
  onClose: () => void;
  onSave: (
    id: string,
    updates: { totalAmount: number; totalProfit: number },
  ) => void;
}

export default function SaleEditModal({
  open,
  sale,
  onClose,
  onSave,
}: SaleEditModalProps) {
  const [items, setItems] = useState<
    { productName: string; quantity: number; priceAtSale: number }[]
  >([]);

  // Sync when sale changes
  useState(() => {
    if (sale) {
      setItems(
        sale.items.map((i) => ({
          productName: i.productName,
          quantity: i.quantity,
          priceAtSale: i.priceAtSale,
        })),
      );
    }
  });

  if (!open || !sale) return null;

  const currentItems =
    items.length > 0
      ? items
      : sale.items.map((i) => ({
          productName: i.productName,
          quantity: i.quantity,
          priceAtSale: i.priceAtSale,
        }));

  const handleItemChange = (
    index: number,
    field: "quantity" | "priceAtSale",
    value: number,
  ) => {
    const updated = [...currentItems];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const totalAmount = currentItems.reduce(
    (sum, i) => sum + i.quantity * i.priceAtSale,
    0,
  );

  const handleSave = () => {
    onSave(sale.id, {
      totalAmount,
      totalProfit: totalAmount - sale.totalAmount + sale.totalProfit, // approximate
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card rounded-xl border border-border card-shadow p-6 w-full max-w-lg mx-4 animate-fade-in">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-foreground">Edit Sale</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>
        <div className="space-y-3 mb-5">
          {currentItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="flex-1 text-sm font-medium text-foreground truncate">
                {item.productName}
              </span>
              <div className="w-20">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(i, "quantity", Number(e.target.value))
                  }
                  className="w-full px-2 py-1.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring text-center"
                />
              </div>
              <div className="w-24">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.priceAtSale}
                  onChange={(e) =>
                    handleItemChange(i, "priceAtSale", Number(e.target.value))
                  }
                  className="w-full px-2 py-1.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring text-right"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mb-4 px-1">
          <span className="text-sm text-muted-foreground">New Total</span>
          <span className="text-lg font-bold text-foreground">
            ${totalAmount.toFixed(2)}
          </span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
