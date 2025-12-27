import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import { Roboto } from "next/font/google";
import type { Metadata } from "next";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub — Smart notes",
  description:
    "NoteHub — створюй, редагуй та керуй нотатками ефективно. Пошук, фільтри, теги та збереження чернеток.",
  openGraph: {
    title: "NoteHub — Smart notes",
    description:
      "Зручний застосунок для управління нотатками з тегами, пошуком та чернетками.",
    url: "https://notehub-app.example",
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

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <Header />
          <main>{children}</main>

          {/* Parallel route slot */}
          {modal}

          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
