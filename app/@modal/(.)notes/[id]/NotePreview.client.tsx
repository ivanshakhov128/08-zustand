"use client";

import css from "./NotePreview.module.css";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import type { Note } from "@/types/note";

interface NotePreviewProps {
  noteId: string;
}

export default function NotePreview({ noteId }: NotePreviewProps) {
  const router = useRouter();
  const close = () => router.back();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: Boolean(noteId),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError || !note) {
    return <p>Something went wrong.</p>;
  }

  const noteDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <Modal onClose={close}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>

          <p className={css.content}>{note.content}</p>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.date}>{noteDate}</p>

          <button className={css.backBtn} onClick={close}>
            Go back
          </button>
        </div>
      </div>
    </Modal>
  );
}
