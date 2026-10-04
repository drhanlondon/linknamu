"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "밝은 화면으로 전환" : "어두운 화면으로 전환"}
      className="rounded-full border border-gray-300 px-3 py-1.5 text-sm transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
    >
      {isDark === null ? " " : isDark ? "☀️ 라이트" : "🌙 다크"}
    </button>
  );
}
