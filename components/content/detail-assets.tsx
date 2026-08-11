import { Download, FolderOpen } from "lucide-react";
import { getContentAssets } from "@/lib/content-details";
import type { ContentAsset, ContentItem } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AssetThumbnail } from "./asset-thumbnail";

function AssetTile({ asset }: { asset: ContentAsset }) {
  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card shadow-xs transition-colors hover:border-zinc-300">
      <div className="relative">
        <AssetThumbnail asset={asset} />
        <button
          type="button"
          aria-label={`Download ${asset.name}`}
          className="absolute top-2 right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-white/90 text-zinc-700 shadow-sm opacity-100 transition-opacity hover:bg-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
        >
          <Download className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="p-2.5">
        <p className="truncate text-xs font-medium text-foreground" title={asset.name}>
          {asset.name}
        </p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {asset.size}
          {asset.meta ? ` · ${asset.meta}` : ""}
        </p>
      </div>
    </div>
  );
}

export function DetailAssets({ item }: { item: ContentItem }) {
  const assets = getContentAssets(item);

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <FolderOpen className="h-4 w-4" />
            </span>
            <CardTitle>Assets</CardTitle>
          </div>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border">
            {assets.length}
          </span>
        </div>
        <CardDescription>Files attached to this piece</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {assets.map((asset) => (
            <AssetTile key={asset.id} asset={asset} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
