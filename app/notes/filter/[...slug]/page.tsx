import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface FilterProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function FilteredNotesPage({ params }: FilterProps) {
  const { slug } = await params;

  const tag = slug?.[0];
  const normalizedTag = tag === "all" ? "" : tag ?? "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, normalizedTag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: normalizedTag,
      }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={normalizedTag || undefined} />
    </HydrationBoundary>
  );
}
