import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, PenLine } from "lucide-react";
import { contentItems, contentTypeMeta, getContent, getProject } from "@/lib/data";
import { contentDetails } from "@/lib/content-details";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { DetailAssets } from "@/components/content/detail-assets";
import { DetailOverview } from "@/components/content/detail-overview";
import { DetailPrompt } from "@/components/content/detail-prompt";
import { DetailScenario } from "@/components/content/detail-scenario";

export function generateStaticParams() {
  return contentItems.map((item) => ({ id: item.id }));
}

export async function generateMetadata(
  props: PageProps<"/content/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const item = getContent(id);
  if (!item) return { title: "Content not found · ContentFlow" };
  return { title: `${item.title} · ContentFlow` };
}

export default async function ContentDetailPage(
  props: PageProps<"/content/[id]">,
) {
  const { id } = await props.params;
  const item = getContent(id);
  if (!item) notFound();

  const project = getProject(item.projectId);
  const typeMeta = contentTypeMeta[item.type];
  const detail = contentDetails[id];

  return (
    <>
      <PageHeader
        backHref="/content"
        backLabel="Back to Content Library"
        title={item.title}
        description={`${typeMeta.label} · ${item.platform}${project ? ` · ${project.name}` : ""}`}
        actions={
          <>
            <Button asChild variant="outline">
              <Link href="/pipeline">
                <ArrowUpRight className="h-4 w-4" />
                Open in pipeline
              </Link>
            </Button>
            <Button type="button">
              <PenLine className="h-4 w-4" />
              Edit content
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <aside className="min-w-0 space-y-6 lg:order-2 lg:sticky lg:top-24 lg:self-start">
          <DetailOverview item={item} />
        </aside>
        <div className="min-w-0 space-y-6 lg:order-1">
          <DetailScenario scenario={detail?.scenario ?? ""} />
          <DetailPrompt prompt={detail?.prompt ?? ""} />
          <DetailAssets item={item} />
        </div>
      </div>
    </>
  );
}
