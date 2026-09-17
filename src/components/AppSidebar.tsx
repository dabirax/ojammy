import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Warehouse,
  BarChart3,
  X,
} from "lucide-react";

const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Products", path: "/products", icon: Package },
  { title: "Sales", path: "/sales", icon: ShoppingCart },
  { title: "Stock", path: "/stock", icon: Warehouse },
  { title: "Reports", path: "/reports", icon: BarChart3 },
];

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AppSidebar({ open, onClose }: AppSidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20  backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[.5rem] bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm ">
                O
              </span>
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">
              OJAMY
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                
              >
                <item.icon size={18} />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="bg-accent rounded-lg p-3">
            <p className="text-xs font-medium text-foreground">OJAMY v1.0</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Inventory & Sales
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
