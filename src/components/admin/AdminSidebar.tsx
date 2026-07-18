"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAdminAuth } from "./AdminAuthContext";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export type AdminView = "dashboard" | "products" | "add-product" | "edit-product" | "documents";

type SidebarProps = {
  activeView: AdminView;
  onNavigate: (view: AdminView) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
};

const navItems: { id: AdminView; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "add-product", label: "Add Product", icon: PlusCircle },
  { id: "documents", label: "Documents", icon: FileText },
];

export default function AdminSidebar({
  activeView,
  onNavigate,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  const { logout } = useAdminAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-screen bg-white dark:bg-[#0b0d12] border-r border-gray-200 dark:border-white/[0.06] flex flex-col z-40 overflow-hidden shadow-sm dark:shadow-none"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-gray-200 dark:border-white/[0.06] shrink-0">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2.5 min-w-0"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f58025] to-[#e86311] flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              Afraz<span className="text-[#f58025]">Apparel</span>
            </span>
          </motion.div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f58025] to-[#e86311] flex items-center justify-center mx-auto shrink-0">
            <span className="text-white font-bold text-sm">A</span>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeView === item.id || (item.id === "products" && activeView === "edit-product");
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                isActive
                  ? "bg-[#f58025]/10 text-[#f58025]"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.04]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="admin-nav-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#f58025] rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <Icon className={`w-5 h-5 shrink-0 ${collapsed ? "mx-auto" : ""}`} />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="truncate"
                >
                  {item.label}
                </motion.span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer actions */}
      <div className="p-2 border-t border-gray-200 dark:border-white/[0.06] space-y-1 shrink-0">
        {/* Theme toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.04] transition-all duration-200"
          >
            <div className={`shrink-0 ${collapsed ? "mx-auto" : ""}`}>
              {theme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              )}
            </div>
            {!collapsed && <span className="truncate">Theme</span>}
          </button>
        )}

        {/* Collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.04] transition-all duration-200"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 mx-auto" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 shrink-0" />
              <span className="truncate">Collapse</span>
            </>
          )}
        </button>
        {/* Logout */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut className={`w-5 h-5 shrink-0 ${collapsed ? "mx-auto" : ""}`} />
          {!collapsed && <span className="truncate">Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}
