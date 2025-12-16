import { prisma } from "@/lib/prisma";

// ユーザーIDを指定して遊戯情報を取得するAPI
export async function POST(req: Request) {
  const body = await req.json();
  const { userId } = body;

  const play = await prisma.play.findMany({
    where: {
      userId: userId,
    },
    include: { machine: true },
    orderBy: { id: "asc" },
  });

  return Response.json(play);
}
