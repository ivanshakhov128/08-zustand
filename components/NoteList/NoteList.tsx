import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import { deleteNote } from "../../lib/api";
import Link from "next/link";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notes"] }),
  });

  if (!notes.length) return <div className={css.empty}>No notes found</div>;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>

            <Link href={`/notes/${note.id}`} className={css.viewDetails}>
              View details
            </Link>

            <button
              className={css.button}
              onClick={() => {
                if (confirm("Delete this note?")) mutation.mutate(note.id);
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
