import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function POST() {
  // Simulate vulnerability scan adding a new finding
  const endpoints = store.listEndpoints();
  const target = endpoints[Math.floor(Math.random() * endpoints.length)];
  const v = store.createVuln({
    title: "Outdated OpenSSL library",
    severity: "high",
    endpointId: target.id,
    status: "open",
  });
  return NextResponse.json({ added: v, total: store.listVulns().length }, { status: 201 });
}
