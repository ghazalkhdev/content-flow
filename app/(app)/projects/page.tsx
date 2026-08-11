import { Plus } from "lucide-react";
import { contentItems, projects } from "@/lib/data";
import { PageHeader } from "@/components/shared/page-header";
import { ProjectCard } from "@/components/projects/project-card";

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        description="Everything your team is working toward."
        actions={
          <button
            type="button"
            className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            New project
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            items={contentItems}
          />
        ))}
      </div>
    </>
  );
}
