"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  BookOpen,
  Building2,
} from "lucide-react";
import { ADMIN_USERNAME, ADMIN_PASSWORD } from "@/data/adminConfig";

type UploadStatus = "idle" | "uploading" | "success" | "error";

type PdfCardState = {
  status: UploadStatus;
  fileName: string | null;
  message: string;
};

export default function DocumentsManager() {
  const [catalog, setCatalog] = useState<PdfCardState>({
    status: "idle",
    fileName: null,
    message: "",
  });
  const [profile, setProfile] = useState<PdfCardState>({
    status: "idle",
    fileName: null,
    message: "",
  });

  const catalogInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (
    file: File,
    type: "catalog" | "profile",
    setState: React.Dispatch<React.SetStateAction<PdfCardState>>
  ) => {
    if (file.type !== "application/pdf") {
      setState({
        status: "error",
        fileName: file.name,
        message: "Only PDF files are allowed",
      });
      return;
    }

    setState({
      status: "uploading",
      fileName: file.name,
      message: "Uploading...",
    });

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      const res = await fetch("/api/admin-upload-pdf", {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`)}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setState({
          status: "success",
          fileName: file.name,
          message: data.message || "Uploaded successfully!",
        });
      } else {
        setState({
          status: "error",
          fileName: file.name,
          message: data.error || "Upload failed",
        });
      }
    } catch {
      setState({
        status: "error",
        fileName: file.name,
        message: "Network error — please try again",
      });
    }
  };

  const handleFileSelect = (
    files: FileList | null,
    type: "catalog" | "profile",
    setState: React.Dispatch<React.SetStateAction<PdfCardState>>
  ) => {
    if (!files || files.length === 0) return;
    handleUpload(files[0], type, setState);
  };

  const handleDrop = (
    e: React.DragEvent,
    type: "catalog" | "profile",
    setState: React.Dispatch<React.SetStateAction<PdfCardState>>
  ) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) handleUpload(files[0], type, setState);
  };

  const resetState = (
    setState: React.Dispatch<React.SetStateAction<PdfCardState>>
  ) => {
    setState({ status: "idle", fileName: null, message: "" });
  };

  const renderCard = (
    type: "catalog" | "profile",
    state: PdfCardState,
    setState: React.Dispatch<React.SetStateAction<PdfCardState>>,
    inputRef: React.RefObject<HTMLInputElement | null>
  ) => {
    const isCatalog = type === "catalog";
    const Icon = isCatalog ? BookOpen : Building2;
    const title = isCatalog ? "Product Catalog" : "Company Profile";
    const description = isCatalog
      ? "Upload a new catalog PDF. This will replace the current catalog available for download on the website."
      : "Upload a new company profile PDF. This will replace the current profile available for download on the website.";
    const currentFile = isCatalog
      ? "AFRAZ_CATALOG_2026.pdf"
      : "PROFILE AFRAZ APPAREL 2025.pdf";

    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-[#0f1117]/60 border border-gray-200 dark:border-white/[0.06] rounded-2xl p-6 flex flex-col shadow-sm dark:shadow-none"
      >
        {/* Card header */}
        <div className="flex items-start gap-4 mb-5">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              isCatalog
                ? "bg-blue-500/10 border border-blue-500/20"
                : "bg-emerald-500/10 border border-emerald-500/20"
            }`}
          >
            <Icon
              className={`w-6 h-6 ${
                isCatalog ? "text-blue-400" : "text-emerald-400"
              }`}
            />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Current file info */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.04] mb-5">
          <FileText className="w-4 h-4 text-gray-500 shrink-0" />
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
            Current: <span className="text-gray-700 dark:text-gray-300 font-medium">{currentFile}</span>
          </span>
        </div>

        {/* Upload area */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, type, setState)}
          onClick={() => {
            if (state.status !== "uploading") inputRef.current?.click();
          }}
          className={`relative flex-1 min-h-[140px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-200 ${
            state.status === "uploading"
              ? "border-[#f58025]/40 bg-[#f58025]/5 cursor-wait"
              : state.status === "success"
              ? "border-emerald-500/40 bg-emerald-500/5"
              : state.status === "error"
              ? "border-red-500/40 bg-red-500/5"
              : "border-gray-200 dark:border-white/[0.08] hover:border-gray-300 dark:hover:border-white/[0.16] bg-gray-50 dark:bg-white/[0.02]"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) => handleFileSelect(e.target.files, type, setState)}
            className="hidden"
          />

          <AnimatePresence mode="wait">
            {state.status === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center"
              >
                <Upload className="w-8 h-8 text-gray-500 mb-3" />
                <p className="text-sm text-gray-400">
                  Drop PDF here or{" "}
                  <span className="text-[#f58025] font-medium">browse</span>
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  PDF files only
                </p>
              </motion.div>
            )}

            {state.status === "uploading" && (
              <motion.div
                key="uploading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center"
              >
                <RefreshCw className="w-8 h-8 text-[#f58025] mb-3 animate-spin" />
                <p className="text-sm text-[#f58025] font-medium">
                  Uploading...
                </p>
                <p className="text-xs text-gray-500 mt-1 truncate max-w-full">
                  {state.fileName}
                </p>
              </motion.div>
            )}

            {state.status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center"
              >
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-3" />
                <p className="text-sm text-emerald-400 font-medium">
                  {state.message}
                </p>
                <p className="text-xs text-gray-500 mt-1 truncate max-w-full">
                  {state.fileName}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    resetState(setState);
                  }}
                  className="mt-3 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white underline underline-offset-2 transition-colors"
                >
                  Upload another
                </button>
              </motion.div>
            )}

            {state.status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center"
              >
                <AlertCircle className="w-8 h-8 text-red-400 mb-3" />
                <p className="text-sm text-red-400 font-medium">
                  {state.message}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    resetState(setState);
                  }}
                  className="mt-3 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white underline underline-offset-2 transition-colors"
                >
                  Try again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Documents</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Upload and manage the catalog and company profile PDFs available for
          download on the public website
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderCard("catalog", catalog, setCatalog, catalogInputRef)}
        {renderCard("profile", profile, setProfile, profileInputRef)}
      </div>

      {/* Info note */}
      <div className="mt-6 flex items-start gap-3 px-4 py-3 rounded-xl bg-[#f58025]/5 border border-[#f58025]/15">
        <AlertCircle className="w-4 h-4 text-[#f58025] shrink-0 mt-0.5" />
        <p className="text-xs text-gray-400 leading-relaxed">
          Uploaded PDFs will immediately replace the current files on the
          website. The &quot;Download Catalog&quot; and &quot;Download
          Profile&quot; buttons on the homepage and footer will serve the new
          files.
        </p>
      </div>
    </div>
  );
}
