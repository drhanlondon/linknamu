import { NextResponse } from "next/server";
import { profile } from "@/data/profile";
import { getClickCounts, incrementClick } from "@/lib/clicks";

export const dynamic = "force-dynamic";

const validIds = new Set(profile.links.map((link) => link.id));

export async function GET() {
  return NextResponse.json(await getClickCounts());
}

export async function POST(request: Request) {
  let linkId: unknown;
  try {
    ({ linkId } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (typeof linkId !== "string" || !validIds.has(linkId)) {
    return NextResponse.json({ error: "존재하지 않는 링크입니다." }, { status: 400 });
  }

  try {
    const saved = await incrementClick(linkId);
    if (!saved) {
      return NextResponse.json({ error: "MONGODB_URI가 설정되지 않았습니다." }, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return NextResponse.json({ error: "클릭 수 저장에 실패했습니다." }, { status: 500 });
  }
}
