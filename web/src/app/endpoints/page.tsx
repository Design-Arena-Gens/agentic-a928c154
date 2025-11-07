"use client";
import { useEffect, useState } from "react";
import type { Endpoint } from "@/lib/store";

export default function EndpointsPage() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);

  async function load() {
    const res = await fetch("/api/endpoints");
    const data = await res.json();
    setEndpoints(data.endpoints);
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="card p-4">
      <div className="font-semibold mb-3">Endpoints</div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-zinc-500">
              <th className="py-2">ID</th>
              <th>Hostname</th>
              <th>OS</th>
              <th>Owner</th>
              <th>Health</th>
              <th>Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map(e => (
              <tr key={e.id} className="border-t">
                <td className="py-2 pr-2">{e.id}</td>
                <td className="pr-2">{e.hostname}</td>
                <td className="pr-2">{e.os}</td>
                <td className="pr-2">{e.owner ?? "-"}</td>
                <td className="pr-2 capitalize">{e.health}</td>
                <td className="pr-2">{new Date(e.lastSeen).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
