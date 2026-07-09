"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { loginSchema } from "@/lib/validators";
import { routes } from "@/lib/routes";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Field, Input, Checkbox } from "@/components/forms/Fields";

export default function AdminLoginPage() {
  const router = useRouter();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse(values);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    // Demo only — no real authentication is wired up.
    setTimeout(() => router.push(routes.admin.dashboard), 500);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand side */}
      <div className="relative hidden flex-col justify-between bg-brand-dark p-12 text-white lg:flex">
        <Logo href={routes.home} variant="light" />
        <div>
          <h1 className="text-3xl font-extrabold leading-tight">
            Yönetim Paneli
          </h1>
          <p className="mt-4 max-w-sm text-white/70">
            Kampanyaları, bağışları, raporları ve saha süreçlerini tek yerden,
            güvenli ve şeffaf biçimde yönetin.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/60">
          <ShieldCheck className="h-5 w-5" /> KVKK ve veri güvenliği ilkelerine
          uygun erişim
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center bg-brand-mint/40 px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo href={routes.home} />
          </div>
          <div className="card p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-brand-dark">Giriş Yap</h2>
              <p className="mt-1 text-sm text-muted">
                Devam etmek için hesap bilgilerinizi girin.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <Field label="E-posta" htmlFor="email" error={errors.email?.[0]} required>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="ornek@ahdevefa.org"
                  value={values.email}
                  invalid={!!errors.email}
                  onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                />
              </Field>

              <Field label="Şifre" htmlFor="password" error={errors.password?.[0]} required>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={values.password}
                    invalid={!!errors.password}
                    onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
                    aria-label={showPass ? "Şifreyi gizle" : "Şifreyi göster"}
                  >
                    {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </Field>

              <div className="flex items-center justify-between">
                <Checkbox label="Beni hatırla" defaultChecked />
                <Link href="#" className="text-sm font-semibold text-brand-green hover:underline">
                  Şifremi unuttum
                </Link>
              </div>

              <Button type="submit" variant="green" size="lg" className="w-full" disabled={loading}>
                <Lock className="h-4 w-4" /> {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </Button>
            </form>
          </div>
          <p className="mt-6 text-center text-xs text-muted">
            Bu bir demo giriş ekranıdır. Gerçek kimlik doğrulama entegrasyonu daha
            sonra bağlanacaktır.
          </p>
        </div>
      </div>
    </div>
  );
}
