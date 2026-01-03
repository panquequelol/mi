import { storage } from "./storage";
import type { NotepadDocument, TodoLine, ArchivedSection } from "./types";

export const documentService = {
  load: (): NotepadDocument => {
    return storage.get();
  },

  save: (document: NotepadDocument): void => {
    storage.set(document);
  },

  toggleLine: (document: NotepadDocument, lineId: string): NotepadDocument => {
    return document.map((line) =>
      line.id === lineId
        ? { ...line, state: line.state === "DONE" ? "TODO" : "DONE", updatedAt: Date.now() }
        : line
    );
  },

  updateLineText: (
    document: NotepadDocument,
    lineId: string,
    text: string
  ): NotepadDocument => {
    return document.map((line) =>
      line.id === lineId ? { ...line, text, updatedAt: Date.now() } : line
    );
  },

  addLine: (document: NotepadDocument, text: string = ""): NotepadDocument => {
    const newLine: TodoLine = {
      id: crypto.randomUUID(),
      text,
      state: "TODO",
      updatedAt: Date.now(),
    };
    return [...document, newLine];
  },

  insertLineAfter: (
    document: NotepadDocument,
    afterLineId: string,
    text: string = ""
  ): NotepadDocument => {
    const index = document.findIndex((line) => line.id === afterLineId);
    if (index === -1) {
      // Line not found, append at the end
      return documentService.addLine(document, text);
    }

    const newLine: TodoLine = {
      id: crypto.randomUUID(),
      text,
      state: "TODO",
      updatedAt: Date.now(),
    };

    // Insert after the found line
    return [
      ...document.slice(0, index + 1),
      newLine,
      ...document.slice(index + 1),
    ];
  },

  deleteLine: (document: NotepadDocument, lineId: string): NotepadDocument => {
    return document.filter((line) => line.id !== lineId);
  },

  archiveSection: (
    document: NotepadDocument,
    startIndex: number,
    endIndex: number
  ): { remaining: NotepadDocument; archived: ArchivedSection } => {
    const sectionLines = document.slice(startIndex, endIndex);
    const archivedSection: ArchivedSection = {
      id: crypto.randomUUID(),
      lines: sectionLines,
      archivedAt: Date.now(),
    };
    const remaining = [...document.slice(0, startIndex), ...document.slice(endIndex)];
    return { remaining, archived: archivedSection };
  },

  cleanUpEmptyLines: (document: NotepadDocument): NotepadDocument => {
    const hasTasks = document.some((line) => line.text.trim());
    if (!hasTasks) {
      // No tasks - keep exactly one empty line
      return [
        {
          id: crypto.randomUUID(),
          text: "",
          state: "TODO",
          updatedAt: Date.now(),
        },
      ];
    }
    // Has tasks - remove trailing empty lines
    let lastNonEmpty = document.length - 1;
    while (lastNonEmpty >= 0 && !document[lastNonEmpty].text.trim()) {
      lastNonEmpty--;
    }
    return document.slice(0, lastNonEmpty + 1);
  },
};
