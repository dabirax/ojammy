import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  variant?: "default" | "primary" | "success";
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  variant = "default",
}: StatCardProps) {
  const iconBg = {
    default: "bg-accent text-foreground",
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
  }[variant];

  return (
    <div className="bg-card rounded-xl border border-border p-5 card-shadow hover:card-shadow-hover transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          {trend && (
            <p className="text-xs text-success font-medium mt-1">{trend}</p>
          )}
        </div>
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}
        >
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}
