"use client";

import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";
import css from "./NoteForm.module.css";

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setDraft({ [name]: value });
  }

  async function createNote() {
    // имитация запроса
    await new Promise((res) => setTimeout(res, 300));

    clearDraft();
    router.back();
  }

  return (
    <form action={createNote} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          placeholder="Title"
          value={draft.title}
          onChange={handleChange}
          className={css.input}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          placeholder="Content"
          value={draft.content}
          onChange={handleChange}
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={draft.tag}
          onChange={handleChange}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Create
        </button>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
