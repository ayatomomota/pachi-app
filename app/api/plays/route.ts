import { prisma } from "@/lib/prisma";

export async function GET() {
  const plays = await prisma.play.findMany({
    include: { machine: true },
    orderBy: { id: "asc" },
  });
  return Response.json(plays);
}

// ホームページで「追加」ボタンを押した際に実行
export async function POST(req: Request) {
  const body = await req.json();
  const { userId } = body;

  const play = await prisma.play.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return Response.json(play);
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const { playId } = body;

  if (!playId) {
    return new Response("遊戯IDは必須です。", { status: 400 });
  }

  await prisma.play.delete({
    where: { id: playId },
  });

  return new Response("削除しました。", { status: 200 });
}
