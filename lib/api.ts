import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note, NoteTag } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface CreateNoteParams {
  title: string;
  content?: string;
  tag: NoteTag;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<NotesResponse> => {
  const response: AxiosResponse<NotesResponse> = await api.get("/", { params });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.get(`/${id}`);
  return response.data;
};
export const createNote = async (newNote: CreateNoteParams): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.post("/", newNote);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.delete(`/${id}`);
  return response.data;
};
