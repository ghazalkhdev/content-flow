import { ScrollText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DetailScenario({ scenario }: { scenario: string }) {
  const paragraphs = scenario
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <ScrollText className="h-4 w-4" />
          </span>
          <CardTitle>Scenario</CardTitle>
        </div>
        <CardDescription>Creative brief and context for this piece</CardDescription>
      </CardHeader>
      <CardContent>
        {paragraphs.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No scenario has been written for this piece yet.
          </p>
        ) : (
          <div className="space-y-4">
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-sm leading-7 text-foreground/85"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
