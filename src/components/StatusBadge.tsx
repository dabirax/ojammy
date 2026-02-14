interface StatusBadgeProps {
  status: "ok" | "low" | "out";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    ok: "bg-success/10 text-success",
    low: "bg-warning/10 text-warning",
    out: "bg-destructive/10 text-destructive",
  }[status];

  const label = {
    ok: "In Stock",
    low: "Low Stock",
    out: "Out of Stock",
  }[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles}`}
    >
      {label}
    </span>
  );
}
