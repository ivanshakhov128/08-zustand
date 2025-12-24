"use client";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

import css from "./NotesPaige.module.css";
import Loading from "../../../loading";
import NotesError from "./error";

const PER_PAGE = 12;

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search: debouncedSearch,
        tag,
      }),
    staleTime: 60_000,
    placeholderData: { notes: [], totalPages: 0 },
  });

  const handleCreated = () => {
    setIsModalOpen(false);
    qc.invalidateQueries({ queryKey: ["notes"] });
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(v) => {
            setPage(1);
            setSearch(v);
          }}
        />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {(isLoading || isFetching) && <Loading />}
      {error && <NotesError error={error as Error} />}
      {!isLoading && !isFetching && data && <NoteList notes={data.notes} />}

      {data && data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onCancel={() => setIsModalOpen(false)}
            onCreated={handleCreated}
          />
        </Modal>
      )}
    </div>
  );
}
