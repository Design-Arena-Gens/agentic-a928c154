import { ReactNode } from "react";

export function KpiCard({ label, value, delta, icon }: { label: string; value: string | number; delta?: string; icon?: ReactNode; }) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-zinc-500">{label}</div>
          <div className="text-2xl font-semibold">{value}</div>
          {delta && <div className="text-xs text-emerald-600 mt-1">{delta}</div>}
        </div>
        <div className="text-zinc-400">{icon}</div>
      </div>
    </div>
  );
}
