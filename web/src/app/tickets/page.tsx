"use client";
import { useEffect, useState } from "react";
import type { Ticket } from "@/lib/store";

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [title, setTitle] = useState("");
  const [source, setSource] = useState<Ticket["source"]>("servicenow");
  const [priority, setPriority] = useState<Ticket["priority"]>("P3");
  const [loading, setLoading] = useState(false);

  async function load() {
    const res = await fetch("/api/tickets");
    const data = await res.json();
    setTickets(data.tickets);
  }

  useEffect(() => { load(); }, []);

  async function createTicket() {
    setLoading(true);
    await fetch("/api/tickets", { method: "POST", body: JSON.stringify({ title, source, priority }) });
    setTitle("");
    await load();
    setLoading(false);
  }

  async function markResolved(id: string) {
    await fetch(`/api/tickets/${id}`, { method: "PATCH", body: JSON.stringify({ status: "resolved" }) });
    await load();
  }

  return (
    <div className="space-y-6">
      <div className="card p-4">
        <div className="font-semibold mb-3">Create Ticket</div>
        <div className="grid md:grid-cols-4 gap-3">
          <input className="border rounded px-3 py-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          <select className="border rounded px-3 py-2" value={source} onChange={e=>setSource(e.target.value as any)}>
            <option value="servicenow">ServiceNow</option>
            <option value="jira">Jira</option>
            <option value="freshservice">Freshservice</option>
          </select>
          <select className="border rounded px-3 py-2" value={priority} onChange={e=>setPriority(e.target.value as any)}>
            <option>P1</option><option>P2</option><option>P3</option><option>P4</option>
          </select>
          <button onClick={createTicket} disabled={!title || loading} className="bg-brand-600 text-white rounded px-4 py-2 disabled:opacity-50">Add</button>
        </div>
      </div>

      <div className="card p-4">
        <div className="font-semibold mb-3">Tickets</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-500">
                <th className="py-2">ID</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Source</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(t => (
                <tr key={t.id} className="border-t">
                  <td className="py-2 pr-2 whitespace-nowrap">{t.id}</td>
                  <td className="pr-2">{t.title}</td>
                  <td className="pr-2">{t.priority}</td>
                  <td className="pr-2">{t.status}</td>
                  <td className="pr-2">{t.source}</td>
                  <td className="text-right">
                    {t.status !== "resolved" && (
                      <button onClick={()=>markResolved(t.id)} className="text-emerald-700 hover:underline">Mark resolved</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
