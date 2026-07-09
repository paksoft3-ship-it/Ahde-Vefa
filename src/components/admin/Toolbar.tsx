"use client";

import { Download, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function FilterBar({
  search,
  onSearch,
  placeholder = "Ara...",
  filters,
  activeFilter,
  onFilter,
  onExport,
}: {
  search: string;
  onSearch: (v: string) => void;
  placeholder?: string;
  filters?: string[];
  activeFilter?: string;
  onFilter?: (v: string) => void;
  onExport?: () => void;
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={placeholder}
          className="h-10 w-full rounded-md border border-hairline bg-white pl-9 pr-3 text-sm outline-none focus:border-brand-green"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {filters && onFilter && (
          <div className="scrollbar-thin flex gap-2 overflow-x-auto">
            {["Tümü", ...filters].map((f) => {
              const val = f === "Tümü" ? "" : f;
              const active = (activeFilter ?? "") === val;
              return (
                <button
                  key={f}
                  onClick={() => onFilter(val)}
                  className={cn(
                    "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "border-brand-green bg-brand-green text-white"
                      : "border-hairline bg-white text-muted hover:border-brand-green",
                  )}
                >
                  {f}
                </button>
              );
            })}
          </div>
        )}
        {onExport && (
          <button
            onClick={onExport}
            className="btn btn-secondary btn-sm"
            title="Dışa aktar"
          >
            <Download className="h-4 w-4" /> Dışa Aktar
          </button>
        )}
      </div>
    </div>
  );
}
