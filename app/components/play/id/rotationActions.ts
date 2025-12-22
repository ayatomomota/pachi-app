import { Play } from "@/types";

export const updatePlayField = async (
  playId: string,
  fields: Partial<Play>
) => {
  try {
    const res = await fetch(`/api/play/${playId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
    const updated = res.json();
    return updated;
  } catch (err) {
    console.error("Playの更新に失敗しました", err);
    throw err;
  }
};
