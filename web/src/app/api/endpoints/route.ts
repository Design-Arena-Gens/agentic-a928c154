import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  return NextResponse.json({ endpoints: store.listEndpoints() });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body?.id || !body?.hostname || !body?.os || !body?.health) {
    return NextResponse.json({ error: "id, hostname, os, health required" }, { status: 400 });
  }
  const ep = store.upsertEndpoint({ ...body, lastSeen: new Date().toISOString() });
  return NextResponse.json(ep, { status: 201 });
}
