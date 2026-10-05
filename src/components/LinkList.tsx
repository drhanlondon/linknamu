"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type Counts = Record<string, number>;

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 서버에서 받은 값과 이 화면에서 누른 횟수를 따로 관리해서,
  // 데이터를 받기 전에 클릭해도 그 클릭이 덮어써지지 않게 한다.
  const [fetchedCounts, setFetchedCounts] = useState<Counts>({});
  const [localClicks, setLocalClicks] = useState<Counts>({});

  useEffect(() => {
    fetch("/api/clicks", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : {}))
      .then((data: Counts) => setFetchedCounts(data))
      .catch(() => {});
  }, []);

  function handleClick(id: string) {
    setLocalClicks((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    // 새 탭으로 이동해도 요청이 끊기지 않도록 sendBeacon 사용
    const body = new Blob([JSON.stringify({ linkId: id })], { type: "application/json" });
    if (!navigator.sendBeacon?.("/api/clicks", body)) {
      fetch("/api/clicks", { method: "POST", body, keepalive: true }).catch(() => {});
    }
  }

  return (
    <nav className="flex flex-col gap-4">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          title={link.title}
          url={link.url}
          count={(fetchedCounts[link.id] ?? 0) + (localClicks[link.id] ?? 0)}
          onClick={() => handleClick(link.id)}
        />
      ))}
    </nav>
  );
}
