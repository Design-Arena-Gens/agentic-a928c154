import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  return NextResponse.json({ vulns: store.listVulns() });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const required = body?.title && body?.severity && body?.endpointId;
  if (!required) return NextResponse.json({ error: "title, severity, endpointId required" }, { status: 400 });
  const v = store.createVuln({ title: body.title, severity: body.severity, endpointId: body.endpointId, status: body.status ?? "open" });
  return NextResponse.json(v, { status: 201 });
}
