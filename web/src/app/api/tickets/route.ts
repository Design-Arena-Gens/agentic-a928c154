import { NextRequest, NextResponse } from "next/server";
import { store, Ticket } from "@/lib/store";
import { createServiceNowTicket } from "@/lib/integrations/servicenow";
import { createJiraTicket } from "@/lib/integrations/jira";
import { createFreshserviceTicket } from "@/lib/integrations/freshservice";

export async function GET() {
  return NextResponse.json({ tickets: store.listTickets() });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, priority = "P3", source = "servicenow" } = body as Partial<Ticket> & { source?: Ticket["source"] };
  if (!title) return NextResponse.json({ error: "title is required" }, { status: 400 });

  let created: any;
  if (source === "servicenow") created = await createServiceNowTicket({ title, priority: priority as any });
  if (source === "jira") created = await createJiraTicket({ title, priority: priority as any });
  if (source === "freshservice") created = await createFreshserviceTicket({ title, priority: priority as any });

  const saved = store.createTicket({ title, priority: (priority as any) ?? "P3", status: "open", source });
  // Override id with integration id if present
  if (created?.id) saved.id = created.id;
  return NextResponse.json(saved, { status: 201 });
}
