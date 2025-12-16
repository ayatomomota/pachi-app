"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

// 遊戯記録を作成するアクション
export async function createPlay(userId: string) {
  const play = await prisma.play.create({
    data: {
      userId: userId,
    },
  });
  redirect(`/play/${play.id}`);
}
