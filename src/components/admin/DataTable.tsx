import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/ui/States";

export interface Column<T> {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  className?: string;
  hideOnMobile?: boolean;
}

/**
 * Responsive data table. Renders a table on md+ and a stacked card list on
 * mobile (cloude.md §18). Filtering/search is handled by the parent page.
 */
export function DataTable<T extends { id: string }>({
  columns,
  rows,
  onRowClick,
  emptyLabel = "Kayıt bulunamadı",
  mobileTitle,
}: {
  columns: Column<T>[];
  rows: T[];
  onRowClick?: (row: T) => void;
  emptyLabel?: string;
  mobileTitle?: (row: T) => React.ReactNode;
}) {
  if (rows.length === 0) {
    return <EmptyState title={emptyLabel} description="Filtreleri değiştirmeyi deneyin." />;
  }

  return (
    <>
      {/* Desktop table */}
      <div className="scrollbar-thin hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-hairline text-xs uppercase tracking-wide text-muted">
              {columns.map((col) => (
                <th key={col.key} className={cn("px-4 py-3 font-semibold", col.className)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {rows.map((row) => (
              <tr
                key={row.id}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(
                  "transition-colors",
                  onRowClick && "cursor-pointer hover:bg-brand-mint/40",
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn("px-4 py-3.5 align-middle", col.className)}>
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {rows.map((row) => (
          <div
            key={row.id}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            className={cn(
              "rounded-lg border border-hairline bg-white p-4",
              onRowClick && "cursor-pointer",
            )}
          >
            {mobileTitle && <div className="mb-3 font-semibold text-ink">{mobileTitle(row)}</div>}
            <dl className="space-y-2">
              {columns
                .filter((c) => !c.hideOnMobile)
                .map((col) => (
                  <div key={col.key} className="flex items-start justify-between gap-3">
                    <dt className="text-xs font-medium uppercase text-muted">{col.header}</dt>
                    <dd className="text-right text-sm">{col.cell(row)}</dd>
                  </div>
                ))}
            </dl>
          </div>
        ))}
      </div>
    </>
  );
}
