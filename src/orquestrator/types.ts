export type TodoState = "TODO" | "DONE";

export type TodoLine = {
  id: string;
  text: string;
  state: TodoState;
  updatedAt: number;
};

export type NotepadDocument = TodoLine[];

export const STORAGE_KEY = "nairobi-notepad";

export type ArchivedSection = {
  id: string;
  lines: TodoLine[];
  archivedAt: number;
};

export type ArchivedSections = ArchivedSection[];

export const ARCHIVE_STORAGE_KEY = "nairobi-notepad-archive";
