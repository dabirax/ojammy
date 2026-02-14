import { BarChart3 } from "lucide-react";

export default function Reports() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-card rounded-xl border border-border card-shadow p-12 text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <BarChart3 size={28} className="text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Reports Coming Soon
        </h2>
        <p className="text-sm text-muted-foreground">
          Advanced analytics and reporting features are being developed. Stay
          tuned for sales trends, inventory insights, and profit analysis.
        </p>
      </div>
    </div>
  );
}
