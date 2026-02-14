import { useStore } from "@/context/UseStore";
import StatusBadge from "@/components/StatusBadge";
import type { Product } from "@/data/types";

export default function Stock() {
  const { products } = useStore();

  const getStockStatus = (p: Product) => {
    if (p.quantity === 0) return "out" as const;
    if (p.quantity <= p.lowStockThreshold) return "low" as const;
    return "ok" as const;
  };

  const sorted = [...products].sort((a, b) => a.quantity - b.quantity);

  return (
    <div className="bg-card rounded-xl border border-border card-shadow overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="font-semibold text-foreground">Stock Overview</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          {products.length} products tracked
        </p>
      </div>
      {products.length === 0 ? (
        <div className="p-12 text-center text-muted-foreground text-sm">
          No products to display.
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
                  Quantity
                </th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors"
                >
                  <td className="px-5 py-3 font-medium text-foreground">
                    {p.name}
                  </td>
                  <td className="px-5 py-3 text-right text-foreground">
                    {p.quantity}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={getStockStatus(p)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
