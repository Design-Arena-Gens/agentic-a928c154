"use client";
import { useState } from "react";

export default function SettingsPage() {
  const [snInstance, setSnInstance] = useState("");
  const [jiraBaseUrl, setJiraBaseUrl] = useState("");
  const [fsDomain, setFsDomain] = useState("");

  return (
    <div className="space-y-6">
      <div className="card p-4">
        <div className="font-semibold mb-2">Integrations</div>
        <div className="grid md:grid-cols-3 gap-3">
          <input className="border rounded px-3 py-2" placeholder="ServiceNow instance URL" value={snInstance} onChange={e=>setSnInstance(e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Jira base URL" value={jiraBaseUrl} onChange={e=>setJiraBaseUrl(e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Freshservice domain" value={fsDomain} onChange={e=>setFsDomain(e.target.value)} />
        </div>
        <p className="text-xs text-zinc-500 mt-2">Note: This demo stores keys in environment variables on the server. Configure in your deployment environment.</p>
      </div>

      <div className="card p-4">
        <div className="font-semibold mb-2">Automations</div>
        <form className="grid md:grid-cols-4 gap-3" onSubmit={async (e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget as HTMLFormElement);
          const action = form.get("action");
          const payload = action === "onboarding" ? {
            userEmail: form.get("email"), fullName: form.get("name"), department: form.get("dept")
          } : {
            userEmail: form.get("email"), lastDay: form.get("lastDay")
          };
          await fetch(`/api/automation/${action}`, { method: "POST", body: JSON.stringify(payload) });
          alert("Queued automation: " + action);
        }}>
          <select name="action" className="border rounded px-3 py-2">
            <option value="onboarding">Onboarding</option>
            <option value="offboarding">Offboarding</option>
          </select>
          <input name="email" className="border rounded px-3 py-2" placeholder="user@company.com" />
          <input name="name" className="border rounded px-3 py-2" placeholder="Full Name (onboarding)" />
          <input name="dept" className="border rounded px-3 py-2" placeholder="Department (onboarding)" />
          <input name="lastDay" className="border rounded px-3 py-2" placeholder="Last Day (offboarding)" />
          <button className="bg-zinc-900 text-white rounded px-4 py-2">Queue</button>
        </form>
      </div>
    </div>
  );
}
