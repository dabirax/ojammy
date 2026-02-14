import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useStore } from "@/context/UseStore";
import StatusBadge from "@/components/StatusBadge";
import ProductModal from "@/components/ProductModal";
import ConfirmModal from "@/components/ConfirmModal";
import type { Product } from "@/data/types";
import { toast } from "sonner";

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const getStockStatus = (p: Product) => {
    if (p.quantity === 0) return "out" as const;
    if (p.quantity <= p.lowStockThreshold) return "low" as const;
    return "ok" as const;
  };

  const handleSave = (data: {
    name: string;
    costPrice: number;
    sellingPrice: number;
    quantity: number;
    lowStockThreshold: number;
  }) => {
    if (editProduct) {
      updateProduct(editProduct.id, data);
      toast.success("Product updated");
    } else {
      addProduct(data);
      toast.success("Product added");
    }
    setEditProduct(null);
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteProduct(deleteId);
      toast.success("Product deleted");
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {products.length} products
        </p>
        <button
          onClick={() => {
            setEditProduct(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border card-shadow overflow-hidden">
        {products.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">
              No products yet. Add your first product to get started.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-accent/50">
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                    Product
                  </th>
                  <th className="text-right px-5 py-3 font-medium text-muted-foreground">
                    Cost
                  </th>
                  <th className="text-right px-5 py-3 font-medium text-muted-foreground">
                    Selling
                  </th>
                  <th className="text-right px-5 py-3 font-medium text-muted-foreground">
                    Qty
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-right px-5 py-3 font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors"
                  >
                    <td className="px-5 py-3 font-medium text-foreground">
                      {p.name}
                    </td>
                    <td className="px-5 py-3 text-right text-muted-foreground">
                      ${p.costPrice.toFixed(2)}
                    </td>
                    <td className="px-5 py-3 text-right text-foreground">
                      ${p.sellingPrice.toFixed(2)}
                    </td>
                    <td className="px-5 py-3 text-right text-foreground">
                      {p.quantity}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={getStockStatus(p)} />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="inline-flex gap-1">
                        <button
                          onClick={() => {
                            setEditProduct(p);
                            setModalOpen(true);
                          }}
                          className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteId(p.id)}
                          className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ProductModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditProduct(null);
        }}
        onSave={handleSave}
        product={editProduct}
      />
      <ConfirmModal
        open={!!deleteId}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
