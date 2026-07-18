"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

type DeleteModalProps = {
  isOpen: boolean;
  productName: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteModal({
  isOpen,
  productName,
  onConfirm,
  onCancel,
}: DeleteModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white dark:bg-[#12141a] border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 w-full max-w-sm shadow-2xl shadow-black/10 dark:shadow-black/50 pointer-events-auto relative">
              {/* Close button */}
              <button
                onClick={onCancel}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 mx-auto mb-5">
                <AlertTriangle className="w-7 h-7 text-red-400" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
                Delete Product
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6 leading-relaxed">
                Are you sure you want to delete{" "}
                <span className="text-gray-900 dark:text-white font-medium">&quot;{productName}&quot;</span>?
                This action cannot be undone.
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onCancel}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] hover:bg-gray-200 dark:hover:bg-white/[0.08] transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={onConfirm}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20 transition-colors"
                >
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
