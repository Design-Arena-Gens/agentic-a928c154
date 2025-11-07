import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userEmail, lastDay } = body || {};
  if (!userEmail) return NextResponse.json({ error: "userEmail required" }, { status: 400 });

  const steps = [
    { name: "Disable SSO/O365", status: "pending" },
    { name: "Revoke VPN", status: "pending" },
    { name: "Archive mailbox", status: "pending" },
    { name: "Wipe company devices", status: "pending" },
    { name: "Create exit ticket", status: "pending" },
  ];

  return NextResponse.json({ status: "queued", userEmail, lastDay, steps }, { status: 202 });
}
