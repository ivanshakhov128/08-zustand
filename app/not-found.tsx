import css from "./Home.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page not found | NoteHub",
  description: "The page you are looking for does not exist on NoteHub.",
  openGraph: {
    title: "404 — Page not found | NoteHub",
    description: "Oops! This page does not exist.",
    url: "https://notehub-app.example/404",
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

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
