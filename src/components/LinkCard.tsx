"use client";

import { useState } from "react";

type LinkCardProps = {
  id: string;
  title: string;
  url: string;
  initialCount: number;
};

export default function LinkCard({ id, title, url, initialCount }: LinkCardProps) {
  const [count, setCount] = useState(initialCount);

  function handleClick() {
    setCount((c) => c + 1);
    // 새 탭으로 이동해도 요청이 끊기지 않도록 sendBeacon 사용
    const body = new Blob([JSON.stringify({ linkId: id })], { type: "application/json" });
    if (!navigator.sendBeacon?.("/api/clicks", body)) {
      fetch("/api/clicks", { method: "POST", body, keepalive: true }).catch(() => {});
    }
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="flex items-center justify-between rounded-2xl border-2 border-gray-900 bg-white px-5 py-4 font-medium transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 dark:border-gray-100 dark:bg-gray-900"
    >
      <span>{title}</span>
      <span className="text-xs text-gray-500 dark:text-gray-400">{count.toLocaleString()} 클릭</span>
    </a>
  );
}
