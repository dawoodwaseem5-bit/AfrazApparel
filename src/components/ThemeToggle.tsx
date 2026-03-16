"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch; wait until we have resolvedTheme so first click works
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || resolvedTheme === undefined) {
    return <div className="w-10 h-10" aria-hidden="true" />;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full transition-colors bg-brand-50 hover:bg-brand-100 text-brand-900 dark:bg-white/10 dark:hover:bg-white/20 dark:text-gray-200"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
