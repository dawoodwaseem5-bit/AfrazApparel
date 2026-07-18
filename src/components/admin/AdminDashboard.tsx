"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Package, Users, TrendingUp, BarChart3, Menu, FileText } from "lucide-react";
import AdminSidebar, { type AdminView } from "./AdminSidebar";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import DocumentsManager from "./DocumentsManager";
import { useAdminProducts } from "./AdminProductContext";
import { collectionLabels, type ProductCollection } from "@/data/products";

const collectionColors: Record<ProductCollection, string> = {
  men: "from-blue-500/20 to-blue-600/5 border-blue-500/20",
  ladies: "from-pink-500/20 to-pink-600/5 border-pink-500/20",
  boys: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20",
  girls: "from-purple-500/20 to-purple-600/5 border-purple-500/20",
};

const collectionIcons: Record<ProductCollection, string> = {
  men: "👔",
  ladies: "👗",
  boys: "👕",
  girls: "👚",
};

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState<AdminView>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const { products, getCounts } = useAdminProducts();

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const counts = getCounts();

  const handleNavigate = (view: AdminView) => {
    setActiveView(view);
    setEditProductId(null);
    setMobileMenuOpen(false);
  };

  const handleEdit = (id: string) => {
    setEditProductId(id);
    setActiveView("edit-product");
  };

  const handleBack = () => {
    setActiveView("products");
    setEditProductId(null);
  };

  const sidebarWidth = sidebarCollapsed ? 72 : 260;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#080a0f] text-gray-900 dark:text-white">
      {/* Mobile menu toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#0b0d12]/95 backdrop-blur-lg border-b border-gray-200 dark:border-white/[0.06] px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          Afraz<span className="text-[#f58025]">Apparel</span> Admin
        </span>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar — hidden on mobile unless menu open */}
      <div className={`hidden md:block`}>
        <AdminSidebar
          activeView={activeView}
          onNavigate={handleNavigate}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden fixed z-40">
          <AdminSidebar
            activeView={activeView}
            onNavigate={handleNavigate}
            collapsed={false}
            onToggleCollapse={() => setMobileMenuOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <motion.main
        initial={false}
        animate={{ marginLeft: isDesktop ? sidebarWidth : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="min-h-screen pt-16 md:pt-0"
      >
        <div className="p-6 md:p-8 lg:p-10">
          {/* Dashboard Overview */}
          {activeView === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Welcome header */}
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome back, <span className="text-[#f58025]">Admin</span>
                </h1>
                <p className="text-gray-500 mt-1 text-sm">
                  Here&apos;s an overview of your product catalog
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Total Products */}
                <motion.div
                  whileHover={{ y: -2 }}
                  className="bg-gradient-to-br from-[#f58025]/20 to-[#f58025]/5 border border-[#f58025]/20 rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f58025]/20 flex items-center justify-center">
                      <Package className="w-5 h-5 text-[#f58025]" />
                    </div>
                    <TrendingUp className="w-4 h-4 text-[#f58025]/60" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {products.length}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Total Products</p>
                </motion.div>

                {/* Per-collection stats */}
                {(
                  Object.entries(counts) as [ProductCollection, number][]
                ).map(([collection, count]) => (
                  <motion.div
                    key={collection}
                    whileHover={{ y: -2 }}
                    className={`bg-gradient-to-br ${collectionColors[collection]} border rounded-2xl p-5`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-lg">
                        {collectionIcons[collection]}
                      </div>
                      <BarChart3 className="w-4 h-4 text-gray-500" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{count}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {collectionLabels[collection]} Collection
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="bg-white dark:bg-[#0f1117]/60 border border-gray-200 dark:border-white/[0.06] rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-300 mb-4">
                  Quick Actions
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleNavigate("products")}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] hover:border-[#f58025]/30 hover:text-[#f58025] transition-all"
                  >
                    <Package className="w-4 h-4" />
                    View Catalog
                  </button>
                  <button
                    onClick={() => handleNavigate("add-product")}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-[#f58025] to-[#e86311] shadow-lg shadow-[#f58025]/15 hover:shadow-[#f58025]/25 transition-all"
                  >
                    <Users className="w-4 h-4" />
                    Add Product
                  </button>
                  <button
                    onClick={() => handleNavigate("documents")}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] hover:border-emerald-500/30 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    Manage Documents
                  </button>
                </div>
              </div>

              {/* Recent products preview */}
              <div className="mt-8 bg-white dark:bg-[#0f1117]/60 border border-gray-200 dark:border-white/[0.06] rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-300 mb-4">
                  Recently Added Products
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {products.slice(0, 5).map((product) => (
                    <div
                      key={product.id}
                      className="bg-gray-50 dark:bg-[#1a1c24] border border-gray-200 dark:border-white/[0.06] rounded-xl p-3 hover:border-[#f58025]/40 transition-colors cursor-pointer"
                      onClick={() => handleEdit(product.id)}
                    >
                      <div className="relative aspect-square rounded-lg bg-white dark:bg-[#12141a] overflow-hidden mb-2">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                        {product.name}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {product.styleNo}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Products View */}
          {activeView === "products" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductTable onEdit={handleEdit} />
            </motion.div>
          )}

          {/* Add Product */}
          {activeView === "add-product" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductForm mode="add" onBack={handleBack} />
            </motion.div>
          )}

          {/* Edit Product */}
          {activeView === "edit-product" && editProductId && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductForm
                mode="edit"
                productId={editProductId}
                onBack={handleBack}
              />
            </motion.div>
          )}

          {/* Documents */}
          {activeView === "documents" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DocumentsManager />
            </motion.div>
          )}
        </div>
      </motion.main>
    </div>
  );
}
