"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HandCoins } from "lucide-react";
import { DONATION_TYPES, QUICK_AMOUNTS } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { AmountSelector } from "./AmountSelector";
import { Button } from "@/components/ui/Button";

export function DonationQuickCard({
  defaultType,
  title = "Hızlı Bağış",
  className,
}: {
  defaultType?: string;
  title?: string;
  className?: string;
}) {
  const router = useRouter();
  const [type, setType] = useState(defaultType ?? DONATION_TYPES[0]);
  const [amount, setAmount] = useState<number | null>(QUICK_AMOUNTS[2]);
  const [custom, setCustom] = useState("");
  const [donorType, setDonorType] = useState<"Bireysel" | "Kurumsal">("Bireysel");

  const finalAmount = custom !== "" ? Number(custom) : amount ?? 0;

  const handleContinue = () => {
    const params = new URLSearchParams({
      tur: type,
      tutar: String(finalAmount || ""),
      bagisci: donorType,
    });
    router.push(`${routes.odeme}?${params.toString()}`);
  };

  return (
    <div className={`rounded-xl border border-hairline bg-white p-6 shadow-donation ${className ?? ""}`}>
      <div className="mb-5 flex items-center gap-2">
        <HandCoins className="h-5 w-5 text-brand-turquoise" />
        <h3 className="text-lg font-bold text-brand-green">{title}</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="field-label" htmlFor="qd-type">Bağış Türü</label>
          <select
            id="qd-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="field-input"
          >
            {DONATION_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <span className="field-label">Miktar Seçin (₺)</span>
          <AmountSelector
            amounts={QUICK_AMOUNTS}
            value={amount}
            onChange={(v) => {
              setAmount(v);
              setCustom("");
            }}
            custom={custom}
            onCustomChange={setCustom}
          />
        </div>

        <div>
          <span className="field-label">Bağışçı Türü</span>
          <div className="grid grid-cols-2 gap-2">
            {(["Bireysel", "Kurumsal"] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDonorType(d)}
                className={`h-11 rounded-md border-2 text-sm font-semibold transition-all ${
                  donorType === d
                    ? "border-brand-green bg-brand-mint text-brand-green"
                    : "border-hairline text-muted hover:border-brand-green"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleContinue}
          variant="gold"
          size="lg"
          className="w-full"
          disabled={!finalAmount}
        >
          Bağışı Tamamla
        </Button>
        <p className="text-center text-xs text-muted">
          Ödeme sağlayıcı entegrasyonu tamamlandığında güvenli ödeme adımına
          yönlendirilirsiniz.
        </p>
      </div>
    </div>
  );
}
