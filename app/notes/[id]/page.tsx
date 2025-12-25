import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

interface NotePageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: NotePageProps) {
  const noteId = params.id;

  try {
    const note = await fetchNoteById(noteId);

    const pageTitle = `${note.title} | NoteHub`;
    const description = note.content
      ? note.content.slice(0, 120) + "..."
      : "View note details";

    return {
      title: pageTitle,
      description,
      openGraph: {
        title: pageTitle,
        description,
        url: `https://your-domain.com/notes/${noteId}`,
        images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
      },
    };
  } catch {
    return {
      title: "Note not found | NoteHub",
      description: "This note does not exist or was removed.",
      openGraph: {
        title: "Note not found | NoteHub",
        description: "This note does not exist or was removed.",
        url: `https://your-domain.com/notes/${noteId}`,
        images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
      },
    };
  }
}

export default async function NoteDetailsPage({ params }: NotePageProps) {
  const noteId = params.id;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
