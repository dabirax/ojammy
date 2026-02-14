import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Package,
  Pencil,
  Trash2,
} from "lucide-react";
import { useStore } from "@/context/UseStore";
import StatCard from "@/components/StatCard";
import SaleEditModal from "@/components/SalesEditModal";
import ConfirmModal from "@/components/ConfirmModal";
import type { Sale } from "@/data/types";
import { toast } from "sonner";

export default function Dashboard() {
  const { sales, products, updateSale, deleteSale } = useStore();
  const [editSale, setEditSale] = useState<Sale | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
//   const [expandedSale, setExpandedSale] = useState<string | null>(null);

  const todayStr = new Date().toISOString().split("T")[0];
  const todaySales = sales.filter(
    (s) => s.createdAt.split("T")[0] === todayStr,
  );
  const totalSalesToday = todaySales.reduce((sum, s) => sum + s.totalAmount, 0);
  const totalProfitToday = todaySales.reduce(
    (sum, s) => sum + s.totalProfit,
    0,
  );
  const totalProducts = products.reduce((sum, p) => sum + p.quantity, 0);

  const recentSales = sales.slice(0, 5);

  const handleSaleUpdate = (
    id: string,
    updates: { totalAmount: number; totalProfit: number },
  ) => {
    updateSale(id, updates);
    toast.success("Sale updated");
  };

  const handleSaleDelete = () => {
    if (deleteId) {
      deleteSale(deleteId);
      toast.success("Sale deleted");
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total Sales Today"
          value={`$${totalSalesToday.toFixed(2)}`}
          icon={DollarSign}
          variant="primary"
        />
        <StatCard
          title="Total Profit Today"
          value={`$${totalProfitToday.toFixed(2)}`}
          icon={TrendingUp}
          variant="success"
        />
        <StatCard
          title="Products in Stock"
          value={String(totalProducts)}
          icon={Package}
        />
      </div>

      <div className="bg-card rounded-xl border border-border card-shadow">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Recent Sales</h2>
        </div>
        {recentSales.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">
            No sales recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                    Items
                  </th>
                  <th className="text-right px-5 py-3 font-medium text-muted-foreground">
                    Total
                  </th>
                  <th className="text-right px-5 py-3 font-medium text-muted-foreground">
                    Profit
                  </th>
                  <th className="text-right px-5 py-3 font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map((sale) => (
                  <tr
                    key={sale.id}
                    className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors"
                  >
                    <td className="px-5 py-3 text-foreground">
                      {new Date(sale.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {sale.items
                        .map((i) => `${i.productName} ×${i.quantity}`)
                        .join(", ")}
                    </td>
                    <td className="px-5 py-3 text-right font-medium text-foreground">
                      ${sale.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-5 py-3 text-right font-medium text-success">
                      ${sale.totalProfit.toFixed(2)}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="inline-flex gap-1">
                        <button
                          onClick={() => setEditSale(sale)}
                          className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteId(sale.id)}
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

      <SaleEditModal
        open={!!editSale}
        sale={editSale}
        onClose={() => setEditSale(null)}
        onSave={handleSaleUpdate}
      />
      <ConfirmModal
        open={!!deleteId}
        title="Delete Sale"
        message="Are you sure you want to delete this sale record? This action cannot be undone."
        onConfirm={handleSaleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
