"use client";
import { useEffect, useState } from "react";
import type { Vulnerability, Endpoint } from "@/lib/store";

export default function VulnerabilitiesPage() {
  const [vulns, setVulns] = useState<Vulnerability[]>([]);
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState<Vulnerability["severity"]>("medium");
  const [endpointId, setEndpointId] = useState("");

  async function load() {
    const [v, e] = await Promise.all([
      fetch("/api/vulns").then(r=>r.json()),
      fetch("/api/endpoints").then(r=>r.json()),
    ]);
    setVulns(v.vulns); setEndpoints(e.endpoints);
    if (!endpointId && e.endpoints?.[0]) setEndpointId(e.endpoints[0].id);
  }

  useEffect(() => { load(); }, []);

  async function addVuln() {
    await fetch("/api/vulns", { method: "POST", body: JSON.stringify({ title, severity, endpointId, status: "open" }) });
    setTitle("");
    await load();
  }

  async function runScan() {
    await fetch("/api/scanner/run", { method: "POST" });
    await load();
  }

  return (
    <div className="space-y-6">
      <div className="card p-4">
        <div className="font-semibold mb-3">Add Vulnerability</div>
        <div className="grid md:grid-cols-4 gap-3">
          <input className="border rounded px-3 py-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          <select className="border rounded px-3 py-2" value={severity} onChange={e=>setSeverity(e.target.value as any)}>
            <option>critical</option><option>high</option><option>medium</option><option>low</option>
          </select>
          <select className="border rounded px-3 py-2" value={endpointId} onChange={e=>setEndpointId(e.target.value)}>
            {endpoints.map(e => <option key={e.id} value={e.id}>{e.hostname}</option>)}
          </select>
          <div className="flex gap-2">
            <button onClick={addVuln} disabled={!title} className="bg-brand-600 text-white rounded px-4 py-2 disabled:opacity-50">Add</button>
            <button onClick={runScan} className="bg-zinc-900 text-white rounded px-4 py-2">Run scan</button>
          </div>
        </div>
      </div>

      <div className="card p-4">
        <div className="font-semibold mb-3">Vulnerabilities</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-500">
                <th className="py-2">ID</th>
                <th>Title</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Endpoint</th>
              </tr>
            </thead>
            <tbody>
              {vulns.map(v => (
                <tr key={v.id} className="border-t">
                  <td className="py-2 pr-2 whitespace-nowrap">{v.id}</td>
                  <td className="pr-2">{v.title}</td>
                  <td className="pr-2 capitalize">{v.severity}</td>
                  <td className="pr-2">{v.status}</td>
                  <td className="pr-2">{endpoints.find(e=>e.id===v.endpointId)?.hostname ?? v.endpointId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
