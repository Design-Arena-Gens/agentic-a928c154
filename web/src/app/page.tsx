import { KpiCard } from "@/components/KpiCard";
import { ChartCard } from "@/components/ChartCard";

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard label="Open Tickets" value={42} delta="-8% vs last week" />
        <KpiCard label="Critical Vulns" value={7} delta="-2 since yesterday" />
        <KpiCard label="Healthy Endpoints" value={"1,294 / 1,350"} delta={"96%"} />
        <KpiCard label="Avg Resolution" value={"2.3h"} delta={"SLA: 4h"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ChartCard />
        </div>
        <div className="card p-4">
          <div className="text-sm text-zinc-500 mb-2">Live Incidents</div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start justify-between">
              <span>
                VPN connectivity failing for remote users
                <span className="ml-2 text-xs text-zinc-400">Jira-OPS-1024</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800">P2</span>
            </li>
            <li className="flex items-start justify-between">
              <span>
                Printer drivers failing on macOS 14
                <span className="ml-2 text-xs text-zinc-400">FS-2348</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">P3</span>
            </li>
            <li className="flex items-start justify-between">
              <span>
                Office 365 activation errors for new hires
                <span className="ml-2 text-xs text-zinc-400">SN-INC001928</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800">P1</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
