import { SlidersHorizontal } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { PipelineBoard } from "@/components/pipeline/pipeline-board";
import { BoardSummary } from "@/components/pipeline/board-summary";

export default function PipelinePage() {
  return (
    <>
      <PageHeader
        title="Content Pipeline"
        description="Drag content through the production workflow."
        actions={
          <Button variant="outline">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </Button>
        }
      />

      <BoardSummary />

      <PipelineBoard />
    </>
  );
}
