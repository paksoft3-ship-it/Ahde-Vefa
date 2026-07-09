"use client";

import { cn } from "@/lib/utils";

export function AmountSelector({
  amounts,
  value,
  onChange,
  custom,
  onCustomChange,
}: {
  amounts: number[];
  value: number | null;
  onChange: (v: number) => void;
  custom: string;
  onCustomChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
      {amounts.map((amt) => (
        <button
          key={amt}
          type="button"
          onClick={() => onChange(amt)}
          className={cn(
            "h-12 rounded-md border-2 text-sm font-bold transition-all",
            value === amt && custom === ""
              ? "border-brand-green bg-brand-green text-white"
              : "border-hairline bg-white text-brand-green hover:border-brand-green",
          )}
        >
          {amt.toLocaleString("tr-TR")} ₺
        </button>
      ))}
      <input
        type="text"
        inputMode="numeric"
        value={custom}
        onChange={(e) => onCustomChange(e.target.value.replace(/[^0-9]/g, ""))}
        placeholder="Diğer"
        aria-label="Diğer tutar"
        className={cn(
          "h-12 rounded-md border-2 px-3 text-center text-sm font-bold outline-none",
          custom !== ""
            ? "border-brand-green text-brand-green"
            : "border-hairline text-ink focus:border-brand-green",
        )}
      />
    </div>
  );
}
