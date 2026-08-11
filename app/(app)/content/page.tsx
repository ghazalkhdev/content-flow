import { PageHeader } from "@/components/shared/page-header";
import { ContentLibrary } from "@/components/content/content-library";

export default async function ContentPage(
  props: PageProps<"/content">,
) {
  const searchParams = await props.searchParams;
  const q = searchParams.q;
  const initialQuery = typeof q === "string" ? q : "";

  return (
    <>
      <PageHeader
        title="Content Library"
        description="Search, filter and manage every piece of content."
      />
      <ContentLibrary initialQuery={initialQuery} />
    </>
  );
}
