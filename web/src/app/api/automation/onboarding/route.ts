import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userEmail, fullName, department } = body || {};
  if (!userEmail || !fullName) return NextResponse.json({ error: "userEmail and fullName required" }, { status: 400 });

  const steps = [
    { name: "Create AD account", status: "done" },
    { name: "Assign O365 license", status: "done" },
    { name: "Add to Azure AD groups", status: "pending" },
    { name: "Provision VPN access", status: "pending" },
    { name: "Create Jira/FS/SN welcome ticket", status: "pending" },
  ];

  return NextResponse.json({ status: "queued", userEmail, fullName, department, steps }, { status: 202 });
}
