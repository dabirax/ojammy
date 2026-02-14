import { useState} from "react";
import { X } from "lucide-react";
import type { Product } from "@/data/types";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    costPrice: number;
    sellingPrice: number;
    quantity: number;
    lowStockThreshold: number;
  }) => void;
  product?: Product | null;
}

export default function ProductModal({
  open,
  onClose,
  onSave,
  product,
}: ProductModalProps) {

  const [errors, setErrors] = useState<Record<string, string>>({});
const getInitialForm = (product?: Product) => ({
  name: product?.name ?? "",
  costPrice: product ? String(product.costPrice) : "",
  sellingPrice: product ? String(product.sellingPrice) : "",
  quantity: product ? String(product.quantity) : "",
  threshold: product ? String(product.lowStockThreshold) : "5",
});

    const [form, setForm] = useState(() => getInitialForm(product ?? undefined
));


const validate = () => {
  const errs: Record<string, string> = {};

  if (!form.name.trim()) errs.name = "Required";
  if (!form.costPrice || Number(form.costPrice) < 0)
    errs.costPrice = "Must be ≥ 0";
  if (!form.sellingPrice || Number(form.sellingPrice) < 0)
    errs.sellingPrice = "Must be ≥ 0";
  if (!form.quantity || Number(form.quantity) < 0)
    errs.quantity = "Must be ≥ 0";

  setErrors(errs);
  return Object.keys(errs).length === 0;
};


 const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault();
   if (!validate()) return;

   onSave({
     name: form.name.trim(),
     costPrice: Number(form.costPrice),
     sellingPrice: Number(form.sellingPrice),
     quantity: Number(form.quantity),
     lowStockThreshold: Number(form.threshold),
   });

   onClose();
 };


  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card rounded-xl border border-border card-shadow p-6 w-full max-w-md mx-4 animate-fade-in">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-foreground">
            {product ? "Edit Product" : "Add Product"}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Product Name
            </label>
            <input
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter product name"
            />

            {errors.name && (
              <p className="text-destructive text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Cost Price
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.costPrice}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, costPrice: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="0.00"
              />
              {errors.costPrice && (
                <p className="text-destructive text-xs mt-1">
                  {errors.costPrice}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Selling Price
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.sellingPrice}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, sellingPrice: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="0.00"
              />
              {errors.sellingPrice && (
                <p className="text-destructive text-xs mt-1">
                  {errors.sellingPrice}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="0"
                value={form.quantity}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, quantity: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="0"
              />
              {errors.quantity && (
                <p className="text-destructive text-xs mt-1">
                  {errors.quantity}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Low Stock Threshold
              </label>
              <input
                type="number"
                min="0"
                value={form.threshold}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, threshold: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="5"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {product ? "Update" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
