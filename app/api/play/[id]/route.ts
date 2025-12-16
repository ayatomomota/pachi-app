import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  // Playのidを指定して取得
  const plays = await prisma.play.findMany({
    where: { id },
    include: { machine: true },
    orderBy: { id: "asc" },
  });
  // 配列として取得しているため、1つ目の要素だけ返す
  return NextResponse.json(plays[0]);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    console.log(body);
    const updated = await prisma.play.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("更新エラー", error);
    return NextResponse.json({ error: "更新に失敗しました" }, { status: 500 });
  }
}
