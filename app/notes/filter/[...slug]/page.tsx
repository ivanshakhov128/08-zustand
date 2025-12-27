import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { Metadata } from "next";

interface FilterProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: FilterProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] ?? "all";

  const pageTitle =
    tag === "all" ? "All notes | NoteHub" : `${tag} notes | NoteHub`;

  const description =
    tag === "all"
      ? "Browse all notes in NoteHub"
      : `Browse notes filtered by tag: ${tag}`;

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: pageTitle,
      description,
      url: `https://your-domain.com/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub OG Image",
        },
      ],
    },
  };
}

export default async function FilteredNotesPage({ params }: FilterProps) {
  const { slug } = await params;
  const tag = slug?.[0] ?? "all";
  const normalizedTag = tag === "all" ? "" : tag;

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
