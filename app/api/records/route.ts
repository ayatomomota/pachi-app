import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const playId = searchParams.get("playId");
  const records = await prisma.record.findMany({
    where: { playId },
    orderBy: { id: "asc" },
  });
  return Response.json(records);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { totalRotation, prevTotalRotation, playId } = body;

  if (!totalRotation) {
    return new Response("累計回転数は必須です。", { status: 400 });
  }

  const rotation =
    prevTotalRotation !== null && prevTotalRotation !== undefined
      ? Number(totalRotation) - Number(prevTotalRotation)
      : Number(totalRotation);

  const record = await prisma.record.create({
    data: {
      total: Number(totalRotation), // 累計回転数
      diff: rotation < 0 ? 0 : rotation, // 当該回転数
      playId: playId,
    },
  });

  return Response.json(record);
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const { recordId } = body;

  if (!recordId) {
    return new Response("レコードIDは必須です。", { status: 400 });
  }

  await prisma.record.delete({
    where: { id: recordId },
  });

  return new Response("削除しました。", { status: 200 });
}
