import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function PATCH(req: NextRequest, { params }: any) {
  const update = await req.json();
  const updated = store.updateTicket(params.id, update);
  if (!updated) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(updated);
}
