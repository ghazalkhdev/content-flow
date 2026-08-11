import { statusMeta } from "@/lib/data";
import type { StatusCount } from "@/lib/stats";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ContentStatusChart({ data }: { data: StatusCount[] }) {
  const total = data.reduce((sum, d) => sum + d.count, 0);
  const published = data.find((d) => d.status === "published")?.count ?? 0;
  const shippedPct = total ? Math.round((published / total) * 100) : 0;
  const active = data.filter((d) => d.count > 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle>Content by status</CardTitle>
        <CardDescription>{total} active items in the pipeline</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between">
        <div>
          <div
            className="flex h-3 w-full overflow-hidden rounded-full bg-muted"
            role="img"
            aria-label="Content distribution by pipeline stage"
          >
            {active.map(({ status, count }) => {
              const meta = statusMeta[status];
              return (
                <div
                  key={status}
                  className={cn("h-full transition-all", meta.barClass)}
                  style={{ width: `${(count / total) * 100}%` }}
                  title={`${meta.label}: ${count}`}
                />
              );
            })}
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
            {data.map(({ status, count }) => {
              const meta = statusMeta[status];
              return (
                <li key={status} className="flex items-center gap-2 text-sm">
                  <span
                    className={cn(
                      "h-2 w-2 shrink-0 rounded-full",
                      meta.dotClass,
                    )}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1 truncate text-muted-foreground">
                    {meta.label}
                  </span>
                  <span className="font-semibold tabular-nums">{count}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-5 rounded-lg bg-muted/60 px-3 py-2.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Pipeline throughput</span>
            <span className="font-semibold">{total} items</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-200/70">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${shippedPct}%` }}
            />
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {shippedPct}% of the pipeline has shipped
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
