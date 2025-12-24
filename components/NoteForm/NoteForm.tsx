"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
import { createNote } from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note, NoteTag } from "../../types/note";

interface NoteFormProps {
  onCancel: () => void;
  onCreated: (note: Note) => void;
}

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as NoteTag[];

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(50).required("Required"),
  content: Yup.string().max(500),
  tag: Yup.mixed<NoteTag>().oneOf(tags).required("Required"),
});

interface CreateNotePayload {
  title: string;
  content?: string;
  tag: NoteTag;
}

export default function NoteForm({ onCancel, onCreated }: NoteFormProps) {
  const qc = useQueryClient();

  const mutation = useMutation<Note, unknown, CreateNotePayload>({
    mutationFn: (payload) => createNote(payload),
    onSuccess: (note) => {
      onCreated(note);
      qc.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <div>
      <h2>Create note</h2>

      <Formik
        initialValues={{ title: "", content: "", tag: "Todo" as NoteTag }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          const payload: CreateNotePayload = {
            title: values.title,
            content: values.content || "",
            tag: values.tag,
          };

          mutation.mutate(payload, {
            onError: (error) => {
              if (error instanceof Error) {
                console.error("Failed to create note:", error);
                alert("Failed to create note: " + error.message);
              } else {
                console.error("Failed to create note:", error);
                alert("Failed to create note");
              }
            },
            onSettled: () => actions.setSubmitting(false),
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label htmlFor="title">Title</label>
              <Field id="title" name="title" className={css.input} />
              <ErrorMessage
                name="title"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="content">Content</label>
              <Field
                as="textarea"
                id="content"
                name="content"
                rows={6}
                className={css.textarea}
              />
              <ErrorMessage
                name="content"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="tag">Tag</label>
              <Field as="select" id="tag" name="tag" className={css.select}>
                {tags.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="tag" component="span" className={css.error} />
            </div>

            <div className={css.actions}>
              <button
                type="button"
                className={css.cancelButton}
                onClick={onCancel}
                disabled={isSubmitting || mutation.isPending}
              >
                Cancel
              </button>

              <button
                type="submit"
                className={css.submitButton}
                disabled={isSubmitting || mutation.isPending}
              >
                {mutation.isPending ? "Creating..." : "Create note"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
