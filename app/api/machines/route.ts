import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const machines = await prisma.machine.findMany({
      orderBy: { name: "asc" },
    });
    return Response.json(machines);
  } catch (error) {
    console.error("遊戯台一覧の取得に失敗しました:", error);
    return new Response("遊戯台一覧の取得に失敗しました。", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    if (!name || typeof name !== "string") {
      return new Response("無効な機器名です。", { status: 400 });
    }

    const newMachine = await prisma.machine.create({
      data: { name },
    });

    return Response.json(newMachine, { status: 201 });
  } catch (error) {
    console.error("遊戯台の追加に失敗しました:", error);
    return new Response("遊戯台の追加に失敗しました。", { status: 500 });
  }
}
