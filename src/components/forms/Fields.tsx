import { cn } from "@/lib/utils";

export function Field({
  label,
  htmlFor,
  error,
  help,
  required,
  children,
  className,
}: {
  label?: string;
  htmlFor?: string;
  error?: string;
  help?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={htmlFor} className="field-label">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="field-error">{error}</p>
      ) : help ? (
        <p className="field-help">{help}</p>
      ) : null}
    </div>
  );
}

export function Input({
  className,
  invalid,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      className={cn("field-input", invalid && "border-red-400 focus:ring-red-200", className)}
      {...props}
    />
  );
}

export function Textarea({
  className,
  invalid,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return (
    <textarea
      className={cn(
        "field-input h-auto min-h-[110px] py-2.5",
        invalid && "border-red-400 focus:ring-red-200",
        className,
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  invalid,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }) {
  return (
    <select
      className={cn("field-input", invalid && "border-red-400", className)}
      {...props}
    >
      {children}
    </select>
  );
}

export function Checkbox({
  label,
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label className={cn("flex cursor-pointer items-start gap-3", className)}>
        <input
          type="checkbox"
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-hairline text-brand-green focus:ring-brand-green"
          {...props}
        />
        <span className="text-sm text-ink">{label}</span>
      </label>
      {error && <p className="field-error ml-8">{error}</p>}
    </div>
  );
}
