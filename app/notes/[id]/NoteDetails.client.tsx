"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NoteDetails from "@/components/NoteDetails/NoteDetails";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useParams } from "next/navigation";
import Loading from "@/app/loading";
import NoteError from "./error";

const queryClient = new QueryClient();

export default function NoteDetailsClient() {
  const params = useParams();
  const noteId = Array.isArray(params?.id) ? params.id[0] : params?.id || "";

  if (!noteId) return <p>Invalid note ID</p>;

  return (
    <QueryClientProvider client={queryClient}>
      <NoteDetailsLoader noteId={noteId} />
    </QueryClientProvider>
  );
}

function NoteDetailsLoader({ noteId }: { noteId: string }) {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <Loading />;
  if (error || !note)
    return (
      <NoteError
        error={
          error instanceof Error ? error : new Error("Something went wrong")
        }
      />
    );

  return <NoteDetails note={note} />;
}
