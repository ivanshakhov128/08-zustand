"use client";
export default function NoteError({ error }: { error: Error }) {
  return <p>Could not fetch note details. {error.message}</p>;
}
